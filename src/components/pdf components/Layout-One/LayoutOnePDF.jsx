import React from "react";
import { View, Text, Link } from "@react-pdf/renderer";
import PdfDocument from "../pdfDocument.jsx";
import styles from "./layoutOne.styles";
import formatDateRange from "../../../utils/formatDateRange.js";
import getTheme from "../../../utils/getTheme.js"

import { prepareCustomSection } from "../../../utils/sections/prepareCustomSection";


const LayoutOnePDF = ({
  generalInfo,
  summary,
  education,
  experience,
  projects,
  skills,
  languages,
  hobbies,
  customSections,
  visibleSections,
  style = {}
}) => {



  const pdfTheme = getTheme(style);
  // branding logic
  const shouldShowBranding = style?.showBranding !== false;


  return (
    <PdfDocument>
      <View style={[styles.page, { backgroundColor: pdfTheme.pageBg, fontFamily: pdfTheme.fontFamily }]}>
        <View style={[styles.body, { fontFamily: pdfTheme.fontFamily }]}>

          {/* LEFT COLUMN */}
          <View style={styles.left}>
            {generalInfo?.name && (
              <Text style={[styles.name, { color: pdfTheme.headingColor }]}>{generalInfo.name}</Text>
            )}

            {generalInfo?.title && (
              <Text style={[styles.title, { color: pdfTheme.accentColor }]}>{generalInfo.title}</Text>
            )}


            {generalInfo?.phone && (
              <Text style={[styles.text, { color: pdfTheme.textColor }]}>{generalInfo.phone}</Text>
            )}

            {generalInfo?.location && (
              <Text style={[styles.text, { color: pdfTheme.textColor }]}>{generalInfo.location}</Text>
            )}

            {generalInfo?.email && (
              <Link style={[styles.link, { color: pdfTheme.accentColor }]} src={`mailto:${generalInfo.email}`}>
                {generalInfo.email}
              </Link>
            )}

            {generalInfo?.github && (
              <Link style={[styles.link, { color: pdfTheme.accentColor }]} src={generalInfo.github}>
                {generalInfo.github}
              </Link>
            )}
            {generalInfo?.linkedin && (
              <Link style={[styles.link, { color: pdfTheme.accentColor }]} src={generalInfo.linkedin}>
                {generalInfo.linkedin}
              </Link>
            )}
            {generalInfo?.website && (
              <Link style={[styles.link, { color: pdfTheme.accentColor }]} src={generalInfo.website}>
                {generalInfo.website}
              </Link>
            )}

            {visibleSections?.education && education?.length > 0 && (
              <View style={styles.block}>
                <Text style={[styles.sectionHeader, { color: pdfTheme.headingColor }]}>Education</Text>
                {education.map((e, i) => {
                  const dateText = formatDateRange(e.startDate, e.endDate);
                  return (
                    <View key={i}>
                      <Text style={[styles.eduDegree, { color: pdfTheme.textColor }]}>{e.degree}</Text>
                      <Text style={[styles.eduSchool, { color: pdfTheme.textColor }]}>{e.school}</Text>
                      <Text style={[styles.eduDates, { color: pdfTheme.textColor }]}>
                        {dateText && dateText}
                      </Text>
                      {e.location && (
                        <Text style={[styles.eduLocation, { color: pdfTheme.textColor }]}>{e.location}</Text>
                      )}
                      {e.achievements && (
                        <Text style={[styles.achievementsHead, { color: pdfTheme.headingColor }]}>{e.achievements.title}</Text>

                      )}
                      {e.achievements?.points
                        ?.filter(point => point?.trim())
                        .map((achievement, j) => (
                          <View key={j} style={styles.bulletRow} wrap={false}>
                            <Text style={[styles.bulletSymbol, { color: pdfTheme.textColor }]}>•</Text>
                            <Text style={[styles.bulletText, { color: pdfTheme.textColor }]}>{achievement}</Text>
                          </View>
                        ))}

                    </View>
                  )
                })}
              </View>
            )}

            {visibleSections?.languages && languages?.length > 0 && (
              <View style={styles.block}>
                <Text style={[styles.sectionHeader, { color: pdfTheme.headingColor }]}>Languages</Text>
                {languages.map((l, i) => (
                  <View key={i} style={styles.langItem}>
                    <Text style={[styles.smallText, { color: pdfTheme.textColor }]}>{l.language}</Text>
                    <Text style={[styles.smallTextLang, { color: pdfTheme.textColor }]}>{l.proficiency}</Text>
                  </View>
                ))}
              </View>
            )}

            {visibleSections?.hobbies && hobbies?.length > 0 && (
              <View style={styles.block}>
                <Text style={[styles.sectionHeader, { color: pdfTheme.headingColor }]}>Interests</Text>
                {hobbies.map((h, i) => (
                  <View key={i} style={styles.hobbyItem}>
                    <Text style={[styles.hobbyTitle, { color: pdfTheme.headingColor }]}>{h.title}</Text>
                    <Text style={[styles.hobbyDescription, { color: pdfTheme.textColor }]}>{h.description}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* RIGHT COLUMN */}
          <View style={styles.right}>
            {visibleSections?.summary && summary?.summary && (
              <>
                <Text style={[styles.sectionHeader, { color: pdfTheme.headingColor }]}>Professional Profile</Text>
                <Text style={[styles.text, { color: pdfTheme.textColor }]}>{summary.summary}</Text>
              </>
            )}

            {visibleSections?.experience && experience?.length > 0 && (
              <View style={styles.block}>
                <Text style={[styles.sectionHeader, { color: pdfTheme.headingColor }]}>Work Experience</Text>
                {experience.map((e, i) => {
                  const dateText = formatDateRange(e.startDate, e.endDate);
                  return (
                    <View key={i}>
                      <View style={styles.expHeader}>
                        <Text style={styles.expTitle}>
                          <Text style={[styles.expPosition, { color: pdfTheme.textColor }]}>{e.position}</Text>
                          {"\n"}
                          <Text style={[styles.expCompany, { color: pdfTheme.textColor }]}>{e.company}</Text>
                        </Text>
                        <Text style={[styles.expDates, { color: pdfTheme.textColor }]}>
                          {dateText && dateText}
                        </Text>
                      </View>
                      {e.location && (
                        <Text style={[styles.eduLocation, { color: pdfTheme.textColor }]}>{e.location}</Text>
                      )}
                      {e.achievements && (
                        <Text style={[styles.achievementsHead, { color: pdfTheme.headingColor }]}>{e.achievements.title}</Text>
                      )}
                      {e.achievements?.points
                        ?.filter(point => point?.trim())
                        .map((achievement, j) => (
                          <View key={j} style={styles.bulletRow} wrap={false}>
                            <Text style={[styles.bulletSymbol, { color: pdfTheme.textColor }]}>•</Text>
                            <Text style={[styles.bulletText, { color: pdfTheme.textColor }]}>{achievement}</Text>
                          </View>
                        ))}
                    </View>
                  )
                })}
              </View>
            )}

            {visibleSections?.projects && projects?.length > 0 && (
              <View style={styles.block}>
                <Text style={[styles.sectionHeader, { color: pdfTheme.headingColor }]}>Projects</Text>

                {projects.map((p, i) => (
                  <View key={i} style={{ marginBottom: 14 }}>

                    {/* Project title + link */}
                    <View style={{ marginBottom: 4 }}>
                      <Text style={[styles.projectTitle, { color: pdfTheme.textColor }]}>{p.title}</Text>

                      {p.link && (
                        <Link src={p.link} style={[styles.link, { color: pdfTheme.accentColor }]}>
                          {p.link}
                        </Link>
                      )}
                      {p.githubLink && (
                        <Link src={p.githubLink} style={[styles.link, { color: pdfTheme.accentColor }]}>
                          {p.githubLink}
                        </Link>
                      )}
                    </View>

                    {/* Description */}
                    {p.description && (
                      <Text style={[styles.projectDesc, { color: pdfTheme.textColor }]}>{p.description}</Text>
                    )}

                    {/* Technologies */}
                    {p.skillsUsed?.length > 0 && (
                      <View style={{ marginTop: 4 }}>
                        <Text style={[styles.projectMetaLabel, { color: pdfTheme.textColor }]}>
                          Technologies :
                        </Text>

                        <View style={styles.tagRow}>
                          {p.skillsUsed.map((skill, j) => (
                            <View key={j} style={[styles.tagPill, { backgroundColor: pdfTheme.accentColor }]}>
                              <Text style={[styles.tagText, { color: pdfTheme.skillTextColor }]}>{skill}</Text>
                            </View>
                          ))}

                        </View>
                      </View>
                    )}

                    {/* Key Features */}
                    {p?.keyFeatures?.points?.filter(point => point?.trim()).length > 0 && (
                      <View style={{ marginTop: 6 }}>
                        {p?.keyFeatures?.title?.trim() && (
                          <Text style={[styles.projectMetaLabel, { color: pdfTheme.textColor }]}>
                            {p.keyFeatures.title.trim()}
                          </Text>
                        )}

                        {p.keyFeatures.points
                          .filter(point => point?.trim())
                          .map((point, j) => (
                            <View key={j} style={styles.bulletRow} wrap={false}>
                              <Text style={[styles.bulletSymbol, { color: pdfTheme.textColor }]}>•</Text>
                              <Text style={[styles.bulletText, { color: pdfTheme.textColor }]}>{point}</Text>
                            </View>
                          ))}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}



            {visibleSections?.skills && skills?.length > 0 && (
              <View style={styles.block}>
                <Text style={[styles.sectionHeader, { color: pdfTheme.headingColor }]}>Skills</Text>
                <View style={styles.skillsGrid}>
                  {skills
                    ?.filter(s => s?.skill?.trim())
                    .map((s, i) => (
                      <Text key={i} style={[styles.skillItem, { backgroundColor: pdfTheme.skillBox, color: pdfTheme.skillTextColor }]}>
                        {s.skill}
                      </Text>
                    ))}
                </View>
              </View>
            )}

            {visibleSections?.custom && Array.isArray(customSections) && customSections.length > 0 && (
              <>
                {customSections.map((section, sectionIndex) => {
                  const s = prepareCustomSection(section);
                  if (!s.hasContent) return null;

                  return (
                    <View key={sectionIndex} style={styles.block}>
                      {s?.title && (
                        <Text style={[styles.sectionHeader, { color: pdfTheme.headingColor }]}>
                          {s.title}
                        </Text>
                      )}

                      {s.text && (
                        <Text style={[styles.text, { color: pdfTheme.textColor }]}>
                          {s.text}
                        </Text>
                      )}

                      {s.items.length > 0 && (
                        <View>
                          {s.items.map((item, i) => (
                            <View key={`item-${sectionIndex}-${i}`} style={styles.bulletRow} wrap={false}>
                              <Text style={[styles.bulletSymbol, { color: pdfTheme.textColor }]}>•</Text>
                              <Text style={[styles.bulletText, { color: pdfTheme.textColor }]}>{item}</Text>
                            </View>
                          ))}
                        </View>
                      )}

                      {s.links.length > 0 && (
                        <View>
                          {s.links.map((link, i) => (
                            <Link
                              key={`link-${sectionIndex}-${i}`}
                              src={link}
                              style={[styles.link, { color: pdfTheme.accentColor }]}
                            >
                              {link}
                            </Link>
                          ))}
                        </View>
                      )}

                      {(s.contact.phone || s.contact.email) && (
                        <Text style={[styles.text, { color: pdfTheme.textColor }]}>
                          {s.contact.phone || ""}
                          {s.contact.phone && s.contact.email ? " • " : ""}
                          {s.contact.email || ""}
                        </Text>
                      )}
                    </View>
                  );
                })}
              </>
            )}

          </View>

        </View>

      </View>
      {shouldShowBranding && (
        <View
          fixed
          style={{
            position: "absolute",
            right: 14,
            bottom: 10,
            flexDirection: "row",
            alignItems: "center",
            gap: 3
          }}
        >
          <Text style={{ fontSize: 7, color: "#7d838f" }}>Created with</Text>
          <Link src="https://ResuCraft.netlify.app" style={{ fontSize: 7, color: "#6b7280" }}>
            ResuCraft
          </Link>
        </View>
      )}
    </PdfDocument>
  );
};

export default React.memo(LayoutOnePDF);