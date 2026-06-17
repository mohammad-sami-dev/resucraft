import React from "react";
import { Plus, Trash2 } from 'lucide-react';

const Education = ({ data = [], setData, visible, setVisible }) => {
    const addEducation = () => {
        setData([
            ...data,
            { school: "", degree: "", startDate: "", endDate: "", location: "", achievements: { title: "", points: [""] } }
        ]);
    };

    const removeEducation = (index) => {
        const updated = [...data];
        updated.splice(index, 1);
        setData(updated);
    };

    const updateEducation = (index, field, value, nested = false) => {
        const updated = [...data];
        if (nested) {
            updated[index] = {
                ...updated[index],
                [field]: { ...updated[index][field], ...value }
            };
        } else {
            updated[index][field] = value;
        }
        setData(updated);
    };

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
                <div className="section-content">
                    {data.length === 0 ? (
                        <div className="empty-state-form">
                            <p>No education history added yet — click the button below to add your first entry.</p>
                            <button className="add-btn" onClick={addEducation}><Plus size={16} /> Add Education</button>
                        </div>
                    ) : (
                        data.map((edu, index) => (
                            <div className="education-entry form-section-card" key={index}>
                                <input
                                    type="text"
                                    placeholder="School / University"
                                    value={edu.school || ""}
                                    onChange={(e) => updateEducation(index, "school", e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Degree / Diploma"
                                    value={edu.degree || ""}
                                    onChange={(e) => updateEducation(index, "degree", e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Location"
                                    value={edu.location || ""}
                                    onChange={(e) => updateEducation(index, "location", e.target.value)}
                                />
                                
                                <div className="achievements-section">
                                    <label>Details / Awards</label>
                                    <input
                                        type="text"
                                        placeholder="Title (e.g. Relevant Courses)"
                                        value={edu.achievements.title || ""}
                                        onChange={(e) => updateEducation(index, "achievements", { title: e.target.value }, true)}
                                    />
                                    {edu.achievements?.points.map((point, pIdx) => {
                                        const isLast = pIdx === edu.achievements.points.length - 1;
                                        return (
                                            <div className="education-achievements-form" key={pIdx}>
                                                <input
                                                    type="text"
                                                    placeholder={`Detail ${pIdx + 1}`}
                                                    value={point || ""}
                                                    onChange={(e) => {
                                                        const updatedPoints = [...edu.achievements.points];
                                                        updatedPoints[pIdx] = e.target.value;
                                                        updateEducation(index, "achievements", { points: updatedPoints }, true);
                                                    }}
                                                />
                                                {isLast ? (
                                                    <button onClick={() => updateEducation(index, "achievements", { points: [...edu.achievements.points, ""] }, true)}>
                                                        <Plus size={14} />
                                                    </button>
                                                ) : (
                                                    <button onClick={() => updateEducation(index, "achievements", { points: edu.achievements.points.filter((_, i) => i !== pIdx) }, true)}>
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
                                            value={edu.startDate || ""}
                                            onChange={(e) => updateEducation(index, "startDate", e.target.value)}
                                        />
                                    </div>
                                    <div className="date-field">
                                        <label>End Date</label>
                                        <input
                                            type="month"
                                            value={edu.endDate || ""}
                                            onChange={(e) => updateEducation(index, "endDate", e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="add-rem-edu-btn">
                                    <button className="remove-btn" onClick={() => removeEducation(index)}><Trash2 size={16} /> Remove</button>
                                    <button className="add-btn" onClick={addEducation}><Plus size={16} /> Add Education</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Education;
