import React from "react";
import "../../styles/pdfstyles/PdfLayoutOne.css";
import formatDateRange from "../../utils/formatDateRange.js";
import getTheme from "../../utils/getTheme.js"

import { prepareCustomSection } from "../../utils/sections/prepareCustomSection.js";

const PDFLayoutOne = ((props = {}) => {
  const {
    generalInfo = {},
    summary = {},
    experience = [],
    education = [],
    skills = [],
    style = {},
    projects = [],
    languages = [],
    hobbies = [],
    customSections,
    visibleSections = {},
  } = props;

  const ui = getTheme(style);

  return (

    <div className="pdf1-page" style={{ fontFamily: ui.fontFamily, fontSize: ui.fontSize, color: ui.textColor, backgroundColor: ui.pageBg }}>
      <div className="pdf1-body">
        {/* LEFT COLUMN - SIDEBAR */}
        <div className="pdf1-left">
          {/* General Info */}
          <div className="pdf1-section pdf1-general" data-col="left" data-fixed>
            {generalInfo?.name && <h2 data-pdf-text="name" style={{ color: ui.headingColor }}>{generalInfo.name}</h2>}
            {generalInfo?.title && <p data-pdf-text="title" style={{ color: ui.accentColor, fontWeight: "600", fontSize: "14px", borderBottom: "1px solid #ccc" }}>{generalInfo.title}</p>}
            {generalInfo?.phone && <p data-pdf-text="phone">{generalInfo.phone}</p>}
            {generalInfo?.location && <p data-pdf-text="location">{generalInfo.location}</p>}
            {generalInfo?.email && <a data-pdf-link={`mailto:${generalInfo.email}`} href={`mailto:${generalInfo.email}`} style={{ color: ui.accentColor }}>{generalInfo.email}</a>}

            {generalInfo?.website && <div><a data-pdf-link={generalInfo.website} href={generalInfo.website} target="_blank" rel="noopener noreferrer" style={{ color: ui.accentColor }} >{generalInfo.website}</a></div>}
            {generalInfo?.linkedin && <div><a data-pdf-link={generalInfo.linkedin} href={generalInfo.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: ui.accentColor }}>{generalInfo.linkedin}</a></div>}
            {generalInfo?.github && <div><a data-pdf-link={generalInfo.github} href={generalInfo.github} target="_blank" rel="noopener noreferrer" style={{ color: ui.accentColor }}>{generalInfo.github}</a></div>}
          </div>

          {/* Education */}
          {visibleSections?.education && education.length > 0 && (
            <>
              {education.map((e, i) => {
                const dateText = formatDateRange(e.startDate, e.endDate)
                return (
                  <div key={i} className="pdf1-block" data-col="left">

                    {i === 0 && <h2 data-pdf-text="section-heading" className="section-heading" style={{ color: ui.headingColor }}>Education</h2>}

                    <div className="edu-item">
                      <strong>{e.degree}</strong>
                      <strong>{e.school}</strong>

                      {dateText && <div>{dateText}</div>}
                      {e.location && <p className="pdf1-edu-location">{e.location}</p>}

                      {e.achievements?.points?.length > 0 && (
                        <div className="edu-achievements">
                          <strong>{e.achievements.title}</strong>
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


          {/* Languages */}
          {visibleSections?.languages && languages.length > 0 && (
            <div className="pdf1-section" data-col="left">
              <h2 data-pdf-text="section-heading" className="section-heading" style={{ color: ui.headingColor }}>Languages</h2>
              {languages.map((lang, index) => (
                <div key={index} className="language-item">
                  <strong>{lang.language}</strong>
                  <p>{lang.proficiency}</p>
                </div>
              ))}
            </div>
          )}

          {/* Hobbies */}
          {visibleSections?.hobbies && hobbies.length > 0 && (
            <div className="pdf1-section" data-col="left">
              <h2 data-pdf-text="section-heading" className="section-heading" style={{ color: ui.headingColor }}>Hobbies & Interests</h2>
              {hobbies.map((hobby, index) => (
                <div key={index} className="hobby-item">
                  <strong>{hobby.title}</strong>
                  <p>{hobby.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN - MAIN CONTENT */}
        <div className="pdf1-right">
          {/* Profile Summary */}
          {visibleSections?.summary && summary?.summary && (
            <div className="pdf1-block" data-col="right">

              <h2 data-pdf-text="section-heading" className="section-heading" style={{ color: ui.headingColor }}>Professional Summary</h2>

              <p>{summary.summary}</p>

            </div>
          )}

          {/* Experience */}
          {visibleSections?.experience && experience.length > 0 && (
            <>
              {experience.map((e, i) => {
                const dateText = formatDateRange(e.startDate, e.endDate)
                return (
                  <div key={i} className="pdf1-block" data-col="right">

                    {i === 0 && <h2 data-pdf-text="section-heading" className="section-heading" style={{ color: ui.headingColor }}>Work Experience</h2>}

                    <div className="exp-item">
                      <span><strong>{e.position}</strong></span>
                      <span><strong>{e.company}</strong></span>
                      <div className="pdf1-text"> {dateText && <div>{dateText}</div>}</div>
                      {e.location && (
                        <div className="pdf1-exp-location">{e.location}</div>
                      )}

                      {e.achievements?.points?.length > 0 && (
                        <div className="exp-achievements">
                          <strong>{e.achievements.title}</strong>
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

          {/* Projects */}
          {visibleSections?.projects && projects.length > 0 && (
            <>
              {projects.map((proj, index) => (
                <div key={index} className="pdf1-block" data-col="right">

                  {index === 0 && <h2 data-pdf-text="section-heading" className="section-heading" style={{ color: ui.headingColor }}>Projects</h2>}

                  <div className="project-item">
                    <strong className="project-title" style={{ color: ui.headingColor }}>{proj.title}</strong>

                    {proj.link && (
                      <a data-pdf-link={proj.link} href={proj.link} target="_blank" rel="noopener noreferrer" className="pdf1-project-link" style={{ color: ui.accentColor }}>
                        {proj.link}
                      </a>
                    )}
                    {proj.githubLink && (
                      <a href={proj.githubLink} target="_blank" rel="noopener noreferrer" className="pdf1-project-link" style={{ color: ui.accentColor }}>
                        GitHub
                      </a>
                    )}

                    {proj.description && <p>{proj.description}</p>}

                    {proj.skillsUsed?.length > 0 && (
                      <div className="project-skills">
                        <strong>Technologies Used:</strong>
                        <div>
                          {proj.skillsUsed.map((skill, i) => (
                            <span key={i} className="pdf1-skill" style={{ backgroundColor: ui.accentColor, color: ui.skillTextColor }}>{skill}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {proj.keyFeatures?.points?.length > 0 && (
                      <div className="project-key-feature">
                        <strong>{proj?.keyFeatures?.title?.trim()}</strong>
                        <ul className="feature-list">
                          {proj.keyFeatures?.points.map((feature, i) => (

                            feature && <li key={i}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    )}


                  </div>

                </div>
              ))}
            </>
          )}


          {/* Skills */}
          {visibleSections?.skills && skills.length > 0 && (
            <div className="pdf1-block" data-col="right">

              <div>
                <h2 className="section-heading" style={{ color: ui.headingColor }}>Skills</h2>
              </div>

              <div className="pdf1-skills-grid">
                {skills.map((s, i) => (
                  <span key={i} className="pdf2-skill-item" style={{ backgroundColor: ui.skillBox, color: ui.skillTextColor }}>
                    {s.skill}
                  </span>
                ))}
              </div>

            </div>
          )}

          {/* Custom Section */}
          {visibleSections?.custom && Array.isArray(customSections) && customSections.length > 0 && (
            <div className="pdf1-block" data-col="right">
              {customSections.map((section, sectionIndex) => {
                const s = prepareCustomSection(section);
                if (!s.hasContent) return null;

                return (
                  <div key={sectionIndex} className="custom-section-block">
                    {s.title && (
                      <h2
                        data-pdf-text="section-heading"
                        className="section-heading"
                        style={{ color: ui.headingColor }}
                      >
                        {s.title}
                      </h2>
                    )}

                    {s.text && <p>{s.text}</p>}

                    {s.items.length > 0 && (
                      <ul>
                        {s.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    )}

                    {s.links.length > 0 && (
                      <ul className="custom-links">
                        {s.links.map((link, i) => (
                          <li key={i}>
                            <a
                              data-pdf-link={link}
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: ui.accentColor }}
                            >
                              {link}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}

                    {(s.contact.phone || s.contact.email) && (
                      <p>
                        {s.contact.phone}
                        {s.contact.phone && s.contact.email ? " • " : ""}
                        {s.contact.email}
                      </p>
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


export default PDFLayoutOne;