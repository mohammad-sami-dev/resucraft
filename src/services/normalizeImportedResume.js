const DEFAULT_GENERAL_INFO = {
    name: "",
    email: "",
    phone: "",
    location: "",
    github: "",
    linkedin: "",
    website: "",
    title: "",
};

const DEFAULT_EDUCATION_ITEM = {
    school: "",
    degree: "",
    startDate: "",
    endDate: "",
    location: "",
    achievements: { title: "", points: [""] },
};

const DEFAULT_EXPERIENCE_ITEM = {
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    location: "",
    achievements: { title: "", points: [""] },
};

const DEFAULT_PROJECT_ITEM = {
    title: "",
    company: "",
    description: "",
    skillsUsed: [],
    keyFeatures: { title: "", points: [""] },
    link: "",
    githubLink: "",
};

const DEFAULT_SKILL_ITEM = { skill: "" };
const DEFAULT_HOBBY_ITEM = { title: "", description: "" };
const DEFAULT_LANGUAGE_ITEM = { language: "", proficiency: "" };

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

function normalizeSkills(skills) {
    if (!skills) return [{ skill: "" }];

    if (typeof skills === "string") {
        const arr = skills.split(",").map((s) => s.trim()).filter(Boolean);
        return arr.length > 0 ? arr.map((skill) => ({ skill })) : [{ skill: "" }];
    }

    if (Array.isArray(skills)) {
        if (skills.length === 0) return [{ skill: "" }];
        const mapped = skills.map((s) => ({
            skill: typeof s === "string" ? s.trim() : (s?.skill || s?.name || ""),
        })).filter((s) => s.skill);
        return mapped.length > 0 ? mapped : [{ skill: "" }];
    }

    return [{ skill: "" }];
}

function extractGeneralInfo(data) {
    const gi = data.generalInfo || {};
    return {
        name: gi.name || data.name || "",
        title: gi.title || data.title || data.jobTitle || "",
        email: gi.email || data.email || "",
        phone: gi.phone || data.phone || "",
        location: gi.location || data.location || data.address || "",
        linkedin: gi.linkedin || data.linkedin || "",
        github: gi.github || data.github || "",
        website: gi.website || data.website || "",
    };
}

function withDefaultArray(arr, defaultItem) {
    if (!Array.isArray(arr) || arr.length === 0) return [{ ...defaultItem }];
    return arr;
}

function parseTechToSkillsUsed(tech) {
    if (Array.isArray(tech)) return tech.map(String).filter(Boolean);
    if (typeof tech === "string" && tech.trim()) {
        return tech.split(",").map((s) => s.trim()).filter(Boolean);
    }
    return [];
}

function normalizeCustomSections(data) {
    if (!Array.isArray(data.customSections)) return [];

    return data.customSections.map((section) => ({
        title: section?.title || "",
        content: {
            text: section?.content?.text || "",
            items: Array.isArray(section?.content?.items) ? section.content.items.map(String) : [],
            links: Array.isArray(section?.content?.links) ? section.content.links.map(String) : [],
            contact: {
                phone: section?.content?.contact?.phone || "",
                email: section?.content?.contact?.email || "",
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

export function normalizeImportedResume(data = {}) {
    const generalInfo = { ...DEFAULT_GENERAL_INFO, ...extractGeneralInfo(data) };

    const summaryText =
        (typeof data.summary === "string" ? data.summary : data.summary?.summary)
        || data.profile
        || data.objective
        || data.about
        || data.professionalSummary
        || "";

    const education = (data.education || []).map((e) => ({
        school: e.school || e.institution || e.university || "",
        degree: e.degree || e.qualification || "",
        location: e.location || e.field || "",
        startDate: normalizeMonthDate(e.startDate || e.from || e.start || ""),
        endDate: normalizeMonthDate(e.endDate || e.to || e.end || ""),
        achievements: normalizePointsBlock(getAchievementsSource(e), ""),
    }));

    const experience = (data.experience || data.workExperience || data.work || []).map((e) => {
        const achievementSource =
            getAchievementsSource(e)
            || (typeof e.description === "string" ? e.description : null);

        return {
            company: e.company || e.employer || e.organization || "",
            position: e.role || e.title || e.position || e.jobTitle || "",
            location: e.location || "",
            startDate: normalizeMonthDate(e.startDate || e.from || e.start || ""),
            endDate: normalizeMonthDate(
                e.current || /present|current/i.test(String(e.endDate || e.to || e.end || ""))
                    ? ""
                    : (e.endDate || e.to || e.end || "")
            ),
            achievements: normalizePointsBlock(achievementSource, ""),
        };
    });

    const projects = (data.projects || data.portfolio || []).map((p) => ({
        title: p.name || p.title || "",
        company: p.company || "",
        description: p.description || p.summary || "",
        link: p.link || p.url || p.liveLink || p.demoLink || "",
        githubLink: p.github || p.githubLink || p.repoLink || p.repository || "",
        skillsUsed: parseTechToSkillsUsed(
            p.tech || p.skillsUsed || p.techStack || p.technologies || p.stack
        ),
        keyFeatures: normalizePointsBlock(
            p.keyFeatures || p.features || p.highlights || null,
            "Key Features"
        ),
    }));

    const languages = (data.languages || []).map((l) => ({
        language: typeof l === "string" ? l : (l.language || l.name || ""),
        proficiency: typeof l === "string" ? "" : (l.level || l.proficiency || ""),
    })).filter((l) => l.language);

    const hobbies = (data.hobbies || data.interests || []).map((h) => ({
        title: typeof h === "string" ? h : (h.hobby || h.title || h.name || ""),
        description: typeof h === "string" ? "" : (h.description || ""),
    })).filter((h) => h.title || h.description);

    return {
        generalInfo,
        summary: { summary: summaryText },
        education: withDefaultArray(education, DEFAULT_EDUCATION_ITEM),
        experience: withDefaultArray(experience, DEFAULT_EXPERIENCE_ITEM),
        projects: withDefaultArray(projects, DEFAULT_PROJECT_ITEM),
        skills: normalizeSkills(data.skills),
        languages: withDefaultArray(languages, DEFAULT_LANGUAGE_ITEM),
        hobbies: withDefaultArray(hobbies, DEFAULT_HOBBY_ITEM),
        customSections: normalizeCustomSections(data),
    };
}
