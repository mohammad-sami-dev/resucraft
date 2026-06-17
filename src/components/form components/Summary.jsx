import React from "react";


const Summary = ({ data = {}, setData, visible, setVisible }) => {

    // summary data
    

    return (
        <div className="summary-container">
            <div className="toggle-visibility-btn">
                <h3>Profile summary</h3>
            
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
                   
                    <textarea type="text"
                        placeholder="Summary"
                        value={data.summary || ""}
                        onChange={(e) => setData({ ...data, summary: e.target.value })} />
                </>
            )}

        </div>
    )
}


export default Summary;