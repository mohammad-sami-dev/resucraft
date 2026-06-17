
import React from "react";
import { Document, Page } from "@react-pdf/renderer";

const PdfDocument = ({ children }) => {
  return (
    <Document>
      <Page size="A4" style={{ padding: 32 }}>
        {children}
      </Page>
    </Document>
  );
};

export default PdfDocument;