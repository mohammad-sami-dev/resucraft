import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    color: "#333",
    lineHeight: 1.5,
  },
  
  achievementsHead:{
    fontSize:10,
    fontWeight: "bold",
  },

  /* ===== HEADER ===== */
  header: {
    marginBottom: 24,
    paddingBottom: 12,
    borderBottom: "3 solid #2c3e50",
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  headerLeft: {
    flex: 1,
  },

  name: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2c3e50",
    textTransform: "uppercase",
    marginBottom: 8,
  },

  title: {
    fontSize: 14,
    color: "#3498db",
    fontWeight: "bold",
  },

  headerRight: {
    width: "45%",
    textAlign: "right",
  },

  contactItem: {
    fontSize: 10,
    marginBottom: 3,
    color: "#555",
  },

  link: {
    fontSize: 10,
    color: "#3498db",
    textDecoration: "underline",
  },

  /* ===== BODY ===== */
  body: {
    flexDirection: "row",
    gap: 28,
  },

  left: {
    width: "35%",
  },

  right: {
    width: "65%",
  },

  /* ===== SECTIONS ===== */
  sectionHead: {
    fontSize: 13,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#2c3e50",
    marginBottom: 8,
    paddingBottom: 4,
    borderBottom: "2 solid #3498db",
    textAlign:"left",
  },

  block: {
    marginBottom: 16,

  },
  hobbyItem: {
    marginBottom: 8,
  },

  hobbyTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 2,
  },

  hobbyDescription: {
    fontSize: 11,
    color: "#666",
    lineHeight: 1.4,
    fontStyle:"italic"
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 2,
    borderBottom: "2 solid #3498db",
  },

  /* ===== EDUCATION ===== */
  eduDegree: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#2c3e50",
  },

  eduSchool: {
    fontSize: 11,
    color: "#555",
  },

  eduDates: {
    fontSize: 10,
    color: "#3498db",
    marginBottom: 2,
  },

  eduLocation: {
    fontSize: 10,
    color: "#777",
    fontStyle: "italic",
    marginBottom: 4,
  },

  listItem: {
    fontSize: 10,
    marginBottom: 2,
    marginLeft: 10,
  },

  /* ===== SUMMARY ===== */
  summaryText: {
    fontSize: 11,
    color: "#555",
    textAlign: "justify",
  },

  /* ===== EXPERIENCE ===== */
  expHeader: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 4,
  },

  expTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#2c3e50",
    flexDirection: "column",
  },
  

  expCompany: {
    fontSize: 12,
    color: "#555",
  },

  expDates: {
    fontSize: 10,
    color: "#3498db",
  },

  /* ===== PROJECTS ===== */
  projectTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#2c3e50",
  },

  projectDesc: {
    fontSize: 10.5,
    color: "#555",
    marginBottom: 4,
  },

  projectMetaLabel: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 2,
  },

  bullet: {
    fontSize: 11,
    marginLeft: 10,
    marginBottom: 2,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 3,
  },

  bulletSymbol: {
    width: 10,          // controls the hanging indent gap
    fontSize: 11,
    lineHeight: 1.4,
  },

  bulletText: {
    flex: 1,            // allows wrapping
    fontSize: 11,
    lineHeight: 1.4,
  },

  tagPill: {
    backgroundColor: "#3498db",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginRight: 4,
    marginBottom: 4,

    alignItems: "center",
    justifyContent: "center",
  },

  tagText: {
    fontSize: 10,
    color: "#fff",
    lineHeight: 1,   // 🔑 critical
  },

  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  /* ===== SKILLS ===== */
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },

  skillItem: {
    border: "1 solid #ddd",
    backgroundColor: "#dce1e6",
    paddingVertical: 4,
    paddingHorizontal: 6,
    paddingTop: 5,
    fontSize: 10,
    borderRadius: 3,
    lineHeight: 1,
  },

  /*---Language----*/
  langItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  smallText: {
    fontSize: 11,
    color: "#666",
  },
   smallTextLang: {
    fontSize: 11,
    color: "#666",
    fontStyle:"italic"
  },
});

export default styles;