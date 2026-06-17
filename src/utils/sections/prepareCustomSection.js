const clean = (v) => (typeof v === "string" ? v.trim() : "");

const normalizeUrl = (url = "") => {
    const raw = clean(url);
    if (!raw) return "";
    if (/^https?:\/\//i.test(raw)) return raw;
    return `https://${raw}`;
};

export const prepareCustomSection = (section = {}) => {
    const content = section?.content || {};

    const text = clean(content.text);
    const items = Array.isArray(content.items)
        ? content.items.map(clean).filter(Boolean)
        : [];

    const links = Array.isArray(content.links)
        ? content.links.map(normalizeUrl).filter(Boolean)
        : [];

    const contact = {
        phone: clean(content.contact?.phone),
        email: clean(content.contact?.email),
    };


    return {
        title: clean(section.title),
        text,
        items,
        links,
        contact,
        hasContent: Boolean(
            clean(section.title) ||
            text ||
            items.length ||
            links.length ||
            contact.length ||
            contact.email
        ),
    };
};