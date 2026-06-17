import React from "react";

function Education({ data = [], setData, visible, setVisible }) {




  // education data


  const addEducation = () => {
    setData([
      ...data,
      { school: "", location: "", degree: "", startDate: "", endDate: "", achievements: { title: "", points: [""] } }
    ])
  }

  const removeEducation = (index) => {
    if (data.length <= 1) return;
    const updatedEducation = [...data];
    updatedEducation.splice(index, 1);
    setData(updatedEducation)
  }



  const updateEducation = (index, field, value, nested = false) => {
    const updatedEducation = [...data];
    if (nested) {
      updatedEducation[index] = {
        ...updatedEducation[index],
        [field]: {
          ...updatedEducation[index][field],
          ...value
        }
      };

    } else {
      updatedEducation[index] = {
        ...updatedEducation[index],
        [field]: value
      };

    }

    setData(updatedEducation)
  }



  return (
    <div className="education-section">
      <div className="toggle-visibility-btn">
        <h3>Education</h3>

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
          {data.map((edu, index) => (
            <div key={index} className="education-entry">

              <input
                type="text"
                placeholder="School / Institution Name"
                value={edu.school || ""}
                onChange={(e) => updateEducation(index, "school", e.target.value)}
              />
              <input
                type="text"
                placeholder="Degree/Field of Study"
                value={edu.degree || ""}
                onChange={(e) => updateEducation(index, "degree", e.target.value)}
              />
              <input
                type="text"
                placeholder="location"
                value={edu.location || ""}
                onChange={(e) => updateEducation(index, "location", e.target.value)}
              />
              <input
                type="text"
                placeholder="Custom Title (e.g. Awards or achievements)"
                value={edu.achievements.title || ""}
                onChange={(e) => updateEducation(index, "achievements", { title: e.target.value }, true)}
              />
              {edu.achievements?.points.map((point, pointIndex) => {
                const isLast = pointIndex === edu.achievements.points.length - 1;
                const isEmpty = !point?.trim();
                return (
                  <div className="education-achievements-form" key={pointIndex}>
                    <input
                      type="text"
                      placeholder={`Achievement ${pointIndex + 1}`}
                      value={point || ""}
                      onChange={(e) => {
                        const updatedPoints = [...edu.achievements.points];
                        updatedPoints[pointIndex] = e.target.value;
                        updateEducation(
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
                        className="add-achievement-button"
                        onClick={() => {
                          const updatedPoints = [...edu.achievements.points, ""];
                          updateEducation(
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
                        className="remove-achievement-button"
                        onClick={() => {
                          const updatedPoints = edu.achievements.points.filter(
                            (_, i) => i !== pointIndex
                          );
                          updateEducation(
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
              {/* Start Date */}
              <div className="date-input">
                <label>Start Date:</label>
                <input
                  className="date-input-field"
                  type="month"
                  value={edu.startDate || ""}
                  onChange={(e) => updateEducation(index, "startDate", e.target.value)}
                />
              </div>

              {/* End Date */}
              <div className="date-input">
                <label>End Date:</label>
                <input
                  className="date-input-field"
                  type="month"
                  value={edu.endDate || ""}
                  onChange={(e) => updateEducation(index, "endDate", e.target.value)}
                />
              </div>

              {/* Remove Button */}
              <div className="add-rem-edu-btn">
                <button className="remove-btn" onClick={() => removeEducation(index)}>Remove</button>
                {/* Add Button */}
                <button onClick={addEducation}>Add Education</button>
              </div>
            </div>
          ))}
        </>
      )}




    </div>
  );
}

export default Education;