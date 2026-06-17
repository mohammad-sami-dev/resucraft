import "dotenv/config";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { OpenAI } from "openai/client.js";
import fs from "fs"
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { createRequire } from "module"
const require = createRequire(import.meta.url);
const pdfjsDistRoot = path.dirname(require.resolve("pdfjs-dist/package.json"))
const standardFontsPath = path.join(pdfjsDistRoot, "standard_fonts");
const standardFontDataUrl = pathToFileURL(standardFontsPath).href + "/";

// import User from "../models/User.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const DEV_MODE = process.env.AI_DEV_MODE === "true";
const DEV_MODE_DELAY_MS = Number(process.env.AI_DEV_MODE_DELAY_MS ?? 10000)
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function extractTextFromPDF(buffer) {
    const uint8 = new Uint8Array(buffer);
    const loadingTask = pdfjsLib.getDocument({
        data: uint8,
        standardFontDataUrl,
    })
    const pdf = await loadingTask.promise;

    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();

        const strings = textContent.items.map(item => item.str);
        fullText += strings.join(" ") + "\n";
    }

    return fullText;
}


function toArray(value) {
    return Array.isArray(value) ? value : [];
}

function toString(value) {
    if (typeof value !== "string") return "";
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

function cleanSkillToken(token) {
    return toString(token).replace(/^[\s(]+|[\s)]+$/g, "");
}

function normalizeSkillUsed(skillsUsed, techStack) {
    let arr = [];

    if (Array.isArray(skillsUsed)) {
        arr = skillsUsed.map(cleanSkillToken).filter(Boolean);
    } else {
        arr = toString(techStack)
            .split(",")
            .map(cleanSkillToken)
            .filter(Boolean);
    }

    return [...new Set(arr)]
}


function normalizePointsBlock(block, fallbackTitle = "") {
    const titleRaw =
        block && typeof block === "object"
            ? toString(block.title || block.heading || block.subheading)
            : "";

    let points = [];
    if (Array.isArray(block)) {
        points = block.map(toString).filter(Boolean);
    } else if (block && typeof block === "object") {
        points = toArray(block.points || block.items || block.bullets)
            .map(toString)
            .filter(Boolean);
    }

    if (points.length === 0) {
        return { title: "", points: [""] }; // key improvement
    }

    return { title: titleRaw || fallbackTitle, points };
}


function normalizeCustomSections(rawSections) {
    return toArray(rawSections).map((section) => {
        const title = toString(section?.title);

        const content = {
            text: "",
            items: [],
            links: [],
            contact: { phone: "", email: "" },
        };

        // support old AI output: blocks[]
        if (Array.isArray(section?.blocks)) {
            section.blocks.forEach((block) => {
                if (!block || typeof block !== "object") return;

                if (block.type === "text") {
                    const t = toString(block.content);
                    if (t) content.text = content.text ? `${content.text}\n${t}` : t;
                }

                if (block.type === "list") {
                    const items = toArray(block.items).map(toString).filter(Boolean);
                    content.items.push(...items);
                }


                if (block.type === "links") {
                    const links = toArray(block.links).map(normalizeUrl).filter(Boolean);
                    content.links.push(...links);
                }

                if (block.type === "contact") {
                    content.contact.phone = toString(block.phone || content.contact.phone);
                    content.contact.email = toString(block.email || content.contact.email);
                }


            })

        }

        // support new AI output: content{}
        if (section?.content && typeof section.content === "object") {
            content.text = toString(section.content.text) || content.text;

            content.items = [
                ...content.items,
                ...toArray(section.content.items).map(toString).filter(Boolean),
            ];
            content.links = [
                ...content.links,
                ...toArray(section.content.links).map(normalizeUrl).filter(Boolean),
            ];

            content.contact.phone = toString(section.content.contact?.phone || content.contact.phone);
            content.contact.email = toString(section.content.contact?.email || content.contact.email);
        }

        return {
            title,
            content: {
                text: content.text,
                items: [...new Set(content.items)],
                links: [...new Set(content.links)],
                contact: content.contact,
            },
        };
    }).filter((s) =>
        s.title ||
        s.content.text ||
        s.content.items.length ||
        s.content.links.length ||
        s.content.contact.phone ||
        s.content.contact.email
    );
}


function normalizeResume(ai) {

    return {
        generalInfo: {
            name: toString(ai.generalInfo?.name) || "",
            email: toString(ai.generalInfo?.email) || "",
            phone: toString(ai.generalInfo?.phone) || "",
            location: toString(ai.generalInfo?.location) || "",
            linkedin: normalizeUrl(ai.generalInfo?.linkedin) || "",
            github: normalizeUrl(ai.generalInfo?.github) || "",
            website: normalizeUrl(ai.generalInfo?.website) || "",
            title: toString(ai.generalInfo?.title) || "",
        },

        summary: {
            summary: toString(ai.summary?.summary) || "",
        },

        education: toArray(ai.education || []).map(e => ({
            school: toString(e.institution || e.school) || "",
            degree: toString(e.degree) || "",
            location: toString(e.location) || "",
            startDate: toString(e.startDate || e.from || e.start) || "",
            endDate: toString(e.endDate || e.to || e.end) || "",
            // achievements: { title: "", points: [""] }
            achievements: normalizePointsBlock(e.achievements, "")
        })),

        experience: toArray((ai.experience) || []).map(e => ({
            position: toString(e.jobTitle || e.position || e.role) || "",
            company: toString(e.company) || "",
            location: toString(e.location) || "",
            startDate: toString(e.startDate || e.from || e.start) || "",
            endDate: toString(e.endDate || e.to || e.end) || "",
            // achievements: { title: "", points: [""] }
            achievements: normalizePointsBlock(e.achievements, "")
        })),

        // skills: (ai.skills || []).map(s => ({ skill: s })),

        skills: toArray(ai.skills).map(s => ({
            skill: toString(typeof s === "string" ? s : s.skill)
        })),

        projects: toArray(ai.projects || []).map(p => ({
            title: toString(p.name || p.title) || "",
            link: normalizeUrl(p.liveLink || p.link) || "",
            githubLink: normalizeUrl(p.githubLink || p.repoLink || p.repository || p.codeLink) || "",

            description: toString(p.description) || "",
            // skillsUsed: Array.isArray(p.techStack) ? p.techStack.split(",").map(t => t.trim()) : [],
            skillsUsed: normalizeSkillUsed(p.skillsUsed, p.techStack),
            keyFeatures: normalizePointsBlock(
                p.keyFeatures || p.features || p.highlights,
                "Key Features"
            )
        })),

        languages: toArray(ai.languages).map(l => ({
            language: toString(typeof l === "string" ? l : l.language),
            proficiency: toString(typeof l === "string" ? "" : l.proficiency)
        })).filter((l) => l.language),

        hobbies: toArray(ai.hobbies).map(h => ({
            title: toString(typeof h === "string" ? h : h.title),
            description: toString(typeof h === "string" ? "" : h.description)

        })),

        customSections: normalizeCustomSections(ai.customSections)


    };
}


function extractCoreCompetenciesFallback(resumeText = "") {
    const text = String(resumeText || "");
    if (!text.trim()) return null;

    const startMatch = /Core\s+Competencies/i.exec(text);
    if (!startMatch) return null;

    const startIdx = startMatch.index + startMatch[0].length;
    const tail = text.slice(startIdx);

    // Stop when next major section starts
    const stopMatch = /(Occupational\s+Contour|Work\s+Experience|Academia|Education|Personal\s+Dossier|\bpg\.\s*2\b)/i.exec(tail);
    const block = (stopMatch ? tail.slice(0, stopMatch.index) : tail).trim();
    if (!block) return null;

    // Split OCR block into bullet-like items
    let items = block
        .split(/[•●▪]+/g)
        .map((s) => toString(s))
        .filter(Boolean)
        .filter((s) => s.length > 20);

    // Fallback split if bullet chars are missing
    if (items.length === 0) {
        items = block
            .split(/(?<=[.?!])\s+/)
            .map((s) => toString(s))
            .filter((s) => s.length > 20);
    }

    items = [...new Set(items)].slice(0, 25);
    if (items.length === 0) return null;

    return {
        title: "Core Competencies",
        content: {
            text: "",
            items,
            links: [],
            contact: { phone: "", email: "" },
        },
    };
}



export const parseResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" })
        }
        if (DEV_MODE) {
            const delayMs =
                Number.isFinite(DEV_MODE_DELAY_MS) && DEV_MODE_DELAY_MS >= 0
                    ? DEV_MODE_DELAY_MS
                    : 10000;

            await sleep(delayMs)

            const filePath = path.join(__dirname, "../mockResume.json");
            const rawData = fs.readFileSync(filePath, "utf-8");
            const mockData = JSON.parse(rawData);
            if (req.userDoc) {
                req.userDoc.aiUsage.resumeImports += 1;
                await req.userDoc.save();
            }

            return res.json(mockData);
        }


        // extract text from PDF

        const resumeText = await extractTextFromPDF(req.file.buffer);

        // send to AI to structure

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            temperature: 0,
            response_format: { type: "json_object" },
            messages: [
                {
                    role: "system",
                    content: `
                        You convert resumes into structured JSON.

                        Return ONLY valid JSON.

                        Schema:

                        {
                            "generalInfo": {
                            "name": "",
                            "email": "",
                            "phone": "",
                            "location": "",
                            "linkedin": "",
                            "github": "",
                            "website": "",
                            "title": ""
                        },

                        "summary": { "summary": "" },

                        "education": [
                            {
                                "institution": "",
                                "degree": "",
                                "location": "",
                                "startDate": "",
                                "endDate": "",
                                "achievements": { "title": "", "points": [] }
                            }
                        ],

                        "experience": [
                            {
                                "jobTitle": "",
                                "company": "",
                                "location": "",
                                "startDate": "",
                                "endDate": "",
                                "achievements": { "title": "", "points": [] }
                            }
                        ],

                        "skills": [],

                        "projects": [
                            {
                                "name": "",
                                "liveLink": "",
                                "githubLink": "",
                                "description": "",
                                "skillsUsed": [],
                                "keyFeatures": { "title": "", "points": [] }
                            }
                        ],

                        "languages": [
                            { "language": "", "proficiency": "" }
                        ],

                        "hobbies": [
                            { "title": "", "description": "" }
                        ],

                        "customSections": [
                            {
                                "title": "",
                                "content": {
                                "text": "",
                                "items": [],
                                "links": [],
                                "contact": { "phone": "", "email": "" }
                                }
                            }
                ]
                }

                Rules:

                - Do NOT invent information.
                - If information is missing, return empty strings or empty arrays.
                - Preserve bullet points under experience, education, or projects.
                - Extract technologies into skillsUsed when present.
                - Extract repository links into githubLink when available.
                - Convert dates to MM YYYY format when month exists.
                - Keep "Present" unchanged.
                - If summary already contains synopsis, still preserve additional synopsis lines in customSections when not duplicated.
                - Do not wrap JSON in markdown/code fences.
                - Return website/linkedin/github/liveLink/githubLink as full URLs with https:// when possible.
                - Do not merge Core Competencies into skills only; preserve competency statements in customSections.
                Important:

                If a section exists in the resume that does NOT match the standard schema,
                preserve it inside customSections with its original title and content.

                Never discard resume content.
                `
                },
                {
                    role: "user",
                    content: resumeText,
                },
            ],
        });
 
        const aiResponse = completion.choices[0].message.content;

        // parse JSON safely
        const parsed = JSON.parse(aiResponse);
        const normalized = normalizeResume(parsed);
        const fallbackCore = extractCoreCompetenciesFallback(resumeText);
        if (fallbackCore) {
            const alreadyHasCore = Array.isArray(normalized.customSections)
                && normalized.customSections.some((s) => /core\s+competencies/i.test(toString(s?.title)));


            if (!alreadyHasCore) {
                normalized.customSections = [...(normalized.customSections || []), fallbackCore]
            }

        }


        if (req.userDoc) {
            req.userDoc.aiUsage.resumeImports += 1;
            await req.userDoc.save();
        }
        // console.log(resumeText)
        console.log("AI customSections payload:", JSON.stringify(parsed.customSections, null, 2));
        console.log("Normalized customSections payload:", JSON.stringify(normalized.customSections, null, 2));
        res.json(normalized);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to parse resume" });
    }
};

