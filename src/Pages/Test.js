import React, { useState } from 'react';

const ProgressBar = () => {
  const [status, setStatus] = useState('Open');

  const getBarStyle = () => {
    switch (status) {
      case 'Open':
        return 'w-1/5 bg-blue-500';
      case 'Save':
        return 'w-2/5 bg-orange-500';
      case 'Approval 1':
        return 'w-3/5 bg-gradient-to-r from-green-500 to-orange-500 animate-gradient-x';
      case 'Approval 2':
        return 'w-4/5 bg-green-600';
      case 'Rejected':
        return 'w-full bg-red-500';
      default:
        return 'w-1/5 bg-gray-300';
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="relative w-full h-8 rounded-full overflow-hidden bg-gray-200">
        <div
          className={`h-full transition-all duration-500 ease-in-out ${getBarStyle()}`}
        >
          {status !== 'Approval 1' && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full border-r border-white opacity-30"></div>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center">
        {['Open', 'Save', 'Approval 1', 'Approval 2', 'Rejected'].map((option) => (
          <label key={option} className="flex flex-col items-center space-y-1">
            <input
              type="radio"
              name="status"
              value={option}
              checked={status === option}
              onChange={(e) => setStatus(e.target.value)}
              className="hidden"
            />
            <div
              className={`w-4 h-4 rounded-full cursor-pointer ${
                status === option ? 'bg-blue-600 ring-2 ring-blue-600' : 'bg-gray-400'
              }`}
            />
            <span className="text-sm">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;