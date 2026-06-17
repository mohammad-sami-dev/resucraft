import { useState, useEffect } from "react";
import { FORM_SECTIONS } from "../../constants/formsection";
import FormSection from "./FormSection";
import '../../styles/form styles/FormWizard.css';


const FormWizard = ({
    formData,
    setFormData,
    visibleSections,
    setVisibleSections,
}) => {

    const [step, setStep] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth <= 900)
        window.addEventListener("resize", onResize)
        return () => window.removeEventListener("resize", onResize)
    }, []);
    const currentSection = FORM_SECTIONS[step];

    const next = () => {
        if (step < FORM_SECTIONS.length - 1) {
            setStep((s) => s + 1);
        }
    };

    const prev = () => {
        if (step > 0) {
            setStep((s) => s - 1);
        }
    }

    const progressPercent = Math.round(((step + 1) / FORM_SECTIONS.length) * 100);



    return (
        <div className="form-wizard">
            {/* Main horizontal layout */}
            <div className="wizard-main">

                {/* Fixed milestone column */}
                <div className="milestone-bar">
                    <div className="milestone-line-container">
                        <div
                            className="milestone-line-fill"
                            style={isMobile ? { width: `${progressPercent}%` } : { height: `${progressPercent}%` }}
                        />

                        {FORM_SECTIONS.map((_, i) => {
                            const isActive = i === step;
                            const isDone = i < step;

                            return (
                                <div
                                    key={i}
                                    className={`milestone-dot ${isDone ? "done" : ""} ${isActive ? "active" : ""}`}
                                    style={
                                        isMobile
                                            ? { left: `${(i / (FORM_SECTIONS.length - 1)) * 100}%`, top: "50%" }
                                            : { top: `${(i / (FORM_SECTIONS.length - 1)) * 100}%` }
                                    }
                                >
                                    {isActive && (
                                        <span className="milestone-dot-percent">
                                            {progressPercent}%
                                        </span>
                                    )}
                                </div>
                            );
                        })}


                    </div>


                </div>

                {/* Scrollable form area */}
                <div className="wizard-body">
                    <FormSection
                        activeSection={currentSection}
                        formData={formData}
                        setFormData={setFormData}
                        visibleSections={visibleSections}
                        setVisibleSections={setVisibleSections}
                    />
                </div>

            </div>

            {/* Fixed navigation */}
            <div className="wizard-nav">
                <button disabled={step === 0} onClick={prev}>Previous</button>
                <button disabled={step === FORM_SECTIONS.length - 1} onClick={next}>Next</button>
            </div>
        </div>
    );
}


export default FormWizard;