import React from "react";
import { Link } from "react-router-dom";

const AssessmentsPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">
          Assessments
        </h1>
        <p>
          Welcome! Please complete the necessary assessments to help us provide personalized care for you. To get started,{' '}
          <Link to="/assessment" className="text-blue-500 underline">
            click here!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AssessmentsPage;