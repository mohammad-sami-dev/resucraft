

export function normalizeImportedResume(data = {}) {
    const toString = (v) => (typeof v === "string" ? v.trim() : "");

    const normalizeCustomSections = (data) => {
        if (Array.isArray(data.customSections)) {
            return data.customSections.map((s) => ({
                title: toString(s?.title),
                content: {
                    text: toString(s?.content?.text),
                    items: Array.isArray(s?.content?.items) ? s.content.items.map(toString).filter(Boolean) : [],
                    links: Array.isArray(s?.content?.links) ? s.content.links.map(toString).filter(Boolean) : [],
                    contact: {
                        phone: toString(s?.content?.contact?.phone),
                        email: toString(s?.content?.contact?.email),
                    },
                },
            })).filter(
                (s) =>
                    s.title ||
                    s.content.text ||
                    s.content.items.length ||
                    s.content.links.length ||
                    s.content.contact.phone ||
                    s.content.contact.email
            );
        }

        // fallback: migrate old single custom block
        const c = data.custom;
        if (!c || typeof c !== "object") return [];

        const content = { text: "", items: [], links: [], contact: { phone: "", email: "" } };

        if (c.type === "text") content.text = toString(c.description);
        if (c.type === "list") content.items = (Array.isArray(c.listItems) ? c.listItems : []).map(toString).filter(Boolean);
        if (c.type === "links") content.links = (Array.isArray(c.links) ? c.links : []).map(toString).filter(Boolean);
        if (c.type === "contact") {
            content.contact.phone = toString(c.phone);
            content.contact.email = toString(c.email);
        }

        if (!(toString(c.title) || content.text || content.items.length || content.links.length || content.contact.phone || content.contact.email)) {
            return [];
        }

        return [{ title: toString(c.title), content }];
    };

    const normalizePointsBlock = (block, fallbackTitle = "") => {
        const points = Array.isArray(block)
            ? block.map(toString).filter(Boolean)
            : block && typeof block === "object"
                ? (Array.isArray(block.points) ? block.points : []).map(toString).filter(Boolean)
                : [];

        if (points.length === 0) return { title: "", points: [""] };

        return {
            title: (block && typeof block === "object" ? toString(block.title) : "") || fallbackTitle,
            points,
        };
    };


    return {
        generalInfo: {
            name: data.generalInfo?.name || "",
            email: data.generalInfo?.email || "",
            phone: data.generalInfo?.phone || "",
            location: data.generalInfo?.location || "",
            github: data.generalInfo?.github || "",
            linkedin: data.generalInfo?.linkedin || "",
            website: data.generalInfo?.website || "",
            title: data.generalInfo?.title || ""
        },

        summary: {
            summary: data.summary?.summary || ""
        },

        education: (data.education || []).map(e => ({
            school: e.school || e.institution || "",
            degree: e.degree || "",
            location: e.location || "",
            startDate: e.startDate || e.from || e.start || "",
            endDate: e.endDate || e.to || e.end || "",
            achievements: normalizePointsBlock(e.achievements, "")
        })),

        experience: (data.experience || []).map(e => ({
            company: e.company || "",
            position: e.position || e.jobTitle || e.role || "",
            location: e.location || "",
            startDate: e.startDate || e.from || e.start || "",
            endDate: e.endDate || e.to || e.end || "",
            achievements: normalizePointsBlock(e.achievements, "")
        })),

        skills: (data.skills || []).map(s => ({
            skill: typeof s === "string" ? s : (s?.skill || "")
        })),

        projects: (data.projects || []).map(p => ({
            title: p.title || p.name || "",
            description: p.description || "",
            link: p.link || p.liveLink || p.url || "",
            githubLink: p.githubLink || p.repoLink || p.repository ||p.codeLink || "",
            skillsUsed: Array.isArray(p.skillsUsed)
                ? p.skillsUsed
                : typeof p.techStack === "string"
                    ? p.techStack.split(",").map(x => x.trim()).filter(Boolean)
                    : [],
            keyFeatures: normalizePointsBlock(
                p.keyFeatures || p.features || p.highlights,
                "Key Features"
            )
        })),

        languages: (data.languages || []).map(l => ({
            language: typeof l === "string" ? l : l.language || "",
            proficiency: typeof l === "string" ? "" : l.proficiency || ""
        })),

        hobbies: (data.hobbies || []).map(h => ({
            title: typeof h === "string" ? h : h.title || "",
            description: typeof h === "string" ? "" : h.description || ""
        })),

        customSections:normalizeCustomSections(data), 
    }
} 