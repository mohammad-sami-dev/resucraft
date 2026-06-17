import React from "react";
import { Plus, Trash2 } from 'lucide-react';

function Experience({ data = [], setData, visible, setVisible }) {

  const addExperience = () => {
    setData([
      ...data,
      { company: "", location: "", position: "", startDate: "", endDate: "", achievements: { title: "", points: [""] } }
    ])
  }

  const removeExperience = (index) => {
    const updatedExperience = [...data];
    updatedExperience.splice(index, 1);
    setData(updatedExperience)
  }

  const updateExperience = (index, field, value, nested = false) => {
    const updatedExperience = [...data];

    if (nested) {
      updatedExperience[index] = {
        ...updatedExperience[index],
        [field]: {
          ...updatedExperience[index][field],
          ...value
        }
      };
    }
    else {
      updatedExperience[index] = {
        ...updatedExperience[index],
        [field]: value
      }
    };
    setData(updatedExperience)
  }

  return (
    <div className="experience-section">
      <div className="toggle-visibility-btn">
        <h3>Employment history</h3>

        <div
          className={`toggle-pill ${visible ? "on" : ""}`}
          onClick={() => setVisible(!visible)}
        >
          <div className="toggle-text-track">
            <span className="toggle-text hide">Show</span>
            <span className="toggle-text show">Hide</span>
          </div>

          <div className="toggle-knob" />
        </div>
      </div>
      {visible && (
        <div className="section-content">
          {data.length === 0 ? (
            <div className="empty-state-form">
              <p>No experience added yet — click the button below to add your first entry.</p>
              <button className="add-btn" onClick={addExperience}><Plus size={16} /> Add Experience</button>
            </div>
          ) : (
            data.map((exp, index) => (
              <div key={index} className="experience-entry form-section-card">
                <input
                  type="text"
                  placeholder="Company Name"
                  value={exp.company || ""}
                  onChange={(e) => updateExperience(index, "company", e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Position"
                  value={exp.position || ""}
                  onChange={(e) => updateExperience(index, "position", e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Location"
                  value={exp.location || ""}
                  onChange={(e) => updateExperience(index, "location", e.target.value)}
                /> 
                
                <div className="achievements-section">
                  <label>Achievements</label>
                  <input
                    type="text"
                    placeholder="Achievements Title (e.g. Key Responsibilities)"
                    value={exp.achievements.title || ""}
                    onChange={(e) => updateExperience(index, "achievements", { title: e.target.value }, true)}
                  />
                  {exp.achievements?.points.map((point, pointIndex) => {
                    const isLast = pointIndex === exp.achievements.points.length - 1;
                    const isEmpty = !point?.trim();
                    return (
                      <div className="experience-achievements-form" key={pointIndex}>
                        <input
                          type="text"
                          placeholder={`Achievement ${pointIndex + 1}`}
                          value={point || ""}
                          onChange={(e) => {
                            const updatedPoints = [...exp.achievements.points];
                            updatedPoints[pointIndex] = e.target.value;
                            updateExperience(
                              index,
                              "achievements",
                              { points: updatedPoints },
                              true
                            );
                          }}
                        />

                        {isLast ? (
                          <button
                            type="button"
                            disabled={isEmpty}
                            onClick={() => {
                              const updatedPoints = [...exp.achievements.points, ""];
                              updateExperience(
                                index,
                                "achievements",
                                { points: updatedPoints },
                                true
                              );
                            }}
                          >
                            <Plus size={14} />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              const updatedPoints = exp.achievements.points.filter(
                                (_, i) => i !== pointIndex
                              );
                              updateExperience(
                                index,
                                "achievements",
                                { points: updatedPoints },
                                true
                              );
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="date-input">
                  <div className="date-field">
                    <label>Start Date</label>
                    <input
                      type="month"
                      value={exp.startDate || ""}
                      onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                    />
                  </div>
                  <div className="date-field">
                    <label>End Date</label>
                    <input
                      type="month"
                      value={exp.endDate || ""}
                      onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="exp-add-rem-btn">
                  <button className="remove-btn" onClick={() => removeExperience(index)}><Trash2 size={16} /> Remove</button>
                  <button className="add-btn" onClick={addExperience}><Plus size={16} /> Add Experience</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Experience;
