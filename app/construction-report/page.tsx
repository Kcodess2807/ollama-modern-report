"use client";

import ImageComparison from '@/components/report-sections/image-compare';

export default function ConstructionReportPage() {
  const handleComparisonComplete = (result: string) => {
    console.log('Report generated:', result);
    // You can add more logic here like saving to state, showing notifications, etc.
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          AI Construction Progress Report
        </h1>
        <p className="text-gray-600">
          Upload two construction site images to generate a comprehensive progress analysis report.
        </p>
      </div>
      
      <ImageComparison 
        onComparisonComplete={handleComparisonComplete}
      />
    </div>
  );
}
