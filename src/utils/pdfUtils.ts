import html2pdf from "html2pdf.js";
import { toast } from "sonner";

export interface PDFExportOptions {
  margin: number;
  filename: string;
  image: {
    type: string;
    quality: number;
  };
  html2canvas: {
    scale: number;
  };
  jsPDF: {
    unit: string;
    format: string | [number, number];
    orientation: string;
  };
}

export const exportToPDF = (
  elementId: string,
  filename: string = "document.pdf",
  options?: Partial<PDFExportOptions>
): void => {
  const element = document.getElementById(elementId);

  if (!element) {
    toast.warning("Element not found for PDF export.");
    return;
  }

  const defaultOptions: PDFExportOptions = {
    margin: 1,
    filename,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  const mergedOptions = { ...defaultOptions, ...options };

  html2pdf().set(mergedOptions).from(element).save();
};
