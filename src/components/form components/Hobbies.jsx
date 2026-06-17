import React from "react";

const Hobbies = ({ data = [], setData, visible, setVisible }) => {




    const addHobby = () => {
        setData([...data, { title: "", description: "" }])
    };

    const removeHobby = (index) => {
        const updated = [...data];
        updated.splice(index, 1);
        setData(updated);
    }

    const updateHobby = (index, field, value) => {
        const updated = [...data]
        updated[index][field] = value;
        setData(updated);
    }

    return (
        <div className="hobbies-container-form">
            <div className="toggle-visibility-btn">
                <h3>Hobbies & interests</h3>
            
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
                    
                    {data.map((hobby, index) => (
                        <div key={index} className="hobby-entry">
                            <input
                                type="text"
                                placeholder="Listening Music"
                                value={hobby.title || ""}
                                onChange={(e) => updateHobby(index, "title", e.target.value)}
                            />
                            <textarea
                                placeholder="I enjoy listening to music"
                                value={hobby.description || ""}
                                onChange={(e) => updateHobby(index, "description", e.target.value)}
                            />
                            <button onClick={() => removeHobby(index)}>Remove Hobby</button>

                        </div>
                    ))}
                    <button onClick={addHobby}>Add Hobby</button>
                </>
            )}
        </div>
    )
}


export default Hobbies;