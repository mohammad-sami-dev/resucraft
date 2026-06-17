import React from "react";
import Select from "react-select";
import "../../styles/editStyle.css";
import { THEME_OPTIONS } from "../../constants/themes.js";

const FONT_OPTIONS = [
  { label: "Georgia", value: "Georgia" },
  { label: "Times New Roman", value: "Times New Roman" },
  { label: "Arial", value: "Arial" },
  { label: "Calibri", value: "Calibri" },
  { label: "Cambria", value: "Cambria"}
];
  
const selectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: 40,
    borderRadius: 8,
    borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
    boxShadow: state.isFocused ? "0 0 0 3px rgba(59,130,246,0.12)" : "none",
    "&:hover": { borderColor: "#9ca3af" },
  }),
  valueContainer: (base) => ({ ...base, padding: "0 10px" }),
  menu: (base) => ({ ...base, borderRadius: 8, zIndex: 20 }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#e5efff"
      : state.isFocused
      ? "#f5f8ff"
      : "#fff",
    color: "#1f2937",
  }),
};

const EditStylePanel = ({ customStyles, setCustomStyles }) => {
  const update = (key, value) => {
    setCustomStyles((prev) => ({ ...prev, [key]: value }));
  };

  const applyTheme = (option) => {
    if (!option) return;
    setCustomStyles((prev) => ({
      ...prev,
      themeId: option.value,
      ...option.theme,
    }));
  };

  return (
    <section className="edit-style-panel">
      <div className="edit-style-header">
        <h2>Style</h2>
        <p>Select a professional theme and font.</p>
      </div>

      <div className="edit-style-grid">
        <div className="style-row">
          <label className="style-label">Theme</label>
          <div className="style-control">
            <Select
              options={THEME_OPTIONS}
              styles={selectStyles}
              value={THEME_OPTIONS.find((x) => x.value === customStyles.themeId)}
              onChange={applyTheme}
            />
          </div>
        </div>

        <div className="style-row">
          <label className="style-label">Font Family</label>
          <div className="style-control">
            <Select
              options={FONT_OPTIONS}
              styles={selectStyles}
              value={FONT_OPTIONS.find((x) => x.value === customStyles.fontFamily)}
              onChange={(option) =>
                update("fontFamily", option?.value || FONT_OPTIONS[0].value)
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditStylePanel;
