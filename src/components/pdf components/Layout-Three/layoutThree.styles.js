import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    position:'relative',
    fontFamily: "Helvetica",
    fontSize: 12,
    lineHeight: 1.3,
    color: "#333",
  },
  achievementsHead:{
    fontSize:10,
    fontWeight: "bold",
  },

  /* ===== HEADER ===== */
  header: {
    textAlign: "center",
    marginBottom: 8,
    paddingBottom: 4,
    borderBottom: "2 solid #2c3e50",
  },
 
  name: {
    fontSize: 26,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#2c3e50",
    marginBottom: 10,
  },

  title: {
    fontSize: 14,
    color: "#3498db",
    fontWeight: "bold",
    marginBottom: 8,
  },

  contact: {
    fontSize: 10,
    color: "#555",
    textAlign: "center",
    justifyContent:'space-between',
    gap:10
  },

  /* ===== SECTION HEADERS ===== */
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#2c3e50",
    marginTop: 8,
    marginBottom: 5,
    paddingBottom: 2,
    borderBottom: "2 solid #3498db",
    textAlign:'left',
  },

  subsectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 4,
  },

  /* ===== SUMMARY ===== */
  summaryText: {
    fontSize: 11,
    color: "#555",
    textAlign: "justify",
  },

  /* ===== EXPERIENCE ===== */
  expItem: {
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

  expMeta: {
    fontSize: 10,
    color: "#3498db",
    marginBottom: 2,
  },

  expLocation: {
    fontSize: 10,
    color: "#666",
    fontStyle: "italic",
  },

  bullet: {
    fontSize: 11,
    marginLeft: 10,
    marginBottom: 2,
  },

  /* ===== EDUCATION ===== */
  eduItem: {
    marginBottom: 4,
  },

  eduDegree: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#2c3e50",
  },

  eduSchool: {
    fontSize: 12,
    color: "#555",
  },

  eduMeta: {
    fontSize: 11,
    color: "#7f8c8d",
  },

  /* ===== PROJECTS ===== */
  projectItem: {
    marginBottom: 4,
  },

  projectTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#2c3e50",
  },

  projectDesc: {
    fontSize: 11,
    color: "#555",
    marginBottom: 2,
  },

  link: {
    fontSize: 10,
    color: "#3498db",
    textDecoration: "underline",
  },

  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 2,
  },

  
  projectMetaLabel: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 2,
  },

  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 1,
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
  marginBottom: 2,

  alignItems: "center",
  justifyContent: "center",
},

tagText: {
  fontSize: 10,
  color: "#fff",
  lineHeight: 1,   //  critical
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
    lineHeight:1,
  },

  /* ===== TWO COLUMN ===== */
  twoColumn: {
    flexDirection: "row",
    
    marginTop:10,
   
  },

  column: {
    flex: 1,
  },
  columnLeft: {
  flex: 1,
 
},

columnRight: {
  flex: 1,
  
},

  smallText: {
    fontSize: 11,
    color: "#666",
  },
  smallTextLang: {
    fontStyle:"italic",
    fontSize: 11,
    color:"#666"
  },
  /*--------HOBBY -------*/
  
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
  fontStyle:"italic",
},
 hobbyItem: {
  marginBottom: 6,
},

/*----------Language------*/
langItem:{
  flexDirection:'row',
  justifyContent:'space-between',
  marginBottom:6
},
});

export default styles;
