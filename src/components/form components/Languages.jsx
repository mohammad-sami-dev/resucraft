import React from "react";

const Languages = ({ data = [], setData, visible, setVisible }) => {
    const addLanguage = () => {
        setData([...data, { language: "", proficiency: "" }]);
    };

    const removeLanguage = (index) => {
        if (data.length === 1) return; // never allow deleting the last row
        const updated = [...data];
        updated.splice(index, 1);
        setData(updated);
    };

    const updateLanguage = (index, field, value) => {
        const updatedLanguages = [...data];
        updatedLanguages[index][field] = value;

        // Update the data object with the updated languages array
        setData(updatedLanguages);
    };

    return (
        <div className="language-container-form">
            <div className="toggle-visibility-btn">
                <h3>Languages</h3>

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

                    {data.map((lang, index) => (
                        <div className="language-entry-form" key={index}>
                            <input
                                type="text"
                                placeholder="Language"
                                value={lang.language || ""}
                                onChange={(e) => updateLanguage(index, "language", e.target.value)}
                            />
                            <select
                                value={lang.proficiency}
                                onChange={(e) => updateLanguage(index, "proficiency", e.target.value)}
                            >
                                <option className="lang-opt" value="Basic">Basic</option>
                                <option className="lang-opt" value="Intermediate">Intermediate</option>
                                <option className="lang-opt" value="Fluent">Fluent</option>
                                <option className="lang-opt" value="Native">Native</option>
                            </select>
                            {data.length > 1 && (
                                <button
                                    className="lang-delete-btn"
                                    onClick={() => removeLanguage(index)}
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    ))}

                    <button className='add-lang-btn' onClick={addLanguage}>Add Language</button>
                </>
            )}
        </div>
    )
}


export default Languages;