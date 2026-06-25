import React, { useRef, useState, useEffect, useCallback, useLayoutEffect, Suspense, lazy } from "react";
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import API from '../../src/api';

import html2canvas from "html2canvas";
import { PDFViewer } from "@react-pdf/renderer";
import { pdf } from "@react-pdf/renderer";
// import PDF layouts 
import PDFlayoutOne from "../components/pdf components/Layout-One/LayoutOnePDF.jsx";
import PDFlayoutTwo from "../components/pdf components/Layout-Two/LayoutTwoPDF.jsx";
import PDFlayoutThree from "../components/pdf components/Layout-Three/LayoutThreePDF.jsx";
import { THEME_OPTIONS } from "../constants/themes.js";

// Components
// import FormWizard from "../components/form components/FormWizard";
import BuilderNavbar from "../components/navbar components/BuilderNavbar";
// import PreviewDisplay from "../components/preview components/PreviewDisplay";
// import LayoutDrawer from "../components/layout components/layoutDrawer";
// import EditStyle from "../components/style components/EditStyle";
// import EditStyleTwo from "../components/style components/EditStyleTwo";
// import EditStyleThree from "../components/style components/EditStyleThree";
import SaveCVModal from "../components/navbar components/SaveCVModal";
import Feedback from "../components/feedback/Feedback.jsx";
// Images
import layoutOne from "../images/layout1.png";
import layoutTwo from "../images/layout2.png";
import layoutThree from "../images/layout3.png";


// Styles
import "../styles/pages styles/App.css";

import { normalizeImportedResume } from "../services/normalizeImportedResume.js";

import "../components/pdf components/fonts/registerFonts.js"

const FormWizard = lazy(() => import("../components/form components/FormWizard"));
const PreviewDisplay = lazy(() => import("../components/preview components/PreviewDisplay"));
const LayoutDrawer = lazy(() => import("../components/layout components/layoutDrawer"));
const EditStyle = lazy(() => import("../components/style components/EditStyle"));
const EditStyleTwo = lazy(() => import("../components/style components/EditStyleTwo"));
const EditStyleThree = lazy(() => import("../components/style components/EditStyleThree"));

// Constants
const INITIAL_FORM_DATA = {
  generalInfo: {
    name: "",
    email: "",
    phone: "",
    location: "",
    github: "",
    linkedin: "",
    website: "",
    title: "",
  },
  summary: { summary: "" },
  education: [{
    school: "",
    degree: "",
    startDate: "",
    endDate: "",
    location: "",
    achievements: {
      title: "",
      points: [""]
    }
  }],
  skills: [{ skill: "" }],
  experience: [{
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    location: "",
    achievements: {
      title: "",
      points: [""]
    }
  }],
  projects: [{
    title: "",
    company: "",
    description: "",
    skillsUsed: [],
    keyFeatures: {
      title: "",
      points: [""]
    },
    link: "",
    githubLink: "",
  }],
  hobbies: [{
    title: "",
    description: ""
  }],
  languages: [{
    language: "",
    proficiency: "",
  }],
  customSections: [],
};

function mergeImportedFormData(normalized) {
  return {
    ...INITIAL_FORM_DATA,
    ...normalized,
    generalInfo: {
      ...INITIAL_FORM_DATA.generalInfo,
      ...normalized.generalInfo,
    },
    summary: {
      ...INITIAL_FORM_DATA.summary,
      ...normalized.summary,
    },
  };
}

function readImportedFormDataFromSession() {
  if (typeof window === "undefined") return null;

  const params = new URLSearchParams(window.location.search);
  if (params.get("id")) return null;

  const imported = sessionStorage.getItem("importedResume");
  if (!imported) return null;

  try {
    const parsed = JSON.parse(imported);
    return mergeImportedFormData(normalizeImportedResume(parsed));
  } catch (err) {
    console.error("Failed to parse imported resume from session:", err);
    return null;
  }
}

const INITIAL_VISIBLE_SECTIONS = {
  education: true,
  experience: true,
  projects: true,
  skills: true,
  summary: true,
  hobbies: true,
  languages: true,
  custom: true,
};


// default styles
const defaultTheme = THEME_OPTIONS.find((t) => t.value === "classicBlue")?.theme || {};
const INITIAL_STYLES = {
  themeId: "classicBlue",
  fontFamily: "Georgia",
  showBranding: true,
  ...defaultTheme,
};

// section order
// const DEFAULT_SECTION_ORDER = {
//   layout1: {
//     left:["education","language","hobies"],
//     right:["summary","experience","projects","skills","custom"]
//   },
//   layout2: {
//     left: ["education","language","hobbies"],
//     right: ["summary","experience", "projects","skills","custom"]
//   },
//   layout3: ["summary,experience","education","projects","skills","languages","custom"],
// }



const CvBuilder = ({ setGlobalLoading }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // State
  const [activeTab, setActiveTab] = useState("content");
  const [showForm, setShowForm] = useState(true);
  // const [sectionOrder,setSectionOrder] = useState(DEFAULT_SECTION_ORDER);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [currentLayout, setCurrentLayout] = useState('layout1');
  const [selectedEditStyle, setSelectedEditStyle] = useState('EditStyle');
  const [cvName, setCvName] = useState('');
  const [username, setUserName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [customStyles, setCustomStyles] = useState(INITIAL_STYLES);
  const [formData, setFormData] = useState(() => readImportedFormDataFromSession() || INITIAL_FORM_DATA);
  const [pdfPreviewHeight, setPdfPreviewHeight] = useState(600);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [viewportWidth, setViewPortWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  )
  const [visibleSections, setVisibleSections] = useState(INITIAL_VISIBLE_SECTIONS);

  const location = useLocation();

  // Refs
  const previewRef = useRef();

  const cvId = searchParams.get('id');
  const token = localStorage.getItem('token');

  // Effects


  // screen scrolling managed 
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);
  // screen scrolling managed 
  useEffect(() => {
    if (activeTab === "preview") {
      const wrapper = document.querySelector(".preview-wrapper");
      if (wrapper) {
        wrapper.scrollTop = 0;
        wrapper.scrollLeft = 0;
      }
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [activeTab]);




  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('token');
    setUserName(localStorage.getItem('username'))
    setIsLoggedIn(!!token);

    if (!token) { 
      setCustomStyles((prev) => ({ ...prev, showBranding: true }));
    }

    if (!token && !sessionStorage.getItem('cvAlertShown')) {
      setTimeout(() => {
        alert('You are browsing as a guest. Log in to save or delete CVs.');
        sessionStorage.setItem('cvAlertShown', 'true');
      }, 1000);
    }
  }, []);


  // insert parsed data from uploadResume to form

  useEffect(() => {
    if (cvId) return;

    const imported = sessionStorage.getItem("importedResume");
    if (!imported) return;

    try {
      const parsed = JSON.parse(imported);
      const normalized = normalizeImportedResume(parsed);

      setFormData((prev) => ({
        ...INITIAL_FORM_DATA,
        ...normalized,
        generalInfo: {
          ...INITIAL_FORM_DATA.generalInfo,
          ...normalized.generalInfo,
        },
        summary: {
          ...INITIAL_FORM_DATA.summary,
          ...normalized.summary,
        },
      }));

      console.log("✅ Imported resume applied to form:", normalized);

      const clearTimer = setTimeout(() => {
        sessionStorage.removeItem("importedResume");
      }, 250);

      return () => clearTimeout(clearTimer);
    } catch (err) {
      console.error("Failed to load imported resume:", err);
      sessionStorage.removeItem("importedResume");
    }
  }, [location.key, cvId]);


  // computed height for moile screens
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const updatePreviewMetrics = () => {
      const navbar = document.querySelector(".cv-navbar");
      const navbarHeight = navbar?.offsetHeight || 65;

      const availableHeight = window.innerHeight - navbarHeight - 16;
      const nextHeight = Math.max(Math.floor(window.innerHeight * 1), Math.min(availableHeight, window.innerHeight));

      setPdfPreviewHeight(nextHeight);
      setViewPortWidth(window.innerWidth);
    }

    updatePreviewMetrics();
    window.addEventListener("resize", updatePreviewMetrics);
    window.addEventListener("orientationchange", updatePreviewMetrics)

    return () => {
      window.removeEventListener("resize", updatePreviewMetrics);
      window.removeEventListener("orientationchange", updatePreviewMetrics)
    }
  }, []);

  // mobile fallbac condition
  const isTouchDevice =
    typeof window !== "undefined" &&
    ("ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer:coarse)").matches
    )

  const isMobileViewPort = viewportWidth <= 900;
  const usePdfCtaFallback = activeTab === "preview" && isMobileViewPort && isTouchDevice

  // Handlers
  const handleLayoutClick = useCallback((layout) => {
    const layoutMap = {
      layout1: { style: 'EditStyle', image: layoutOne },
      layout2: { style: 'EditStyleTwo', image: layoutTwo },
      layout3: { style: 'EditStyleThree', image: layoutThree },
    };

    const layoutConfig = layoutMap[layout] || layoutMap.layout1;

    setCurrentLayout(layout);
    setSelectedEditStyle(layoutConfig.style);

    // Toggle layout slider
    const layoutSlider = document.querySelector(".layout-slider");
    if (layoutSlider) {
      layoutSlider.classList.toggle("show");
    }
  }, []);

  const handleStylePage = useCallback((layout) => {
    const styleMap = {
      layout1: 'EditStyle',
      layout2: 'EditStyleTwo',
      layout3: 'EditStyleThree',
    };
    setSelectedEditStyle(styleMap[layout] || 'EditStyle');
  }, []);

  
  useEffect(() => {
    // Set initial layout and style
    setSelectedEditStyle('EditStyle');
    handleStylePage('layout1');
  }, [handleStylePage]);

    useEffect(() => {
    // Load existing CV if editing 
    if (cvId && token) {
      const loadCV = async () => {
        try {
          const res = await API.get(`/api/cv/${cvId}`);
          const { formData: fetchedFormData, customStyles: fetchedStyles,
            visibleSections: fetchedVisibleSections, layout, title } = res.data;

          setFormData(fetchedFormData || INITIAL_FORM_DATA);
          setCustomStyles({ ...INITIAL_STYLES, ...(fetchedStyles || {}) });

          setVisibleSections(fetchedVisibleSections || INITIAL_VISIBLE_SECTIONS);
          setCurrentLayout(layout || 'layout1');
          setCvName(title || '');
          // setSectionOrder(res.data.sectionOrder || DEFAULT_SECTION_ORDER);

          // Set appropriate edit style component
          handleStylePage(layout || 'layout1');
        } catch (err) {
          console.error('Failed to load CV:', err);
          alert('Failed to load CV. Please try again.');
        }
      };
      loadCV();
    }
  }, [cvId, token, handleStylePage]);

  const generateThumbnail = useCallback(async () => {
    const element = previewRef.current;
    if (!element) return null;

    try {
      const canvas = await html2canvas(element, {
        scale: 0.4,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });
      return canvas.toDataURL("image/png");
    } catch (error) {
      console.error('Error generating thumbnail:', error);
      return null;
    }
  }, []);

  const [saveError, setSaveError] = useState(null);

  const saveCvToBackend = useCallback(async () => {
    if (!formData || !currentLayout) {
      setSaveError('Please complete all required fields');
      return;
    }

    setSaveError(null);
    setIsSaving(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setSaveError('Please login to save CV');
        setIsSaving(false);
        return;
      }

      const thumbnail = await generateThumbnail();
      const payload = {
        title: cvName.trim() || 'Untitled CV',
        data: formData,
        layout: currentLayout,
        customStyles,
        visibleSections,
        thumbnail
      };

      if (cvId) {
        await API.put(`/api/cv/${cvId}`, payload);
      } else {
        const res = await API.post('/api/cv/create', payload);
        navigate(`/builder?id=${res.data._id}`);
      }

      setShowSaveDialog(false);
    } catch (err) {
      console.error('Save CV error:', err.response?.data || err.message);
      setSaveError(err.response?.data?.message || 'Failed to save CV. Please try again.');
    } finally {
      setIsSaving(false);
    }
  }, [cvId, cvName, currentLayout, formData, customStyles, visibleSections, navigate, generateThumbnail]);


  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      const blob = await pdf(
        getPdfLayout(currentLayout, {
          ...formData,
          visibleSections,
          style: customStyles
        })
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${cvName || "resume"}.pdf`;
      a.click();

      URL.revokeObjectURL(url);

      // show feedback after download trigger (delayed)
      const feedbackFlag = sessionStorage.getItem("feedbackPromptedAfterDownload");
      if (!feedbackFlag) {
        setTimeout(() => {
          setShowFeedback(true);
          sessionStorage.setItem("feedbackPromptedAfterDownload", "1");
        }, 250);
      }


      // fire-and-forget metric update (don't block UI)
      if (!import.meta.env.DEV) {
        API.post("/api/metrics/download").catch((err) => {
          console.error("Failed to update download metric:", err?.response?.data || err.message);
        });
      }
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  // const moveItem = (arr,from,to) => {
  //   const copy = [...arr];
  //   const [item] = copy.splice(from,1);
  //   copy.splice(to,0,item);
  //   return copy;
  // }

  const updateStyles = useCallback((newStyles) => {
    setCustomStyles(prev => ({ ...prev, ...newStyles }));
  }, []);

  // Component renderers
  const renderEditStyle = () => {
    const styleComponents = {
      EditStyle: (
        <EditStyle
          customStyles={customStyles}
          setCustomStyles={setCustomStyles}
          updateStyles={updateStyles}
        />
      ),
      EditStyleTwo: (
        <EditStyleTwo
          customStyles={customStyles}
          setCustomStyles={setCustomStyles}
          updateStyles={updateStyles}
        />
      ),
      EditStyleThree: (
        <EditStyleThree
          customStyles={customStyles}
          setCustomStyles={setCustomStyles}
          updateStyles={updateStyles}
        />
      ),
    };
    return styleComponents[selectedEditStyle] || null;
  };

  const getPdfLayout = (layout, props) => {
    switch (layout) {
      case "layout1":
        return <PDFlayoutOne {...props} />;
      case "layout2":
        return <PDFlayoutTwo {...props} />;
      case "layout3":
        return <PDFlayoutThree {...props} />;
      default:
        return <PDFlayoutOne {...props} />;
    }
  };




  return (
    <>

      <div className="ResuCraft-app">
        <BuilderNavbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          handleStylePage={handleStylePage}
          currentLayout={currentLayout}
          isLoggedIn={isLoggedIn}
          handleDownloadPDF={handleDownloadPDF}
          setShowSaveDialog={setShowSaveDialog}
          showForm={showForm}
          setShowForm={setShowForm}
          navigateToDashboard={navigate}
          username={username}
          setGlobalLoading={setGlobalLoading}
          isDownloading={isDownloading}
          isSaving={isSaving}
        />

        <div className="ResuCraft-container">
          {showForm && (
            <div className="ResuCraft-form-container">
              {activeTab === "content" && (
                <div className="form-wizard-wrapper">
                  <Suspense fallback={<div>Loading form...</div>}>
                  <FormWizard
                    formData={formData}
                    setFormData={setFormData}
                    visibleSections={visibleSections}
                    setVisibleSections={setVisibleSections}
                  />
                  </Suspense>
                </div>
              )}
              {activeTab === "style" && (
                <div className="edit-style-wrapper">
                  <Suspense fallback={<div>Loading styles...</div>}>
                  {renderEditStyle()}
                  </Suspense>
                  {/* branding content starts */}
                  <div style={{ marginTop: 12, fontSize: 13 }}>
                    <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <input
                        type="checkbox"
                        checked={customStyles.showBranding !== false}
                        disabled={!isLoggedIn}
                        onChange={(e) =>
                          setCustomStyles((prev) => ({
                            ...prev,
                            showBranding: e.target.checked
                          }))
                        }
                      />
                      Include "Created with ResuCraft" footer in PDF
                    </label>
                    {!isLoggedIn && (
                      <div style={{ marginTop: 6, color: "#6b7280" }}>
                        Guest exports always include branding.
                      </div>
                    )}
                  </div>
                  {/* branding content starts */}
                </div>
              )}
            </div>
          )}

          <div
            className={`ResuCraft-preview-container ${activeTab === "preview" ? "full-screen" : ""}`}
            style={
              activeTab === "preview"
                ? { height: `${pdfPreviewHeight}px`, minHeight: `${pdfPreviewHeight}px` }
                : undefined
            }
          >

            {activeTab !== "preview" && (
              <Suspense fallback={<div>Loading preview...</div>}>
              <PreviewDisplay
                ref={previewRef}
                {...formData}
                style={customStyles}
                // sectionOrder={sectionOrder}
                visibleSections={visibleSections}
                currentLayout={currentLayout}
              />
              </Suspense>
            )}

            {/* React-PDF fullscreen preview */}
            {activeTab === "preview" && (
              usePdfCtaFallback ? (
                <div
                  style={{
                    width: "100%",
                    minHeight: `${pdfPreviewHeight}px`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 12,
                    padding: 16,
                    textAlign: "center",
                  }}
                >
                  <p style={{ margin: 0, color: "#475569", fontSize: 14 }}>
                    Full-screen PDF preview is not supported on this device.
                  </p>
                  <button
                    type="button"
                    onClick={handleDownloadPDF}
                    style={{
                      background: "#2563eb",
                      color: "#fff",
                      border: "none",
                      borderRadius: 8,
                      padding: "10px 16px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Download PDF
                  </button>
                </div>
              ) : (
                <PDFViewer
                  width="100%"
                  height={pdfPreviewHeight}
                  showToolbar={false}
                  style={{ width: "100%", height: `${pdfPreviewHeight}px`, border: "none" }}
                >
                  {getPdfLayout(currentLayout, {
                    ...formData,
                    visibleSections,
                    style: customStyles,
                  })}
                </PDFViewer>
              )
            )}
            <Suspense fallback={null}>
            <LayoutDrawer
              handleLayoutClick={handleLayoutClick}
              images={{ layoutOne, layoutTwo, layoutThree }}
              currentImage={currentLayout === 'layout1' ? layoutOne :
                currentLayout === 'layout2' ? layoutTwo : layoutThree}
            />
            </Suspense>

          </div>
        </div>
      </div>

      {showSaveDialog && (
        <SaveCVModal
          cvName={cvName}
          setCvName={setCvName}
          onSave={saveCvToBackend}
          onClose={() => {
            setShowSaveDialog(false);
            setSaveError(null);
          }}
          isSaving={isSaving}
          error={saveError}
        />
      )}

      <Feedback open={showFeedback} onClose={() => setShowFeedback(false)} />

    </>
  );
};

export default CvBuilder;



