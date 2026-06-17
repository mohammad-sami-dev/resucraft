import React from "react";
import "../../styles/pdfstyles/pdfLayoutTwo.css";
import "../../styles/pdfstyles/pdfDocument.css"
import formatDateRange from "../../utils/formatDateRange.js";
import getTheme from "../../utils/getTheme.js"

import { prepareCustomSection } from "../../utils/sections/prepareCustomSection.js";


const PDFLayoutTwo = (({ generalInfo, experience, education, skills, summary, projects, hobbies, languages, customSections, visibleSections, style = {}, }) => {

  const ui = getTheme(style);

  return (

    <div className="pdf2-page" style={{ fontFamily: ui.fontFamily, fontSize: ui.fontSize, color: ui.textColor, backgroundColor: ui.pageBg }}>
      {/* HEADER SECTION */}
      <div className="pdf2-header-section">
        <div className="pdf2-header-content">
          <div className="pdf2-header-left">
            <h1 className="pdf2-name" style={{ color: ui.headingColor }}>{generalInfo.name || "Full Name"}</h1>
            <div className="pdf2-title" style={{ color: ui.accentColor }}>{generalInfo.title || "Professional Title"}</div>
          </div>
          <div className="pdf2-header-right">
            <div className="pdf2-contact-info">

              {generalInfo.phone && <div className="pdf2-contact-item"  >{generalInfo.phone}</div>}
              {generalInfo.location && <div className="pdf2-contact-item">{generalInfo.location}</div>}
              {generalInfo.email && <div className="pdf2-contact-item" style={{ color: ui.accentColor }}>{generalInfo.email}</div>}
              {generalInfo.website && <div className="pdf2-contact-item">
                <a href={generalInfo.website} target="_blank" rel="noopener noreferrer" style={{ color: ui.accentColor }}>{generalInfo.website}</a>
              </div>}
              {generalInfo.linkedin && <div className="pdf2-contact-item">
                <a href={generalInfo.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: ui.accentColor }}>{generalInfo.linkedin}</a>
              </div>}
              {generalInfo.github && <div className="pdf2-contact-item">
                <a href={generalInfo.github} target="_blank" rel="noopener noreferrer" style={{ color: ui.accentColor }}>{generalInfo.github}</a>
              </div>}
            </div>
          </div>
        </div>
      </div>

      <div className="pdf2-body">
        {/* LEFT COLUMN */}
        <div className="pdf2-left">
          {/* EDUCATION */}
          {visibleSections?.education && education.length > 0 && (
            <>
              {education.map((e, i) => {
                const dateText = formatDateRange(e.startDate, e.endDate)
                return (
                  <div key={i} className="pdf2-block" data-col="left">

                    {i === 0 && (
                      <div className="pdf2-section-head">
                        <h2 style={{ color: ui.headingColor }}>Education</h2>
                      </div>
                    )}

                    <div className="pdf2-education-item">
                      <div className="pdf2-edu-degree">{e.degree}</div>
                      <div className="pdf2-edu-school">{e.school}</div>
                      <div className="pdf2-edu-dates">
                        {dateText && <div>{dateText}</div>}
                      </div>

                      {e.location && <div className="pdf2-edu-location">{e.location}</div>}

                      {e.achievements?.points?.length > 0 && (
                        <div className="pdf2-edu-achievements">
                          <div className="pdf2-achievement-title">{e.achievements.title}</div>
                          <ul>
                            {e.achievements.points.map((p, j) => p && <li key={j}>{p}</li>)}
                          </ul>
                        </div>
                      )}
                    </div>

                  </div>
                )
              })}
            </>
          )}

          {/* LANGUAGES */}
          {visibleSections?.languages && languages.length > 0 && (
            <>
              {languages.map((lang, i) => (
                <div key={i} className="pdf2-block" data-col="left">

                  {i === 0 && (
                    <div className="pdf2-section-head">
                      <h2 style={{ color: ui.headingColor }}>Languages</h2>
                    </div>
                  )}

                  <div className="pdf2-language-item">
                    <div className="pdf2-language-name">{lang.language}</div>
                    <div className="pdf2-language-level">{lang.proficiency}</div>
                  </div>

                </div>
              ))}
            </>
          )}

          {/* HOBBIES */}
          {visibleSections?.hobbies && hobbies.length > 0 && (
            <>
              {hobbies.map((hobby, i) => (
                <div key={i} className="pdf2-block" data-col="left">

                  {i === 0 && (
                    <div className="pdf2-section-head">
                      <h2 style={{ color: ui.headingColor }}>Interests</h2>
                    </div>
                  )}

                  <div className="pdf2-hobby-item">
                    <div className="pdf2-hobby-title">{hobby.title}</div>
                    <div className="pdf2-hobby-desc">{hobby.description}</div>
                  </div>

                </div>
              ))}
            </>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className="pdf2-right">
          {/* PROFILE SUMMARY */}
          {visibleSections?.summary && summary?.summary && (
            <div className="pdf2-block" data-col="right">

              <div className="pdf2-section-head">
                <h2 style={{ color: ui.headingColor }}>Professional Summary</h2>
              </div>

              <div className="pdf2-summary-content">
                <p>{summary.summary}</p>
              </div>

            </div>
          )}

          {/* EXPERIENCE */}
          {visibleSections?.experience && experience.length > 0 && (
            <>
              {experience.map((e, i) => {
                const dateText = formatDateRange(e.startDate, e.endDate)
                return (
                  <div key={i} className="pdf2-block" data-col="right">

                    {i === 0 && (
                      <div className="pdf2-section-head">
                        <h2 style={{ color: ui.headingColor }}> Work Experience</h2>
                      </div>
                    )}

                    <div className="pdf2-experience-item">
                      <div className="pdf2-exp-header">
                        <div className="pdf2-exp-title">
                          <span><strong>{e.position}</strong></span>
                          <span className="pdf2-exp-company"><strong>{e.company}</strong></span>
                        </div>
                        <div className="pdf2-exp-dates">
                          {dateText && <div>{dateText}</div>}
                        </div>
                      </div>
                      {e.location && (
                        <div className="pdf2-exp-location">{e.location}</div>
                      )}

                      {e.achievements?.points?.length > 0 && (
                        <div className="pdf2-exp-achievements">
                          <strong>{e.achievements.title}</strong>
                          <ul>
                            {e.achievements.points.map((point, idx) => (
                              point && <li key={idx}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                  </div>
                )
              })}
            </>
          )}

          {/* PROJECTS */}
          {visibleSections?.projects && projects.length > 0 && (
            <>
              {projects.map((proj, index) => (
                <div key={index} className="pdf2-block" data-col="right">

                  {index === 0 && (
                    <div className="pdf2-section-head">
                      <h2 style={{ color: ui.headingColor }}>Projects</h2>
                    </div>
                  )}
                  <div key={index} className="pdf2-project-item">
                    <div className="pdf2-project-header">
                      <div className="pdf2-project-title">{proj.title}</div>
                      {proj.link && (
                        <a href={proj.link} target="_blank" rel="noopener noreferrer" className="pdf2-project-link" style={{ color: ui.accentColor }}>
                          {proj.link}
                        </a>
                      )}
                      {proj.githubLink && (
                        <a href={proj.githubLink} target="_blank" rel="noopener noreferrer" className="pdf2-project-link" style={{ color: ui.accentColor }}>
                          GitHub
                        </a>
                      )}
                    </div>
                    {proj.description && (
                      <p className="pdf2-project-desc">{proj.description}</p>
                    )}
                    {proj.skillsUsed?.length > 0 && (
                      <div className="pdf2-project-skills">
                        <strong>Technologies:</strong>
                        <div className="pdf2-skills-tags">
                          {proj.skillsUsed.map((skill, i) => (
                            <span key={i} className="pdf2-skill-tag" style={{ backgroundColor: ui.accentColor, color: ui.skillTextColor }}>{skill}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {proj.keyFeatures?.points?.length > 0 && (
                      <div className="pdf2-project-features">
                        <strong>{proj?.keyFeatures?.title?.trim()}</strong>
                        <ul>
                          {proj.keyFeatures?.points.map((feature, i) => (
                            feature && <li key={i}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>


                </div>

              ))

              }



            </>



          )}

          {/* SKILLS */}
          {visibleSections?.skills && skills.length > 0 && (
            <div className="pdf2-block" data-col="right">

              <div className="pdf2-section-head">
                <h2 style={{ color: ui.headingColor }}>Skills</h2>
              </div>

              <div className="pdf2-skills-grid">
                {skills.map((s, i) => (
                  <span key={i} className="pdf2-skill-item" style={{ backgroundColor: ui.skillBox, color: ui.skillTextColor }}>
                    {s.skill}
                  </span>
                ))}
              </div>

            </div>
          )}

          {/* CUSTOM SECTION */}
          {visibleSections?.custom && Array.isArray(customSections) && customSections.length > 0 && (
            <div className="pdf2-section" data-col="right">
              {customSections.map((section, sectionIndex) => {
                const s = prepareCustomSection(section);
                if (!s.hasContent) return null;

                return (
                  <div key={sectionIndex} className="pdf2-custom-section">
                    {s.title && <h2 style={{ color: ui.headingColor }}>{s.title}</h2>}

                    {s.text && <p>{s.text}</p>}

                    {s.items.length > 0 && (
                      <ul>
                        {s.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    )}

                    {s.links.length > 0 && (
                      <ul className="pdf2-custom-links">
                        {s.links.map((link, i) => (
                          <li key={i}>
                            <a href={link} target="_blank" rel="noopener noreferrer" style={{ color: ui.accentColor }}>
                              {link}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}

                    {(s.contact.phone || s.contact.email) && (
                      <div className="pdf2-custom-contact">
                      <p>
                        {s.contact.phone}
                        {s.contact.phone && s.contact.email ? " • " : ""}
                        {s.contact.email}
                      </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>

  );
});

export default PDFLayoutTwo;