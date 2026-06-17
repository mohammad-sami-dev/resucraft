import React, { useState, useEffect, useCallback } from "react";

import '../../styles/layout styles/layout.css'
// import { image } from "html2canvas/dist/types/css/types/image";

const Layout = ({ handleLayoutClick, handleMouseEnter, handleMouseLeave, images, closeDrawer }) => {

  const [isMobile, setIsMobile] = useState(() => window.matchMedia("(max-width:840px)").matches);
 

  // keep in sync with screen resize

  useEffect(() => {
    const mq = window.matchMedia("(max-width:840px)");;
    const handler = (e) => {
      setIsMobile(e.matches);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Desktop hover open/close
  const onEnter = useCallback(
    (e) => {
      if (!isMobile) {
        handleMouseEnter?.(e);
      }
    },
    [isMobile, handleMouseEnter]
  );

  const onLeave = useCallback(
    (e) => {
      if (!isMobile) {
        handleMouseLeave?.(e);
      }
    },
    [isMobile, handleMouseLeave]
  );

  const selectLayout = (layout) => {
    handleLayoutClick(layout);
    closeDrawer?.();
  };



  return (
    <div className="layout-switcher" onMouseEnter={onEnter} onMouseLeave={onLeave}>


      {/* Layout Slider */}
      <div className='layout-slider' role="menu">
        <div className="layout-heading"><h3>LAYOUTS</h3></div>
        <button className="layout-option" role="menuitem" onClick={() => selectLayout("layout1")}>
          <img src={images.layoutOne} alt="layout 1" />
          <p>Modern</p>
        </button>
        <button className="layout-option" role="menuitem" onClick={() => selectLayout("layout2")}>
          <img src={images.layoutTwo} alt="layout 2" />
          <p>Professional</p>
        </button>
        <button className="layout-option" role="menuitem" onClick={() => selectLayout("layout3")}>
          <img src={images.layoutThree} alt="layout 3" />
          <p>Basic</p>
        </button>
      </div>
    </div>
  )
}


export default Layout;
