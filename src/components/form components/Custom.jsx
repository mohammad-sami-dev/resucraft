import React from "react";

const createEmptySection = () => ({
  title: "",
  content: {
    text: "",
    items: [],
    links: [],
    contact: { phone: "", email: "" },
  },
});

// Backward compatibility:
// - old block model -> merged content model
// - missing/invalid shape -> safe defaults
const normalizeSection = (section) => {
  if (!section || typeof section !== "object") return createEmptySection();

  // already new model
  if (section.content && typeof section.content === "object") {
    return {
      title: section.title || "",
      content: {
        text: section.content.text || "",
        items: Array.isArray(section.content.items) ? section.content.items : [],
        links: Array.isArray(section.content.links) ? section.content.links : [],
        contact: {
          phone: section.content.contact?.phone || "",
          email: section.content.contact?.email || "",
        },
      },
    };
  }

  // migrate old block model
  const merged = createEmptySection();
  merged.title = section.title || "";

  if (Array.isArray(section.blocks)) {
    section.blocks.forEach((block) => {
      if (!block || typeof block !== "object") return;

      if (block.type === "text" && typeof block.content === "string") {
        merged.content.text = merged.content.text
          ? `${merged.content.text}\n${block.content}`
          : block.content;
      }

      if (block.type === "list" && Array.isArray(block.items)) {
        merged.content.items = [...merged.content.items, ...block.items.filter(Boolean)];
      }

      if (block.type === "links" && Array.isArray(block.links)) {
        merged.content.links = [...merged.content.links, ...block.links.filter(Boolean)];
      }

      if (block.type === "contact") {
        merged.content.contact.phone = merged.content.contact.phone || block.phone || "";
        merged.content.contact.email = merged.content.contact.email || block.email || "";
      }
    });
  }

  return merged;
};

const Custom = ({ data = [], setData, visible, setVisible }) => {
  const sections = Array.isArray(data) ? data.map(normalizeSection) : [];

  const updateSections = (updater) => {
    const next = updater(sections);
    setData(Array.isArray(next) ? next : []);
  };

  const addSection = () => {
    updateSections((prev) => [...prev, createEmptySection()]);
  };

  const removeSection = (sectionIndex) => {
    updateSections((prev) => prev.filter((_, i) => i !== sectionIndex));
  };

  const updateTitle = (sectionIndex, value) => {
    updateSections((prev) =>
      prev.map((section, i) =>
        i === sectionIndex ? { ...section, title: value } : section
      )
    );
  };

  const updateText = (sectionIndex, value) => {
    updateSections((prev) =>
      prev.map((section, i) =>
        i === sectionIndex
          ? { ...section, content: { ...section.content, text: value } }
          : section
      )
    );
  };

  const addListItem = (sectionIndex) => {
    updateSections((prev) =>
      prev.map((section, i) => {
        if (i !== sectionIndex) return section;
        const items = section.content.items.length ? [...section.content.items] : [""];
        return {
          ...section,
          content: { ...section.content, items: [...items, ""] },
        };
      })
    );
  };

  const updateListItem = (sectionIndex, itemIndex, value) => {
    updateSections((prev) =>
      prev.map((section, i) => {
        if (i !== sectionIndex) return section;
        const items = section.content.items.length ? [...section.content.items] : [""];
        items[itemIndex] = value;
        return {
          ...section,
          content: { ...section.content, items },
        };
      })
    );
  };

  const removeListItem = (sectionIndex, itemIndex) => {
    updateSections((prev) =>
      prev.map((section, i) => {
        if (i !== sectionIndex) return section;
        const items = (section.content.items || []).filter((_, k) => k !== itemIndex);
        return {
          ...section,
          content: { ...section.content, items: items.length ? items : [""] },
        };
      })
    );
  };

  const addLink = (sectionIndex) => {
    updateSections((prev) =>
      prev.map((section, i) => {
        if (i !== sectionIndex) return section;
        const links = section.content.links.length ? [...section.content.links] : [""];
        return {
          ...section,
          content: { ...section.content, links: [...links, ""] },
        };
      })
    );
  };

  const updateLink = (sectionIndex, linkIndex, value) => {
    updateSections((prev) =>
      prev.map((section, i) => {
        if (i !== sectionIndex) return section;
        const links = section.content.links.length ? [...section.content.links] : [""];
        links[linkIndex] = value;
        return {
          ...section,
          content: { ...section.content, links },
        };
      })
    );
  };

  const removeLink = (sectionIndex, linkIndex) => {
    updateSections((prev) =>
      prev.map((section, i) => {
        if (i !== sectionIndex) return section;
        const links = (section.content.links || []).filter((_, k) => k !== linkIndex);
        return {
          ...section,
          content: { ...section.content, links: links.length ? links : [""] },
        };
      })
    );
  };

  const updateContact = (sectionIndex, field, value) => {
    updateSections((prev) =>
      prev.map((section, i) =>
        i === sectionIndex
          ? {
            ...section,
            content: {
              ...section.content,
              contact: { ...section.content.contact, [field]: value },
            },
          }
          : section
      )
    );
  };

  return (
    <div className="custom-container-form">
      <div className="toggle-visibility-btn">
        <h3>Custom Sections</h3>

        <div
          className={`toggle-pill ${visible ? "on" : ""}`}
          onClick={() => setVisible(!visible)}
        >
          <div className="toggle-text-track">
            <span className="toggle-text hide">Show</span>
            <span className="toggle-text show">Hide</span>
          </div>
          <div className="toggle-knob" />
        </div>
      </div>

      {visible && (
        <>
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="custom-section-block">
              <input
                type="text"
                placeholder="Section Title"
                value={section.title}
                onChange={(e) => updateTitle(sectionIndex, e.target.value)}
              />



              <div className="custom-block">
                <textarea
                  placeholder="Description / paragraph text"
                  value={section.content.text}
                  onChange={(e) => updateText(sectionIndex, e.target.value)}
                />

                {(section.content.items.length ? section.content.items : [""]).map((item, itemIndex, arr) => {
                  const isLast = itemIndex === arr.length - 1;
                  const isEmpty = !item?.trim();

                  return (
                    <div key={itemIndex} className="custom-inline-actions">
                      <input
                        type="text"
                        placeholder="List item"
                        value={item}
                        onChange={(e) => updateListItem(sectionIndex, itemIndex, e.target.value)}
                      />
                      <button
                        type="button"
                        disabled={isLast && isEmpty}
                        onClick={() =>
                          isLast
                            ? addListItem(sectionIndex)
                            : removeListItem(sectionIndex, itemIndex)
                        }
                      >
                        {isLast ? "Add" : "Remove"}
                      </button>
                    </div>
                  );
                })}

                {(section.content.links.length ? section.content.links : [""]).map((link, linkIndex, arr) => {
                  const isLast = linkIndex === arr.length - 1;
                  const isEmpty = !link?.trim();

                  return (
                    <div key={linkIndex} className="custom-inline-actions">
                      <input
                        type="text"
                        placeholder="https://..."
                        value={link}
                        onChange={(e) => updateLink(sectionIndex, linkIndex, e.target.value)}
                      />
                      <button
                        type="button"
                        disabled={isLast && isEmpty}
                        onClick={() =>
                          isLast
                            ? addLink(sectionIndex)
                            : removeLink(sectionIndex, linkIndex)
                        }
                      >
                        {isLast ? "Add" : "Remove"}
                      </button>
                    </div>
                  );
                })}

                <div className="custom-inline-actions">
                  <input
                    type="text"
                    placeholder="Phone (optional)"
                    value={section.content.contact.phone}
                    onChange={(e) =>
                      updateContact(sectionIndex, "phone", e.target.value)
                    }
                  />
                  <input
                    type="email"
                    placeholder="Email (optional)"
                    value={section.content.contact.email}
                    onChange={(e) =>
                      updateContact(sectionIndex, "email", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="custom-actions-row">
                <button type="button" className="rem-custom-btn" onClick={() => removeSection(sectionIndex)}>
                  Remove Section
                </button>

              </div>
            </div>

          ))}



          <button type="button" className="add-custom-btn" onClick={addSection}>
            + Add Section
          </button>


        </>
      )}
    </div>

  );
};

export default Custom;