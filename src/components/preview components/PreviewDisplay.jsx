import React, { forwardRef,useLayoutEffect,useRef, useState } from 'react';
import PreviewLayoutThree from '../preview components/PdfLayoutThree';
import PreviewLayoutOne from '../preview components/PDFlayoutOne';
import PreviewLayoutTwo from '../preview components/PdfLayoutTwo';
const A4_WIDTH = 794;

const PreviewDisplay = forwardRef(({currentLayout, visibleSections, style = {}, ...otherProps}, ref) => {
  
  const previewWrapperRef = useRef(null);
  const [wrapperWidth, setWrapperWidth] = useState(0);

  useLayoutEffect(() => {
    const el = previewWrapperRef.current;
    if (!el) return;
    
    const updateWidth = () => setWrapperWidth(el.clientWidth)

    updateWidth();
    el.scrollTop = 0;
    el.scrollLeft = 0;
    const observer = new ResizeObserver(updateWidth);
    observer.observe(el);

    window.addEventListener('resize',updateWidth);
    return(() => {
      observer.disconnect();
      window.removeEventListener('resize',updateWidth);
    })
  },[])
  const scale = wrapperWidth
    ? Math.min(1, (wrapperWidth - 24) / A4_WIDTH)
    : 1; 


  const getLayoutComponent = () => {
    console.log("Rendering layout:", otherProps);
    switch (currentLayout) {
      case 'layout1':
        return <PreviewLayoutOne visibleSections={visibleSections} style={style} {...otherProps} mode="preview" />;
      case 'layout2':
        return <PreviewLayoutTwo visibleSections={visibleSections} style={style}  {...otherProps} mode="preview" />;
      case 'layout3':
        return <PreviewLayoutThree visibleSections={visibleSections} style={style}  {...otherProps} mode="preview" />;
      default:
        return null;
    } 
  };

  const layoutComponent = getLayoutComponent();

  return layoutComponent ? (
    <div className="preview-wrapper" ref={previewWrapperRef}>
      <div 
        ref={ref} 
        className="cv-preview-display"
        style={{
          transform:`scale(${scale})`,
          transformOrigin:'top center',
        }}
      >
        {React.cloneElement(layoutComponent, { key: currentLayout })}
      </div>
    </div>
  ) : null;
});

export default PreviewDisplay;