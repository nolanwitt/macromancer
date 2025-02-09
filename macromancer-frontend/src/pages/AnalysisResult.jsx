import React from "react";
import { useLocation } from "react-router-dom";

const AnalysisResult = () => {
  const location = useLocation();
  const { results } = location.state || {};

  if (!results) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <h2 className="text-2xl font-semibold text-red-600">No analysis data available.</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
        Analysis Results
      </h1>
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <p><strong>Calories:</strong> {results.calories} kcal</p>
        <p><strong>Protein:</strong> {results.protein} g</p>
        <p><strong>Carbohydrates:</strong> {results.carbohydrates} g</p>
        <p><strong>Fats:</strong> {results.fats} g</p>
      </div>
    </div>
  );
};

export default AnalysisResult;