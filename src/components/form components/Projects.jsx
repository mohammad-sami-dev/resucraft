import React from "react";
import { Trash2, Plus } from 'lucide-react';

const Projects = ({ projects = [], setProjects, visible, setVisible }) => {
    const addProject = () => {
        setProjects([
            ...projects,
            {
                title: "",
                company: "",
                description: "",
                skillsUsed: [],
                keyFeatures: { title: "", points: [""] },
                link: "",
                githubLink: "",
            }
        ]);
    };

    const removeProject = (index) => {
        const updated = [...projects];
        updated.splice(index, 1);
        setProjects(updated);
    };

    const updateProject = (index, field, value, nested = false) => {
        const updated = [...projects];
        if (nested) {
            updated[index] = {
                ...updated[index],
                [field]: { ...updated[index][field], ...value }
            };
        } else {
            updated[index][field] = value;
        }
        setProjects(updated);
    };

    return (
        <div className="project-section">
            <div className="toggle-visibility-btn">
                <h3>Projects</h3>
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
                    {projects.length === 0 ? (
                        <div className="empty-state-form">
                            <p>No projects added yet — click the button below to add your first entry.</p>
                            <button type="button" className="add-btn" onClick={addProject} aria-label="Add project">
                                <Plus size={16} />
                            </button>
                        </div>
                    ) : (
                        projects.map((project, index) => (
                            <div className="project-entry form-section-card" key={index}>
                                <input
                                    type="text"
                                    placeholder="Project Title"
                                    value={project.title || ""}
                                    onChange={(e) => updateProject(index, "title", e.target.value)}
                                />
                                <textarea
                                    placeholder="Brief Description"
                                    value={project.description || ""}
                                    onChange={(e) => updateProject(index, "description", e.target.value)}
                                />
                                <div className="achievements-section">
                                    <label>Key Features</label>
                                    {project.keyFeatures.points.map((point, pIdx) => {
                                        const isLast = pIdx === project.keyFeatures.points.length - 1;
                                        return (
                                            <div className="project-key-feature-form" key={pIdx}>
                                                <input
                                                    type="text"
                                                    placeholder={`Feature ${pIdx + 1}`}
                                                    value={point || ""}
                                                    onChange={(e) => {
                                                        const updatedPoints = [...project.keyFeatures.points];
                                                        updatedPoints[pIdx] = e.target.value;
                                                        updateProject(index, "keyFeatures", { points: updatedPoints }, true);
                                                    }}
                                                />
                                                {isLast ? (
                                                    <button type="button" aria-label="Add feature" onClick={() => updateProject(index, "keyFeatures", { points: [...project.keyFeatures.points, ""] }, true)}>
                                                        <Plus size={16} />
                                                    </button>
                                                ) : (
                                                    <button type="button" aria-label="Remove feature" onClick={() => updateProject(index, "keyFeatures", { points: project.keyFeatures.points.filter((_, i) => i !== pIdx) }, true)}>
                                                        <Trash2 size={16} />
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                                <input
                                    type="text"
                                    placeholder="Project Link (Optional)"
                                    value={project.link || ""}
                                    onChange={(e) => updateProject(index, "link", e.target.value)}
                                />
                                <div className="add-rem-proj-btn">
                                    <button type="button" className="remove-btn" onClick={() => removeProject(index)} aria-label="Remove project">
                                        <Trash2 size={16} />
                                    </button>
                                    <button type="button" className="add-btn" onClick={addProject} aria-label="Add project">
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Projects;
