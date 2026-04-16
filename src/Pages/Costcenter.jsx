import React, { useState } from 'react';
import Dashboard from './Dashboard';

const isAlphaNumeric = (str) => /^[0-9a-zA-Z]+$/.test(str);

const Costcenter = () => {
  const [costCenters, setCostCenters] = useState([]);
  const [error, setError] = useState('');
  const [savedCostCenters, setSavedCostCenters] = useState([]);
  const [validationError, setValidationError] = useState('');

  const handleAddCostCenter = () => {
    const newCostCenter = { id: '', code: '', name: '', budget: '' };
    setCostCenters([...costCenters, newCostCenter]);
    console.log('Added new cost center:', newCostCenter);
    console.log('Current cost centers:', costCenters);
  };

  const handleSaveCostCenters = () => {
    if (areAllFieldsFilled()) {
      setSavedCostCenters(costCenters);
      setCostCenters([]);
      setValidationError('');
      console.log('Saving cost centers:', costCenters);
    } else {
      setValidationError('Please fill all fields.');
      console.log('Validation error: Please fill all fields.');
    }
  };

  const handleInputChange = (index, event) => {
    const updatedCostCenters = [...costCenters];
    updatedCostCenters[index][event.target.name] = event.target.value;
    setCostCenters(updatedCostCenters);
    console.log('Updated cost center:', updatedCostCenters[index]);
  };

  const handleCodeChange = (index, event) => {
    const { value } = event.target;
    if (isAlphaNumeric(value)) {
      setError('');
      handleInputChange(index, event);
    } else {
      setError('Code must be alphanumeric');
      console.log('Validation error: Code must be alphanumeric');
    }
  };

  const areAllFieldsFilled = () => {
    const allFieldsFilled = costCenters.every(center => center.code && center.name && center.budget);
    console.log('All fields filled:', allFieldsFilled);
    return allFieldsFilled;
  };

  return (
    <div className="flex w-full">
      <Dashboard />
      <main className="flex-1 p-3 bg-gray-400 h-max border shadow-md w-full">
        <button
          onClick={handleAddCostCenter}
          className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Cost Center
        </button>
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {costCenters.map((center, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <input
                    type="text"
                    name="code"
                    value={center.code}
                    onChange={(e) => handleCodeChange(index, e)}
                    className="border-2 border-gray-300 rounded px-3 py-1 w-full"
                    placeholder="Enter Code"
                  />
                  {error && <p className="text-red-500 text-xs italic">{error}</p>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <input
                    type="text"
                    name="name"
                    value={center.name}
                    onChange={(e) => handleInputChange(index, e)}
                    className="border-2 border-gray-300 rounded px-3 py-1 w-full"
                    placeholder="Enter Number"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <input
                    type="text"
                    name="budget"
                    value={center.budget}
                    onChange={(e) => handleInputChange(index, e)}
                    className="border-2 border-gray-300 rounded px-3 py-1 w-full"
                    placeholder="Enter Description"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={handleSaveCostCenters}
          className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Save Cost Centers
        </button>
        {validationError && (
          <p className="text-red-500 text-xs italic mt-2">{validationError}</p>
        )}
        {savedCostCenters.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-4">Saved Cost Centers</h2>
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {savedCostCenters.map((center, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {center.code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {center.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {center.budget}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default Costcenter;
