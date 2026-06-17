// dates handler
  const formatDateRange = (startDate, endDate) => {
    const start = (startDate || "").trim();
    const end = (endDate || "").trim();

    if (start && end) return `${start} - ${end}`;
    if (start && !end) return `${start} - Present`;
    if (!start && end) return `${end}`;
    return "";
  };


  export default formatDateRange;