import Lottie from "lottie-react"
import React from "react";
import animationData from "../../assets/Text generation loop.json";
import "../../styles/resumeLoading.css"

const messages = [
    "Extracting resume content...",
    "Structuring education, experience etc...",
    "Formatting into a professional layout...",
    "Finalizing your CV..."
]

const ResumeLoading = () => {

    const [index, setIndex] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev+1) % messages.length);
        }, 3000)
        return () => clearInterval(interval);
    },[]);


  return (
    <div className="ai-loading-screen">
      <div className="ai-loading-card">
        <Lottie 
          animationData={animationData} 
          loop={true} 
          style={{ height: 250 }}
        />
        <h2>Analyzing your resume...</h2>
        <p>
          {messages[index]}
        </p>
      </div>
    </div>
  );
};


export default ResumeLoading;
