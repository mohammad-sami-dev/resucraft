import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    color: "#333",
    lineHeight: 1.5,
  },

  body: {
    flexDirection: "row",
    gap: 24,
  },

  left: {
    width: "38%",
    backgroundColor: "#f8f9fa",
    padding: 16,
  },

  right: {
    width: "62%",
    paddingLeft: 12,
  },
   block: {
    marginBottom: 16,

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

  achievementsHead:{
    fontSize:10,
    fontWeight: "bold",
  },

  name: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 6,
  },

  title: {
    fontSize: 12,
    color: "#3498db",
    marginBottom: 10,
    borderBottom: "1 solid #ccc",
  },

  sectionHeader: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 8,
    borderBottom: "1 solid #ccc",
    
    paddingBottom: 4,
    paddingTop: 4,
    textTransform: "uppercase",
  },

  text: {
    fontSize: 11,
    marginBottom: 4,
    
  },

  link: {
    fontSize: 10,
    color: "#3498db",
    textDecoration: "underline",
    marginBottom: 4,
  },

  

  /*------EDUCATION------*/
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

  /*------Language----*/
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

  /*-----hobby----*/
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

  /*-----Work experience-----*/
    expHeader: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 4,
  },

  expTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#2c3e50",
  },

  expCompany: {
    fontSize: 12,
    color: "#555",
  },

  expDates: {
    fontSize: 10,
    color: "#3498db",
    marginTop:"3"
  },


  /*----Project----*/
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

  /*-------Skills------*/
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
});

export default styles;
