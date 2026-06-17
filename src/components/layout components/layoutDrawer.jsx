import { useState,useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Layout from "./Layout";
import "../../styles/layout styles/LayoutDrawer.css";


const LayoutDrawer = (props) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
  const close = (e) => {
    if (!e.target.closest(".layout-drawer") && 
        !e.target.closest(".layout-floating-btn")) {
      setOpen(false);
    }
  };

  if (open) document.addEventListener("click", close);
  return () => document.removeEventListener("click", close);
}, [open]);


 return (
    <>
      {/* Floating Toggle */}
      <button
        className={`layout-floating-btn ${open ? "attached" : ""}`}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? "Close layout panel" : "Open layout panel"}
        title="Layout Options"
      >
        {open ? '»':'«' }
      </button>

      {/* Slide Panel */}
      <div className={`layout-drawer ${open ? "open" : ""}`}>
        <Layout {...props} closeDrawer={() => setOpen(false)} />
        
       
        
      </div>
    </>
  );
};

export default LayoutDrawer;