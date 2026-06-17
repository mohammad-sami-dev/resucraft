import React from "react";

const Projects = ({ projects = [], setProjects, visible, setVisible }) => {
  const updateProject = (index, field, value, nested = false) => {
    const updatedProjects = [...projects];

    if (nested) {
      updatedProjects[index] = {
        ...updatedProjects[index],
        [field]: {
          ...updatedProjects[index][field],
          ...value,
        },
      };
    } else {
      updatedProjects[index] = {
        ...updatedProjects[index],
        [field]: value,
      };
    }

    setProjects(updatedProjects);
  };

  const handleArrayChange = (index, e, field) => {
    const values = e.target.value
      .split(",")
      .map((item) => item.trim());

    updateProject(index, field, values);
  };

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
        githubLink:"",
      },
    ]);
  };

  const removeProject = (index) => {
    if (projects.length === 1) return;
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    setProjects(updatedProjects);
  };

  return (
    <div className="projects-container">
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
        <>
          {projects.map((project, index) => {
            const featurePoints = project?.keyFeatures?.points || [""];

            return (
              <div key={index} className="project-entry">
                <input
                  type="text"
                  name="title"
                  placeholder="Project Name"
                  value={project?.title || ""}
                  onChange={(e) => updateProject(index, "title", e.target.value)}
                />

                <textarea
                  name="description"
                  placeholder="Project description"
                  value={project?.description || ""}
                  onChange={(e) =>
                    updateProject(index, "description", e.target.value)
                  }
                />

                <div className="projects-skills">
                  <label>Skills used :</label>
                  <input
                    type="text"
                    placeholder="Enter skills separated by commas (e.g. JavaScript, Node.js)"
                    value={project?.skillsUsed?.join(", ") || ""}
                    onChange={(e) => handleArrayChange(index, e, "skillsUsed")}
                  />
                </div>

                <input
                  type="text"
                  placeholder="Features Heading (e.g. Key Features, Responsibilities, Highlights)"
                  value={project?.keyFeatures?.title || ""}
                  onChange={(e) =>
                    updateProject(
                      index,
                      "keyFeatures",
                      { title: e.target.value },
                      true
                    )
                  }
                />

                {featurePoints.map((point, pointIndex) => {
                  const isLast = pointIndex === featurePoints.length - 1;
                  const isEmpty = !point?.trim();

                  return (
                    <div className="project-key-feature-form" key={pointIndex}>
                      <input
                        type="text"
                        placeholder={`Feature point ${pointIndex + 1}`}
                        value={point || ""}
                        onChange={(e) => {
                          const updatedPoints = [...featurePoints];
                          updatedPoints[pointIndex] = e.target.value;

                          updateProject(
                            index,
                            "keyFeatures",
                            { points: updatedPoints },
                            true
                          );
                        }}
                      />

                      {isLast ? (
                        <button
                          type="button"
                          className="add-feat-btn"
                          disabled={isEmpty}
                          onClick={() => {
                            const updatedPoints = [...featurePoints, ""];
                            updateProject(
                              index,
                              "keyFeatures",
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
                          className="remove-feat-btn"
                          onClick={() => {
                            const updatedPoints = featurePoints.filter(
                              (_, i) => i !== pointIndex
                            );
                            updateProject(
                              index,
                              "keyFeatures",
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

                <div className="projects-skills">
                  <label>Link :</label>
                  <input
                    type="text"
                    name="link"
                    placeholder="Add the link to live demo or GitHub"
                    value={project?.link || ""}
                    onChange={(e) => updateProject(index, "link", e.target.value)}
                  />
                </div>
                 <div className="projects-skills">
                  <label>Github Link :</label>
                  <input
                    type="text"
                    name="link"
                    placeholder="Add the link to live demo or GitHub"
                    value={project?.githubLink || ""}
                    onChange={(e) => updateProject(index, "githubLink", e.target.value)}
                  />
                </div>

                <div className="add-rem-proj-btn">
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeProject(index)}
                  >
                    Remove Project
                  </button>
                  <button type="button" className="add-btn" onClick={addProject}>
                    Add Project
                  </button>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Projects;