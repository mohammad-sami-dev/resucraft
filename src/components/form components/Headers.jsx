import React from "react";



const Headers = ({data={},setData}) => {


      // headers data
      

    return (
        <div className="headers-container">
            <div className="section-header">
                <h3>GENERAL INFORMATION</h3>
                <input
                    type="text"
                    placeholder="Name"
                    value={data.name ||""}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                />
                <input
                type="text"
                placeholder="Title (ex:full-stack web dev"
                value={data.title || ""}
                onChange={(e) => setData({ ...data, title: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={data.email || ""}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                />
                <input
                    type="tel"
                    placeholder="Phone"
                    value={data.phone || ""}
                    onChange={(e) => setData({ ...data, phone: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Location"
                    value={data.location || ""}
                    onChange={(e) => setData({ ...data, location: e.target.value })}
                />
                  <input
                    type="text"
                    placeholder="Website"
                    value={data.website || ""}
                    onChange={(e) => setData({ ...data, website: e.target.value })}
                />
                  <input
                    type="text"
                    placeholder="Github"
                    value={data.github || ""}
                    onChange={(e) => setData({ ...data, github: e.target.value })}
                />
                  <input
                    type="text"
                    placeholder="Linked-In"
                    value={data.linkedin || ""}
                    onChange={(e) => setData({ ...data, linkedin: e.target.value })}
                />
            </div>
        </div>
            )
}


export default Headers;