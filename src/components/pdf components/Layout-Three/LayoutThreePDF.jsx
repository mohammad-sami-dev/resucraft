import React from "react";
import { View, Text, Link } from "@react-pdf/renderer";
import PdfDocument from "../pdfDocument";
import styles from "./layoutThree.styles";
import formatDateRange from "../../../utils/formatDateRange.js";
import getTheme from "../../../utils/getTheme.js"

import { prepareCustomSection } from "../../../utils/sections/prepareCustomSection";


const LayoutThreePDF = ({
  generalInfo,
  summary,
  experience,
  education,
  projects,
  skills,
  hobbies,
  languages,
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

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={[styles.name, { color: pdfTheme.headingColor }]}>{generalInfo?.name}</Text>
          <Text style={[styles.title, { color: pdfTheme.accentColor }]}>{generalInfo?.title}</Text>

          <Text style={styles.contact}>
            {generalInfo?.email}
            {generalInfo?.email && generalInfo?.phone && "  •  "}
            {generalInfo?.phone}
            {generalInfo?.phone && generalInfo?.location && "  •  "}
            {generalInfo?.location}
          </Text>

          <Text style={[styles.contact, { color: pdfTheme.accentColor }]}>
            {generalInfo?.website}
            {generalInfo?.website && generalInfo?.linkedin && "  •  "}
            {generalInfo?.linkedin}
            {generalInfo?.linkedin && generalInfo?.github && "  •  "}
            {generalInfo?.github}
          </Text>
        </View>

        {/* SUMMARY */}
        {visibleSections?.summary && summary?.summary && (
          <>
            <Text style={[styles.sectionTitle, { color: pdfTheme.headingColor }]}>Professional Profile</Text>
            <Text style={[styles.summaryText, { color: pdfTheme.textColor }]}>{summary.summary}</Text>
          </>
        )}

        {/* EXPERIENCE */}
        {visibleSections?.experience && experience?.length > 0 && (
          <>
            <Text style={[styles.sectionTitle, { color: pdfTheme.headingColor }]}>Work Experience</Text>
            {experience.map((e, i) => {
              const dateText = formatDateRange(e.startDate, e.endDate);
              return (
                <View key={i} style={styles.expItem}>
                  <Text style={[styles.expTitle, { color: pdfTheme.textColor }]}>
                    {e.position} – <Text style={[styles.expCompany, { color: pdfTheme.textColor }]}>{e.company}</Text>
                  </Text>
                  <Text style={[styles.expMeta, { color: pdfTheme.textColor }]}>
                    {dateText && dateText}
                  </Text>
                  {e.location && (
                    <Text style={[styles.expLocation, { color: pdfTheme.textColor }]}>{e.location}</Text>
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
          </>
        )}

        {/* EDUCATION */}
        {visibleSections?.education && education?.length > 0 && (
          <>
            <Text style={[styles.sectionTitle, { color: pdfTheme.headingColor }]}>Education</Text>
            {education.map((e, i) => {
              const dateText = formatDateRange(e.startDate, e.endDate);
              return (
                <View key={i} style={styles.eduItem}>
                  <Text style={[styles.eduDegree, { color: pdfTheme.textColor }]}>
                    {e.degree} – <Text style={[styles.eduSchool, { color: pdfTheme.textColor }]}>{e.school}</Text>
                  </Text>
                  <Text style={[styles.eduMeta, { color: pdfTheme.textColor }]}>
                    {dateText && dateText}
                  </Text>
                  {e.location && (
                    <Text style={[styles.smallText, { color: pdfTheme.textColor }]}>{e.location}</Text>
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
          </>
        )}

        {/* PROJECTS */}
        {visibleSections?.projects && projects?.length > 0 && (
          <>
            <Text style={[styles.sectionTitle, { color: pdfTheme.headingColor }]}>Projects</Text>
            {projects.map((p, i) => (
              <View key={i} style={styles.projectItem}>
                <Text style={[styles.projectTitle, { color: pdfTheme.textColor }]}>{p.title}</Text>
                {p.link && <Link src={p.link} style={[styles.link, { color: pdfTheme.accentColor }]}>{p.link}</Link>}
                {p.githubLink && (
                  <Link src={p.githubLink} style={[styles.link, { color: pdfTheme.accentColor }]}>
                    {p.githubLink}
                  </Link>
                )}
                {p.description && (
                  <Text style={[styles.projectDesc, { color: pdfTheme.textColor }]}>{p.description}</Text>
                )}
                {p.skillsUsed?.length > 0 && (
                  <View style={{ marginTop: 4 }}>
                    <Text style={[styles.projectMetaLabel, { color: pdfTheme.textColor }]}>
                      Technologies:
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
          </>
        )}

        {/* SKILLS */}
        {visibleSections?.skills && skills?.length > 0 && (
          <View style={styles.block}>
            <Text style={[styles.sectionTitle, { color: pdfTheme.headingColor }]}>Skills</Text>
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

        {/* CUSTOM */}
        {visibleSections?.custom && Array.isArray(customSections) && customSections.length > 0 &&
          customSections.map((section, sectionIndex) => {
            const s = prepareCustomSection(section);
            if (!s.hasContent) return null;

            return (
              <View key={sectionIndex} style={{ marginTop: 10 }}>
                {s.title && (
                  <Text style={[styles.sectionTitle, { color: pdfTheme.headingColor }]}>
                    {s.title}
                  </Text>
                )}

                {s.text && (
                  <Text style={[styles.summaryText, { color: pdfTheme.textColor }]}>
                    {s.text}
                  </Text>
                )}

                {s.items.length > 0 &&
                  s.items.map((item, itemIndex) => (
                    <View key={`item-${sectionIndex}-${itemIndex}`} style={styles.bulletRow} wrap={false}>
                      <Text style={[styles.bulletSymbol, { color: pdfTheme.textColor }]}>•</Text>
                      <Text style={[styles.bulletText, { color: pdfTheme.textColor }]}>{item}</Text>
                    </View>
                  ))}

                {s.links.length > 0 &&
                  s.links.map((link, linkIndex) => (
                    <Link
                      key={`link-${sectionIndex}-${linkIndex}`}
                      src={link}
                      style={[styles.link, { color: pdfTheme.accentColor }]}
                    >
                      {link}
                    </Link>
                  ))}

                {(s.contact.phone || s.contact.email) && (
                  <Text style={[styles.smallText, { color: pdfTheme.textColor }]}>
                    {s.contact.phone || ""}
                    {s.contact.phone && s.contact.email ? " • " : ""}
                    {s.contact.email || ""}
                  </Text>
                )}
              </View>
            );
          })}

        {/* HOBBIES & LANGUAGES */}
        {(visibleSections?.hobbies || visibleSections?.languages) && (
          <>
            <View style={styles.twoColumn} wrap={false}>
              {visibleSections?.hobbies && hobbies?.length > 0 && (
                <View style={styles.columnLeft}>
                  <Text style={[styles.sectionTitle, { color: pdfTheme.headingColor }]}>Interests</Text>
                  {hobbies.map((h, i) => (
                    <View key={i} style={styles.hobbyItem}>
                      <Text style={[styles.hobbyTitle, { color: pdfTheme.headingColor }]}>{h.title}</Text>
                      <Text style={[styles.hobbyDescription, { color: pdfTheme.textColor }]}>{h.description}</Text>
                    </View>
                  ))}
                </View>
              )}

              {visibleSections?.languages && languages?.length > 0 && (
                <View style={styles.columnRight}>
                  <Text style={[styles.sectionTitle, { color: pdfTheme.headingColor }]}>Languages</Text>
                  {languages.map((l, i) => (
                    <View key={i} style={styles.langItem}>
                      <Text style={[styles.smallText, { color: pdfTheme.textColor }]}>{l.language}</Text>
                      <Text style={[styles.smallTextLang, { color: pdfTheme.textColor }]}>{l.proficiency}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </>
        )}



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

export default React.memo(LayoutThreePDF);