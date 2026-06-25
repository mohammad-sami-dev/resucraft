import API from "../api"

// const API_URL =  import.meta.env.VITE_API_URL || "http://localhost:5000" ;

export async function uploadResume (file, navigate,setLoading) {

    try{
        
        if (!file) throw new Error("No file selected");
        console.log("Uploading file:", file.name, file.size, file.type);
        setLoading(true)
        const formData = new FormData();
        formData.append("resume", file);
        
        const res = await API.post(
            "/api/ai/parse-resume",
            formData,
            { headers: { "Content-Type": "multipart/form-data"}}
        );
 
        // save temporarily
        sessionStorage.setItem("importedResume", JSON.stringify(res.data));

        // go to builder
        navigate('/builder');

        return {success: true};

    }
    catch(error) {
        console.error("Resume upload failed:", error);
        return {
            success: false,
            message:
                error.response?.data?.error || "Could not read the resume. Try another PDF."
        };
    }
    finally{
        setLoading(false)
    }
}
