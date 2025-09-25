import React from "react";

const LoadingUser: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center space-y-3">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
        <p className="text-gray-600 font-medium">Loading user...</p>
        <p className="text-gray-600 font-medium">
          Please wait a few mins for the server to start :)
        </p>
      </div>
    </div>
  );
};

export default LoadingUser;
