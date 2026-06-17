  const getTheme = (style = {}) => ({
    fontFamily: style.fontFamily || "Georgia",
    fontSize: `${style.baseFontSize || 11}px`,
    headingColor: style.headingColor || "#1f2937",
    textColor: style.textColor || "#374151",
    accentColor: style.accentColor || "#2563eb",
    pageBg: style.pageBg || "#ffffff",
    skillBox: style.skillBox || "#2563eb",
    skillTextColor: style.skillTextColor || "#ffffff"
  });


  export default getTheme;