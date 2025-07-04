"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface ImageComparisonProps {
  onComparisonComplete?: (result: string) => void;
}

export default function ImageComparison({ onComparisonComplete }: ImageComparisonProps) {
  const [images, setImages] = useState<string[]>([]);
  const [isComparing, setIsComparing] = useState(false);
  const [comparisonResult, setComparisonResult] = useState<string>('');

  // Hardcoded site info
  const siteInfo = {
    date: "2025-07-04",
    location: "Downtown Project Site",
    supervisor: "Arush Karnatak",
    weather: "Clear, 25°C"
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const encodedImages: string[] = [];
    
    for (const file of acceptedFiles.slice(0, 2)) {
      const base64 = await convertToBase64(file);
      encodedImages.push(base64);
    }
    
    setImages(encodedImages);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp']
    },
    maxFiles: 2
  });

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  const compareImages = async () => {
    if (images.length !== 2) return;

    setIsComparing(true);
    setComparisonResult('');

    try {
      const response = await fetch('/api/compare-images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image1: images[0],
          image2: images[1],
          outputFormat: 'json',
          siteInfo
        }),
      });

      const data = await response.json();
      
      if (data.error) {
        setComparisonResult(`Error: ${data.error}`);
      } else {
        setComparisonResult(data.result);
        onComparisonComplete?.(data.result);
      }

    } catch (error) {
      console.error('Error comparing images:', error);
      setComparisonResult('Failed to compare images. Please try again.');
    } finally {
      setIsComparing(false);
    }
  };

  const downloadJSON = () => {
    if (!comparisonResult) return;
    
    const blob = new Blob([comparisonResult], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `construction-report-${siteInfo.date}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Site Info Display */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold mb-2 text-blue-800">Site Information</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="font-medium text-blue-700">Date:</span>
            <p className="text-blue-600">{siteInfo.date}</p>
          </div>
          <div>
            <span className="font-medium text-blue-700">Location:</span>
            <p className="text-blue-600">{siteInfo.location}</p>
          </div>
          <div>
            <span className="font-medium text-blue-700">Supervisor:</span>
            <p className="text-blue-600">{siteInfo.supervisor}</p>
          </div>
          <div>
            <span className="font-medium text-blue-700">Weather:</span>
            <p className="text-blue-600">{siteInfo.weather}</p>
          </div>
        </div>
      </div>

      {/* Image Upload Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        <div className="space-y-2">
          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="text-lg text-gray-600">
            {isDragActive 
              ? 'Drop the construction site images here...' 
              : 'Drop 2 construction site images here or click to select'
            }
          </p>
          <p className="text-sm text-gray-500">
            Supports PNG, JPG, JPEG, GIF, BMP, WebP (max 2 images)
          </p>
        </div>
      </div>

      {/* Image Preview */}
      {images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt={`Construction Site Image ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg border shadow-sm"
              />
              <span className="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm font-medium">
                Image {index + 1}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Analyze Button */}
      <button
        onClick={compareImages}
        disabled={images.length !== 2 || isComparing}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
      >
        {isComparing ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing Construction Progress...
          </span>
        ) : (
          'Generate Construction Report'
        )}
      </button>

      {/* Results */}
      {comparisonResult && (
        <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">Construction Progress Report</h3>
            <button
              onClick={downloadJSON}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
            >
              Download JSON
            </button>
          </div>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm border">
            <code>{comparisonResult}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
