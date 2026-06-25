const SECTION_HEADERS = [
    { key: "summary", patterns: [/^(professional\s+)?summary$/i, /^profile$/i, /^objective$/i, /^about(\s+me)?$/i] },
    { key: "experience", patterns: [/^(work\s+)?experience$/i, /^employment(\s+history)?$/i, /^professional\s+experience$/i] },
    { key: "education", patterns: [/^education$/i, /^academic(\s+background)?$/i, /^qualifications$/i] },
    { key: "skills", patterns: [/^(technical\s+)?skills$/i, /^core\s+competencies$/i, /^technologies$/i] },
    { key: "projects", patterns: [/^projects?$/i, /^portfolio$/i] },
    { key: "languages", patterns: [/^languages?$/i] },
    { key: "hobbies", patterns: [/^(hobbies|interests)$/i] },
    { key: "certifications", patterns: [/^certifications?$/i, /^licenses?$/i] },
];

const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
const PHONE_RE = /(?:\+?\d{1,3}[\s.-]?)?(?:\(?\d{2,4}\)?[\s.-]?)?\d{3,4}[\s.-]?\d{3,4}/;
const URL_RE = /(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+(?:\/[^\s,)]*)?/g;
const DATE_RANGE_RE = /(\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*\.?\s+\d{4}|\d{1,2}\/\d{4}|\d{4}-\d{2}|\d{4})\s*(?:-|–|—|to)\s*(\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*\.?\s+\d{4}|\d{1,2}\/\d{4}|\d{4}-\d{2}|\d{4}|present|current|now)/i;
const BULLET_RE = /^[\u2022\u2023\u25E6\u2043\u2219•●▪◦\-–—*]\s*/;

function cleanLine(line) {
    return String(line || "").replace(/\s+/g, " ").trim();
}

function isSectionHeader(line) {
    const cleaned = cleanLine(line).replace(/:$/, "");
    if (!cleaned || cleaned.length > 60) return null;

    for (const section of SECTION_HEADERS) {
        if (section.patterns.some((pattern) => pattern.test(cleaned))) {
            return section.key;
        }
    }

    return null;
}

function splitIntoSections(text) {
    const lines = text.split(/\r?\n/).map(cleanLine).filter(Boolean);
    const sections = { header: [] };
    let current = "header";

    for (const line of lines) {
        const header = isSectionHeader(line);
        if (header) {
            current = header;
            if (!sections[current]) sections[current] = [];
            continue;
        }

        if (!sections[current]) sections[current] = [];
        sections[current].push(line);
    }

    return sections;
}

function extractUrls(text) {
    return (text.match(URL_RE) || []).map((url) => url.replace(/[),.;]+$/, ""));
}

function normalizeUrl(url) {
    if (!url) return "";
    return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

function extractContactInfo(text, headerLines = []) {
    const emailMatch = text.match(EMAIL_RE);
    const phoneMatch = text.match(PHONE_RE);
    const urls = extractUrls(text);

    const linkedin = urls.find((url) => /linkedin\.com/i.test(url)) || "";
    const github = urls.find((url) => /github\.com/i.test(url)) || "";
    const website = urls.find(
        (url) => !/linkedin\.com|github\.com|mailto:/i.test(url)
    ) || "";

    const nameCandidate = headerLines.find(
        (line) =>
            !EMAIL_RE.test(line)
            && !PHONE_RE.test(line)
            && !URL_RE.test(line)
            && line.length <= 60
            && !isSectionHeader(line)
    ) || "";

    const titleCandidate = headerLines.find(
        (line) =>
            line !== nameCandidate
            && !EMAIL_RE.test(line)
            && !PHONE_RE.test(line)
            && !URL_RE.test(line)
            && line.length <= 80
            && !isSectionHeader(line)
    ) || "";

    const locationCandidate = headerLines.find(
        (line) =>
            line !== nameCandidate
            && line !== titleCandidate
            && !EMAIL_RE.test(line)
            && !PHONE_RE.test(line)
            && !URL_RE.test(line)
            && /,/.test(line)
    ) || "";

    return {
        name: nameCandidate,
        title: titleCandidate,
        email: emailMatch?.[0] || "",
        phone: phoneMatch?.[0] || "",
        location: locationCandidate,
        linkedin: normalizeUrl(linkedin),
        github: normalizeUrl(github),
        website: normalizeUrl(website),
    };
}

function parseSkills(lines) {
    const text = lines.join("\n");
    const items = text
        .split(/[\n,|/•·]/)
        .map((item) => item.replace(BULLET_RE, "").trim())
        .filter((item) => item.length > 0 && item.length <= 60);

    return items.map((skill) => ({ skill }));
}

function parseBulletPoints(lines) {
    const points = [];

    for (const line of lines) {
        if (BULLET_RE.test(line)) {
            points.push(line.replace(BULLET_RE, "").trim());
            continue;
        }

        if (points.length > 0 && line.length < 180) {
            points[points.length - 1] = `${points[points.length - 1]} ${line}`.trim();
        } else if (line.length > 0) {
            points.push(line);
        }
    }

    return points.length > 0 ? points : [""];
}

function parseExperienceOrEducation(lines, type) {
    const entries = [];
    let current = null;

    const pushCurrent = () => {
        if (!current) return;
        entries.push(current);
        current = null;
    };

    for (const line of lines) {
        const dateMatch = line.match(DATE_RANGE_RE);

        if (dateMatch && !BULLET_RE.test(line)) {
            pushCurrent();
            const titleLine = line.replace(DATE_RANGE_RE, "").replace(/[,\-|–—]+$/, "").trim();
            const parts = titleLine.split(/\s+[|\u2022]\s+|\s+-\s+/).map(cleanLine).filter(Boolean);

            current = {
                company: type === "experience" ? (parts[0] || "") : "",
                role: type === "experience" ? (parts[1] || "") : "",
                school: type === "education" ? (parts[0] || "") : "",
                degree: type === "education" ? (parts[1] || "") : "",
                startDate: dateMatch[1],
                endDate: /present|current|now/i.test(dateMatch[2]) ? "" : dateMatch[2],
                achievements: { title: "", points: [""] },
            };
            continue;
        }

        if (!current) {
            current = type === "experience"
                ? { company: line, role: "", startDate: "", endDate: "", achievements: { title: "", points: [""] } }
                : { school: line, degree: "", startDate: "", endDate: "", achievements: { title: "", points: [""] } };
            continue;
        }

        if (BULLET_RE.test(line) || current.achievements.points[0]) {
            const points = parseBulletPoints([line]);
            if (current.achievements.points[0] === "") {
                current.achievements.points = points;
            } else {
                current.achievements.points.push(...points);
            }
        } else if (!current.role && type === "experience") {
            current.role = line;
        } else if (!current.degree && type === "education") {
            current.degree = line;
        }
    }

    pushCurrent();
    return entries;
}

function parseLanguages(lines) {
    return lines
        .map((line) => {
            const parts = line.split(/[-–—:|]/).map(cleanLine).filter(Boolean);
            if (parts.length >= 2) {
                return { language: parts[0], level: parts.slice(1).join(" ") };
            }
            return { language: line.replace(BULLET_RE, ""), level: "" };
        })
        .filter((entry) => entry.language);
}

function parseHobbies(lines) {
    return lines
        .map((line) => ({ hobby: line.replace(BULLET_RE, "").trim() }))
        .filter((entry) => entry.hobby);
}

function parseProjects(lines) {
    const projects = [];
    let current = null;

    const pushCurrent = () => {
        if (!current) return;
        projects.push(current);
        current = null;
    };

    for (const line of lines) {
        if (!BULLET_RE.test(line) && line.length <= 80 && !current) {
            pushCurrent();
            current = {
                name: line,
                description: "",
                tech: "",
                link: extractUrls(line)[0] || "",
                keyFeatures: { title: "Key Features", points: [""] },
            };
            continue;
        }

        if (!current) {
            current = {
                name: line,
                description: "",
                tech: "",
                link: "",
                keyFeatures: { title: "Key Features", points: [""] },
            };
            continue;
        }

        if (BULLET_RE.test(line)) {
            const point = line.replace(BULLET_RE, "").trim();
            if (current.keyFeatures.points[0] === "") {
                current.keyFeatures.points = [point];
            } else {
                current.keyFeatures.points.push(point);
            }
        } else if (!current.description) {
            current.description = line;
        } else {
            current.description = `${current.description} ${line}`.trim();
        }
    }

    pushCurrent();
    return projects;
}

export function parseResumeTextLocally(text) {
    const sections = splitIntoSections(text);
    const generalInfo = extractContactInfo(text, sections.header || []);

    return {
        generalInfo,
        summary: { summary: (sections.summary || []).join("\n") },
        experience: parseExperienceOrEducation(sections.experience || [], "experience"),
        education: parseExperienceOrEducation(sections.education || [], "education"),
        skills: parseSkills(sections.skills || []),
        projects: parseProjects(sections.projects || []),
        languages: parseLanguages(sections.languages || []),
        hobbies: parseHobbies(sections.hobbies || []),
        customSections: sections.certifications?.length
            ? [{
                title: "Certifications",
                content: {
                    text: "",
                    items: parseBulletPoints(sections.certifications),
                    links: [],
                    contact: { phone: "", email: "" },
                },
            }]
            : [],
    };
}

export function isOpenAiConfigured() {
    const apiKey = process.env.OPENAI_API_KEY?.trim();
    if (!apiKey) return false;
    if (/placeholder|your[_-]?api[_-]?key|sk-xxxx|insert[_-]?key/i.test(apiKey)) return false;
    return apiKey.startsWith("sk-");
}
