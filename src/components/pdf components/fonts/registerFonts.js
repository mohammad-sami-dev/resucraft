import { Font } from "@react-pdf/renderer";

// Use local TTF files in this folder (or absolute public URLs).
// family names here are what you'll use in style.fontFamily for PDF layouts.

import GeorgiaRegular from "../../../assets/fonts/georgia.ttf"
import GeorgiaBold from "../../../assets/fonts/georgiab.ttf"
import GeorgiaItalic from "../../../assets/fonts/georgiai.ttf"
import GeorgiaBoldItalic from "../../../assets/fonts/georgiaz.ttf"
Font.register({
  family: "Georgia",
  fonts: [
    { src: GeorgiaRegular },
    { src: GeorgiaBold, fontWeight: "bold" },
    { src: GeorgiaItalic, fontStyle: "italic" },
    { src: GeorgiaBoldItalic, fontWeight: "bold", fontStyle: "italic" },
  ],
});



import CalibriRegular from "../../../assets/fonts/calibri.ttf"
import CalibriBold from "../../../assets/fonts/calibrib.ttf"
import CalibriItalic from "../../../assets/fonts/calibrii.ttf"
import CalibriBoldItalic from "../../../assets/fonts/calibriz.ttf"
Font.register({
  family: "Calibri",
  fonts: [
    { src: CalibriRegular },
    { src: CalibriBold, fontWeight: "bold" },
    { src: CalibriItalic, fontStyle: "italic" },
    { src: CalibriBoldItalic, fontWeight: "bold", fontStyle: "italic" },
  ],
});



import ArialRegular from "../../../assets/fonts/arial.ttf"
import ArialBold from "../../../assets/fonts/arialbd.ttf"
import ArialItalic from "../../../assets/fonts/ariali.ttf"
import ArialBoldItalic from "../../../assets/fonts/arialbi.ttf"

Font.register({
  family: "Arial",
  fonts: [
    { src: ArialRegular },
    { src: ArialBold, fontWeight: "bold" },
    { src: ArialItalic, fontStyle: "italic" },
    { src: ArialBoldItalic, fontWeight: "bold", fontStyle: "italic" },
  ],
});




import TimesRegular from "../../../assets/fonts/times.ttf"
import TimesBold from "../../../assets/fonts/timesbd.ttf"
import TimesItalic from "../../../assets/fonts/timesi.ttf"
import TimesBoldItalic from "../../../assets/fonts/timesbi.ttf"

Font.register({
  family: "Times New Roman",
  fonts: [
    { src: TimesRegular},
    { src: TimesBold, fontWeight: "bold" },
    { src: TimesItalic, fontStyle: "italic" },
    { src: TimesBoldItalic, fontWeight: "bold", fontStyle: "italic" },
  ],
});


import CambriaRegular from "../../../assets/fonts/cambria.ttf"
import CambriaBold from "../../../assets/fonts/cambriab.ttf"
import CambriaItalic from "../../../assets/fonts/cambriai.ttf"
import CambriaBoldItalic from "../../../assets/fonts/cambriaz.ttf"

Font.register({
  family: "Cambria",
  fonts: [
    { src: CambriaRegular},
    { src: CambriaBold, fontWeight: "bold" },
    { src: CambriaItalic, fontStyle: "italic" },
    { src: CambriaBoldItalic, fontWeight: "bold", fontStyle: "italic" },
  ],
});