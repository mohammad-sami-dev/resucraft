import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");
const pdfjsWorker = require.resolve("pdfjs-dist/legacy/build/pdf.worker.js");
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const DEV_MODE = process.env.AI_DEV_MODE === "true";
const DEV_MODE_DELAY_MS = Number(process.env.AI_DEV_MODE_DELAY_MS ?? 10000);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const MOCK_RESUME_PATH = path.join(__dirname, "../mockResume.json");

function loadMockResumeData() {
    const rawData = fs.readFileSync(MOCK_RESUME_PATH, "utf-8");
    return normalizeResume(JSON.parse(rawData));
}

const GEMINI_SYSTEM_PROMPT = `
You are a resume parser. Extract all information from the 
resume text provided by the user and return it as JSON.

Return ONLY this JSON structure, nothing else:
{
  "generalInfo": {
    "name": "",
    "title": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "github": "",
    "website": ""
  },
  "summary": { "summary": "" },
  "experience": [{
    "company": "",
    "role": "",
    "startDate": "",
    "endDate": "",
    "description": "",
    "achievements": { "title": "", "points": [""] }
  }],
  "education": [{
    "school": "",
    "degree": "",
    "field": "",
    "startDate": "",
    "endDate": "",
    "achievements": { "title": "", "points": [""] }
  }],
  "projects": [{
    "name": "",
    "description": "",
    "tech": "",
    "link": "",
    "keyFeatures": { "title": "", "points": [""] }
  }],
  "skills": [{ "skill": "" }],
  "languages": [{ "language": "", "level": "" }],
  "hobbies": [{ "hobby": "" }],
  "customSections": []
}

Rules:
- Extract ONLY what is in the resume. Do not invent data.
- Convert all dates to YYYY-MM format.
  Examples: "2023" → "2023-01", "May 2019" → "2019-05"
  If currently studying/working → use "" for endDate.
- For skills: extract each skill as a separate object.
- Put certifications and other non-standard sections in customSections.
- Return ONLY valid JSON. No markdown. No code blocks.
  No explanation. Just the raw JSON object.
`;

async function extractTextFromPDF(buffer) {
    console.log("=== File received ===");
    console.log("Buffer length:", buffer?.length);

    try {
        const uint8 = new Uint8Array(buffer);
        const loadingTask = pdfjsLib.getDocument({
            data: uint8,
            useWorkerFetch: false,
            isEvalSupported: false,
        });
        const pdf = await loadingTask.promise;

        let fullText = "";

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();

            const pageText = textContent.items
                .map((item) => `${item.str}${item.hasEOL ? "\n" : " "}`)
                .join("")
                .replace(/[ \t]+\n/g, "\n")
                .replace(/\n{3,}/g, "\n\n")
                .trim();

            fullText += `${pageText}\n\n`;
        }

        return fullText.trim();
    } catch (err) {
        console.error("=== PDF extraction error ===", err.message);
        console.error(err.stack);
        throw err;
    }
}

function parseJsonSafely(text) {
    try {
        const cleaned = String(text || "")
            .replace(/```json\n?/g, "")
            .replace(/```\n?/g, "")
            .trim();
        return JSON.parse(cleaned);
    } catch (e) {
        console.error("JSON parse failed:", e.message);
        console.error("Raw text was:", text);
        return null;
    }
}

function normalizeMonthDate(value) {
    if (!value || value === "Present" || value === "present") return "";
    const str = String(value).trim();
    if (/^(present|current|now|ongoing)$/i.test(str)) return "";

    if (/^\d{4}-\d{2}$/.test(str)) return str;

    const mmYYYY = str.match(/^(\d{1,2})\s+(\d{4})$/);
    if (mmYYYY) return `${mmYYYY[2]}-${mmYYYY[1].padStart(2, "0")}`;

    const mmYYYYDash = str.match(/^(\d{1,2})[\/.-](\d{4})$/);
    if (mmYYYYDash) return `${mmYYYYDash[2]}-${mmYYYYDash[1].padStart(2, "0")}`;

    const yyyyMm = str.match(/^(\d{4})[\/.-](\d{1,2})$/);
    if (yyyyMm) return `${yyyyMm[1]}-${yyyyMm[2].padStart(2, "0")}`;

    if (/^\d{4}$/.test(str)) return `${str}-01`;

    const months = {
        january: "01", february: "02", march: "03", april: "04",
        may: "05", june: "06", july: "07", august: "08",
        september: "09", october: "10", november: "11", december: "12",
    };
    const monthYear = str.match(/^([a-zA-Z]+)\s+(\d{4})$/);
    if (monthYear) {
        const m = months[monthYear[1].toLowerCase()];
        if (m) return `${monthYear[2]}-${m}`;
    }

    return "";
}

function getAchievementsSource(entry) {
    return (
        entry.achievements
        || entry.responsibilities
        || entry.bullets
        || entry.highlights
        || entry.details
        || (typeof entry.description === "object" ? entry.description : null)
        || null
    );
}

function normalizePointsBlock(source, defaultTitle = "") {
    if (!source) return { title: defaultTitle, points: [""] };
    if (Array.isArray(source)) {
        return {
            title: defaultTitle,
            points: source.length > 0 ? source.map(String) : [""],
        };
    }
    if (typeof source === "string") {
        const lines = source.split(/\n+/).map((line) => line.trim()).filter(Boolean);
        return {
            title: defaultTitle,
            points: lines.length > 0 ? lines : [""],
        };
    }
    return {
        title: source.title || defaultTitle,
        points: Array.isArray(source.points) && source.points.length > 0
            ? source.points.map(String)
            : [""],
    };
}

function toString(value) {
    if (value == null) return "";
    if (typeof value !== "string") return String(value).trim();
    return value
        .replace(/â€“|â€”/g, "-")
        .replace(/â€˜|â€™/g, "'")
        .replace(/â€œ|â€/g, '"')
        .replace(/Â/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function normalizeUrl(url) {
    const raw = toString(url);
    if (!raw) return "";
    if (/^https?:\/\//i.test(raw)) return raw;
    return `https://${raw}`;
}

function normalizeSkills(skills) {
    if (!skills) return [];

    if (typeof skills === "string") {
        return skills.split(",").map((s) => s.trim()).filter(Boolean).map((skill) => ({ skill }));
    }

    if (Array.isArray(skills)) {
        return skills.map((s) => ({
            skill: typeof s === "string" ? s.trim() : (s?.skill || s?.name || ""),
        })).filter((s) => s.skill);
    }

    return [];
}

function parseTechToSkillsUsed(tech) {
    if (Array.isArray(tech)) return tech.map(String).filter(Boolean);
    if (typeof tech === "string" && tech.trim()) {
        return tech.split(",").map((s) => s.trim()).filter(Boolean);
    }
    return [];
}

function extractGeneralInfo(data) {
    const gi = data.generalInfo || {};
    return {
        name: toString(gi.name || data.name),
        title: toString(gi.title || data.title || data.jobTitle),
        email: toString(gi.email || data.email),
        phone: toString(gi.phone || data.phone),
        location: toString(gi.location || data.location || data.address),
        linkedin: normalizeUrl(gi.linkedin || data.linkedin),
        github: normalizeUrl(gi.github || data.github),
        website: normalizeUrl(gi.website || data.website),
    };
}

function normalizeCustomSections(rawSections) {
    if (!Array.isArray(rawSections)) return [];

    return rawSections.map((section) => ({
        title: toString(section?.title),
        content: {
            text: toString(section?.content?.text || section?.text),
            items: Array.isArray(section?.content?.items)
                ? section.content.items.map(String)
                : Array.isArray(section?.items)
                    ? section.items.map(String)
                    : [],
            links: Array.isArray(section?.content?.links)
                ? section.content.links.map(String)
                : [],
            contact: {
                phone: toString(section?.content?.contact?.phone),
                email: toString(section?.content?.contact?.email),
            },
        },
    })).filter(
        (section) =>
            section.title
            || section.content.text
            || section.content.items.length
            || section.content.links.length
            || section.content.contact.phone
            || section.content.contact.email
    );
}

function normalizeResume(ai) {
    const summaryText =
        (typeof ai.summary === "string" ? ai.summary : ai.summary?.summary)
        || ai.profile
        || ai.objective
        || ai.about
        || ai.professionalSummary
        || "";

    return {
        generalInfo: extractGeneralInfo(ai),
        summary: { summary: toString(summaryText) },
        education: (ai.education || []).map((e) => ({
            school: toString(e.school || e.institution || e.university),
            degree: toString(e.degree || e.qualification),
            location: toString(e.location || e.field),
            startDate: normalizeMonthDate(e.startDate || e.from || e.start),
            endDate: normalizeMonthDate(e.endDate || e.to || e.end),
            achievements: normalizePointsBlock(getAchievementsSource(e), ""),
        })),
        experience: (ai.experience || ai.workExperience || ai.work || []).map((e) => {
            const achievementSource =
                getAchievementsSource(e)
                || (typeof e.description === "string" ? e.description : null);

            return {
                company: toString(e.company || e.employer || e.organization),
                position: toString(e.role || e.title || e.position || e.jobTitle),
                location: toString(e.location),
                startDate: normalizeMonthDate(e.startDate || e.from || e.start),
                endDate: normalizeMonthDate(
                    e.current || /present|current/i.test(String(e.endDate || e.to || e.end || ""))
                        ? ""
                        : (e.endDate || e.to || e.end)
                ),
                achievements: normalizePointsBlock(achievementSource, ""),
            };
        }),
        skills: normalizeSkills(ai.skills),
        projects: (ai.projects || ai.portfolio || []).map((p) => ({
            title: toString(p.name || p.title),
            company: toString(p.company),
            description: toString(p.description || p.summary),
            link: normalizeUrl(p.link || p.url || p.liveLink),
            githubLink: normalizeUrl(p.github || p.githubLink || p.repoLink),
            skillsUsed: parseTechToSkillsUsed(p.tech || p.skillsUsed || p.techStack || p.technologies || p.stack),
            keyFeatures: normalizePointsBlock(p.keyFeatures || p.features || p.highlights, "Key Features"),
        })),
        languages: (ai.languages || []).map((l) => ({
            language: typeof l === "string" ? l : (l.language || l.name || ""),
            proficiency: typeof l === "string" ? "" : (l.level || l.proficiency || ""),
        })).filter((l) => l.language),
        hobbies: (ai.hobbies || ai.interests || []).map((h) => ({
            title: typeof h === "string" ? h : (h.hobby || h.title || h.name || ""),
            description: typeof h === "string" ? "" : (h.description || ""),
        })),
        customSections: normalizeCustomSections(ai.customSections),
    };
}

export const parseResume = async (req, res) => {
    try {
        if (process.env.AI_DEV_MODE === "true") {
            console.log("⚠️  AI_DEV_MODE is ON — returning mock data");
            const delayMs =
                Number.isFinite(DEV_MODE_DELAY_MS) && DEV_MODE_DELAY_MS >= 0
                    ? DEV_MODE_DELAY_MS
                    : 10000;
            await sleep(delayMs);

            const mockData = loadMockResumeData();
            if (req.userDoc) {
                req.userDoc.aiUsage.resumeImports += 1;
                await req.userDoc.save();
            }
            return res.json(mockData);
        }

        console.log("=== Uploaded file info ===");
        console.log("mimetype:", req.file?.mimetype);
        console.log("size:", req.file?.size);
        console.log("buffer length:", req.file?.buffer?.length);

        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        if (!process.env.GEMINI_API_KEY) {
            console.error("GEMINI_API_KEY is missing from environment");
            return res.status(500).json({ error: "Gemini API key is not configured" });
        }

        const resumeText = await extractTextFromPDF(req.file.buffer);
        console.log("=== PDF extracted text (raw) ===");
        console.log(resumeText.substring(0, 500)); // Log only first 500 chars to avoid flooding
        console.log("=== Text length:", resumeText.length, "chars ===");

        if (!resumeText.trim()) {
            console.error("Extraction resulted in empty text.");
            return res.status(400).json({
                error: "Could not extract text from PDF. Please try a different file.",
            });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent(
            GEMINI_SYSTEM_PROMPT + "\n\n" + resumeText
        );
        const aiResponse = result.response.text();
        console.log("=== Gemini raw response ===");
        console.log(aiResponse.substring(0, 500)); // Log only first 500 chars

        const parsed = parseJsonSafely(aiResponse);
        if (!parsed) {
            console.error("JSON parsing of AI response failed.");
            return res.status(500).json({ error: "Failed to parse resume (invalid AI JSON)" });
        }

        const normalized = normalizeResume(parsed);

        if (req.userDoc) {
            req.userDoc.aiUsage.resumeImports += 1;
            await req.userDoc.save();
        }

        res.json(normalized);
    } catch (err) {
        console.error("parseResume general error:", err);
        res.status(500).json({ error: "Failed to parse resume (general error)" });
    }
};
