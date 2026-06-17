import React from "react";

const Skills = ({ data, setData, visible, setVisible }) => {


    // skills data


    const addSkill = () => {
        setData([
            ...data,
            { skill: "" }
        ])
    }

    const removeSkill = (index) => {
        if (data.length <= 1) return;
        const updatedSkills = [...data];
        updatedSkills.splice(index, 1);
        setData(updatedSkills)
    }

    const updateSkill = (index, value) => {
        const updatedSkill = [...data];
        updatedSkill[index] = {
            ...updatedSkill[index],
            skill: value
        };
        setData(updatedSkill);
    }

    return (

        <div className="skills-container">
            <div className="toggle-visibility-btn">
                <h3>Skills</h3>

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


                    {data.map((skillObj, index) => (
                        <div key={index} className="skill-container-input">
                            <input
                                type="text"
                                placeholder="add a skill"
                                value={skillObj.skill || ""}
                                onChange={(e) => updateSkill(index, e.target.value)}
                            />
                            <div className="skills-container-btns">
                                {index === data.length - 1 ? (
                                    <button onClick={addSkill}>Add</button>
                                ) : (
                                    <button onClick={() => removeSkill(index)}>Remove</button>
                                )}
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>

    )
}


export default Skills;