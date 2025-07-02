"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Download, FileText, BarChart3, TrendingUp, Brain, BookOpen } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Define interfaces for type safety
interface SiteInfo {
  date: string;
  location: string;
  supervisor: string;
  weather: string;
}

interface Metrics {
  overallCompletion: number;
  structuralIntegrity: number;
  qualityScore: number;
  safetyCompliance: number;
  scheduleAdherence: number;
  alignmentAccuracy: number;
}

interface Components {
  total: number;
  completed: number;
  inProgress: number;
  pending: number;
}

interface Insights {
  aiSummary: string;
}

interface Data {
  siteInfo: SiteInfo;
  metrics: Metrics;
  components: Components;
  insights: Insights;
}

interface PDFGeneratorProps {
  data: Data;
  currentPage: number;
}

export function PDFGenerator({ data, currentPage }: PDFGeneratorProps) {
  // Safe data handling with fallbacks
  const safeData: Data = {
    siteInfo: {
      date: data.siteInfo?.date || "N/A",
      location: data.siteInfo?.location || "N/A",
      supervisor: data.siteInfo?.supervisor || "N/A",
      weather: data.siteInfo?.weather || "N/A",
    },
    metrics: {
      overallCompletion: data.metrics?.overallCompletion || 0,
      structuralIntegrity: data.metrics?.structuralIntegrity || 0,
      qualityScore: data.metrics?.qualityScore || 0,
      safetyCompliance: data.metrics?.safetyCompliance || 0,
      scheduleAdherence: data.metrics?.scheduleAdherence || 0,
      alignmentAccuracy: data.metrics?.alignmentAccuracy || 0,
    },
    components: {
      total: data.components?.total || 0,
      completed: data.components?.completed || 0,
      inProgress: data.components?.inProgress || 0,
      pending: data.components?.pending || 0,
    },
    insights: {
      aiSummary: data.insights?.aiSummary || "No AI summary available.",
    },
  };

  // Helper function to add header and footer
  const addHeaderAndFooter = (
    pdf: jsPDF,
    title: string,
    pageNumber: number,
    totalPages: number,
  ) => {
    // Header
    pdf.setFillColor(37, 99, 235);
    pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), 20, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(16);
    pdf.setFont("helvetica", "bold");
    pdf.text(title, 15, 12);

    // Footer
    pdf.setFillColor(248, 250, 252);
    pdf.rect(0, pdf.internal.pageSize.getHeight() - 10, pdf.internal.pageSize.getWidth(), 10, "F");
    pdf.setTextColor(100, 100, 100);
    pdf.setFontSize(8);
    pdf.setFont("helvetica", "normal");
    pdf.text(
      `Page ${pageNumber} of ${totalPages} | Generated on ${new Date().toLocaleDateString()}`,
      15,
      pdf.internal.pageSize.getHeight() - 5,
    );
  };

  // Helper function to add cover page
  const addCoverPage = (pdf: jsPDF) => {
    pdf.setFillColor(37, 99, 235);
    pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight(), "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.setFont("helvetica", "bold");
    pdf.text("Construction Progress Report", 15, 100);
    pdf.setFontSize(16);
    pdf.text(`Project: ${safeData.siteInfo.location}`, 15, 120);
    pdf.text(`Date: ${safeData.siteInfo.date}`, 15, 130);
    pdf.text(`Prepared by: ${safeData.siteInfo.supervisor}`, 15, 140);
  };

  // Helper function to add table of contents
  const addTableOfContents = (pdf: jsPDF, pages: { id: string; title: string }[]) => {
    pdf.addPage();
    pdf.setFillColor(248, 250, 252);
    pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight(), "F");
    pdf.setTextColor(30, 64, 175);
    pdf.setFontSize(20);
    pdf.setFont("helvetica", "bold");
    pdf.text("Table of Contents", 15, 30);

    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");
    pages.forEach((page, index) => {
      pdf.text(`${index + 1}. ${page.title}`, 15, 50 + index * 10);
      pdf.text(`${index + 2}`, 180, 50 + index * 10); // Page number
    });
  };

  const generateSinglePagePDF = async (elementId: string, filename: string) => {
    const element = document.getElementById(elementId);
    if (!element) {
      alert("Element not found. Please try again.");
      return;
    }

    try {
      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#f8fafc",
        logging: false,
        width: element.scrollWidth,
        height: element.scrollHeight,
        windowWidth: 1400,
        windowHeight: element.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        foreignObjectRendering: true,
        imageTimeout: 0,
        removeContainer: true,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById(elementId);
          if (clonedElement) {
            clonedElement.style.transform = "none";
            clonedElement.style.minHeight = "auto";
            const allElements = clonedElement.querySelectorAll("*");
            allElements.forEach((el: Element) => {
              if (el instanceof HTMLElement) {
                el.style.transform = "none";
              }
            });
          }
        },
      });

      const imgData = canvas.toDataURL("image/png", 0.8); // Reduced quality for smaller file size
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pdfWidth - 30; // 15mm margins
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Add header
      addHeaderAndFooter(pdf, filename.replace(".pdf", ""), 1, 1);

      // Add image with margins
      let heightLeft = imgHeight;
      let position = 20;
      pdf.addImage(imgData, "PNG", 15, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight - 20;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        addHeaderAndFooter(pdf, filename.replace(".pdf", ""), pdf.getNumberOfPages(), 1);
        pdf.addImage(imgData, "PNG", 15, 20, imgWidth, imgHeight);
        heightLeft -= pdfHeight - 20;
      }

      pdf.save(filename);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
  };

  const generateCompletePDF = async () => {
    try {
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const pages = [
        // { id: "cover-page", title: "Cover Page" },
        { id: "image-comparison", title: "Image Comparison" },
        // { id: "progress-metrics", title: "Progress Metrics" },
        { id: "completion-chart", title: "Completion Overview" },
        { id: "component-status", title: "Component Status" },
        { id: "historical-trends", title: "Historical Trends" },
        { id: "insights-remarks", title: "AI Summary & Remarks" },
      ];

      // Add cover page
      addCoverPage(pdf);

      // Add table of contents
      addTableOfContents(pdf, pages);

      let isFirstPage = false;

      for (const [index, page] of pages.entries()) {
        const element = document.getElementById(page.id);
        if (element) {
          try {
            const canvas = await html2canvas(element, {
              scale: 2.5,
              useCORS: true,
              allowTaint: true,
              backgroundColor: "#f8fafc",
              logging: false,
              width: element.scrollWidth,
              height: element.scrollHeight,
              windowWidth: 1400,
              windowHeight: element.scrollHeight,
              scrollX: 0,
              scrollY: 0,
              foreignObjectRendering: true,
              imageTimeout: 0,
              removeContainer: true,
              onclone: (clonedDoc) => {
                const clonedElement = clonedDoc.getElementById(page.id);
                if (clonedElement) {
                  clonedElement.style.transform = "none";
                  clonedElement.style.minHeight = "auto";
                  const allElements = clonedElement.querySelectorAll("*");
                  allElements.forEach((el: Element) => {
                    if (el instanceof HTMLElement && el.style) {
                      el.style.transform = "none";
                    }
                  });
                }
              },
            });

            const imgData = canvas.toDataURL("image/png", 0.8);
            const imgWidth = pdfWidth - 30;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            if (!isFirstPage) {
              pdf.addPage();
            }
            isFirstPage = false;

            addHeaderAndFooter(pdf, page.title, pdf.getNumberOfPages(), pages.length + 2);

            let heightLeft = imgHeight;
            let position = 20;
            pdf.addImage(imgData, "PNG", 15, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight - 20;

            while (heightLeft >= 0) {
              position = heightLeft - imgHeight;
              pdf.addPage();
              addHeaderAndFooter(pdf, page.title, pdf.getNumberOfPages(), pages.length + 2);
              pdf.addImage(imgData, "PNG", 15, position, imgWidth, imgHeight);
              heightLeft -= pdfHeight - 20;
            }

            await new Promise((resolve) => setTimeout(resolve, 200));
          } catch (error) {
            console.error(`Error capturing ${page.title}:`, error);
          }
        }
      }

      pdf.save("complete-construction-report.pdf");
    } catch (error) {
      console.error("Error generating complete PDF:", error);
      alert("Error generating complete PDF. Please try again.");
    }
  };

  const generateSummaryPDF = () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Background
    pdf.setFillColor(248, 250, 252);
    pdf.rect(0, 0, pdfWidth, pdfHeight, "F");

    // Header and Footer
    addHeaderAndFooter(pdf, "Construction Progress Summary", 1, 1);

    // Site Info Card
    pdf.setFillColor(255, 255, 255);
    pdf.roundedRect(15, 30, 180, 40, 3, 3, "F");
    pdf.setDrawColor(219, 234, 254);
    pdf.roundedRect(15, 30, 180, 40, 3, 3, "S");
    pdf.setTextColor(30, 64, 175);
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.text("Site Information", 20, 40);
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");
    pdf.text(`• Date: ${safeData.siteInfo.date}`, 20, 50);
    pdf.text(`• Location: ${safeData.siteInfo.location}`, 20, 60);
    pdf.text(`• Supervisor: ${safeData.siteInfo.supervisor}`, 110, 50);
    pdf.text(`• Weather: ${safeData.siteInfo.weather}`, 110, 60);

    // Metrics Card
    pdf.setFillColor(255, 255, 255);
    pdf.roundedRect(15, 80, 180, 80, 3, 3, "F");
    pdf.setDrawColor(219, 234, 254);
    pdf.roundedRect(15, 80, 180, 80, 3, 3, "S");
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.text("Key Metrics", 20, 90);
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");
    const metrics = [
      `• Overall Completion: ${safeData.metrics.overallCompletion}% (Project progress)`,
      `• Structural Integrity: ${safeData.metrics.structuralIntegrity}% (Building stability)`,
      `• Quality Score: ${safeData.metrics.qualityScore}% (Workmanship quality)`,
      `• Safety Compliance: ${safeData.metrics.safetyCompliance}% (Adherence to safety standards)`,
      `• Schedule Adherence: ${safeData.metrics.scheduleAdherence}% (Timeline progress)`,
      `• Alignment Accuracy: ${safeData.metrics.alignmentAccuracy}% (Precision in construction)`,
    ];
    metrics.forEach((metric, index) => {
      if (metric.includes("Safety Compliance") && safeData.metrics.safetyCompliance < 80) {
        pdf.setTextColor(239, 68, 68);
        pdf.setFont("helvetica", "bold");
      }
      pdf.text(metric, 20, 100 + index * 10);
      pdf.setTextColor(30, 64, 175);
      pdf.setFont("helvetica", "normal");
    });

    // Component Summary Card
    pdf.setFillColor(255, 255, 255);
    pdf.roundedRect(15, 170, 180, 40, 3, 3, "F");
    pdf.setDrawColor(219, 234, 254);
    pdf.roundedRect(15, 170, 180, 40, 3, 3, "S");
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.text("Component Summary", 20, 180);
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");
    pdf.text(`• Total Components: ${safeData.components.total}`, 20, 190);
    pdf.text(`• Completed: ${safeData.components.completed}`, 20, 200);
    pdf.text(`• In Progress: ${safeData.components.inProgress}`, 110, 190);
    pdf.text(`• Pending: ${safeData.components.pending}`, 110, 200);

    // AI Summary Card
    pdf.setFillColor(255, 255, 255);
    pdf.roundedRect(15, 220, 180, 60, 3, 3, "F");
    pdf.setDrawColor(219, 234, 254);
    pdf.roundedRect(15, 220, 180, 60, 3, 3, "S");
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.text("AI Summary", 20, 230);
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");
    const splitText = pdf.splitTextToSize(safeData.insights.aiSummary, 170);
    pdf.text(splitText, 20, 240);

    pdf.save("construction-summary.pdf");
  };

  const downloadOptions = [
    // {
    //   id: "cover-page",
    //   name: "Cover Page",
    //   icon: FileText,
    //   filename: "cover-page.pdf",
    //   available: currentPage === 0,
    //   tooltip: "Download the cover page with project details.",
    // },
    // {
    //   id: "progress-metrics",
    //   name: "Progress Metrics",
    //   icon: BarChart3,
    //   filename: "progress-metrics.pdf",
    //   available: currentPage === 2,
    //   tooltip: "Download the progress metrics section with key performance indicators.",
    // },
    // {
    //   id: "completion-chart",
    //   name: "Completion Chart",
    //   icon: TrendingUp,
    //   filename: "completion-chart.pdf",
    //   available: currentPage === 3,
    //   tooltip: "Download the completion overview chart.",
    // },
    {
      id: "insights-remarks",
      name: "AI Insights",
      icon: Brain,
      filename: "ai-insights.pdf",
      available: currentPage === 6,
      tooltip: "Download the AI-generated summary and remarks.",
    },
  ];

  return (
    <TooltipProvider>
      <div className="flex items-center space-x-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={generateCompletePDF}
              className="text-blue-600 hover:bg-blue-50 border border-blue-200 font-semibold"
            >
              <BookOpen className="h-4 w-4 mr-1" />
              Complete Report PDF
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Download a complete report with all sections, including charts and insights.</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={generateSummaryPDF}
              className="text-blue-600 hover:bg-blue-50 border border-blue-200"
            >
              <Download className="h-4 w-4 mr-1" />
              Summary PDF
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Download a concise summary of key metrics and insights.</p>
          </TooltipContent>
        </Tooltip>

        {downloadOptions.map((option) => (
          <Tooltip key={option.id}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  option.available
                    ? generateSinglePagePDF(option.id, option.filename)
                    : alert(`${option.name} is not available on this page.`)
                }
                className={`text-blue-600 border border-blue-200 ${
                  option.available ? "hover:bg-blue-50" : "opacity-50 cursor-not-allowed"
                }`}
                disabled={!option.available}
              >
                <option.icon className="h-4 w-4 mr-1" />
                {option.name}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {option.available
                  ? `Download the ${option.name} section as a PDF.`
                  : `${option.name} is only available on its specific page.`}
              </p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
