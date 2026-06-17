import React from "react";

function Experience({ data = [], setData, visible, setVisible }) {

  const addExperience = () => {
    setData([
      ...data,
      { company: "", location: "", position: "", startDate: "", endDate: "", achievements: { title: "", points: [""] } }
    ])
  }

 

  const removeExperience = (index) => {
    if (data.length <= 1) return;
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
        <h3>Employement history</h3>

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
        <>

          {data.map((exp, index) => (
            <div key={index} className="experience-entry">

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
              <input
                type="text"
                placeholder="Achievements Title (e.g. Awards)"
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
                        Add
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
                        Remove
                      </button>
                    )}
                  </div>
                );
              })}

              <div className="date-input">
                <label>Start Date</label>
                <input
                  className="date-input-field"
                  type="month"
                  placeholder="Start Date"
                  value={exp.startDate || ""}
                  onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                />
              </div>
              <div className="date-input">
                <label>End Date</label>
                <input
                  className="date-input-field"
                  type="month"
                  placeholder="End Date"
                  value={exp.endDate || ""}
                  onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                />
              </div>
              <div className="exp-add-rem-btn">
                <button className="remove-btn" onClick={() => removeExperience(index)}>Remove</button>
                <button className="add-btn" onClick={addExperience}>Add Experience</button>
              </div>
            </div>
          ))}
        </>
      )}


    </div>
  );
}

export default Experience;