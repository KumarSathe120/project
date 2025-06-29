import React, { useState, useEffect } from 'react';

export default function UnitEntryPage() {
  const [unit, setUnit] = useState('');
  const [unitsList, setUnitsList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [editIndex, setEditIndex] = useState(null)
  const [error, setError] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleAddUnit = () => {
    if(!unit){
      setError('required')
      return
    }

    setError('')
    if(editIndex !== null ){
      let allUnit = [...unitsList]
      allUnit[editIndex] = unit
      setUnitsList(allUnit)
      setEditIndex(null)
      setUnit('')
    }else{
      const trimmed = unit.trim();
      if (trimmed && !unitsList.some(u => u.toLowerCase() === trimmed.toLowerCase())) {
        setUnitsList([...unitsList, trimmed]);
        setUnit('');
      }
    }
  };

  const handleEdit = (index) => {
    const unit = unitsList[index];
    setError('')
    setUnit(unit)
    setEditIndex(index);
  };

  const handleDelete = () => {
    let updatedList = unitsList.filter((_,i)=> i !== deleteIndex )
    setUnitsList(updatedList)
    setDeleteIndex(null)
    setShowDeleteModal(false)
  }

  const showModal = (index) => {
    setDeleteIndex(index)
    setShowDeleteModal(true)
  }

  const filteredUnits = unitsList.filter((u) =>
    u.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUnits.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUnits = filteredUnits.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [filteredUnits.length, itemsPerPage, totalPages, currentPage]);


  const goToFirst = () => setCurrentPage(1);
  const goToLast = () => setCurrentPage(totalPages);
  const goToNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 border-b pb-2 text-gray-800">Unit Entry</h1>

        <div className="flex flex-col sm:flex-row gap-4 items-end mb-6">
          <div className="flex-1 w-full">
            <label htmlFor="unit-input" className="block text-gray-700 font-semibold mb-1">Enter Unit</label>
            <input
              id="unit-input"
              type="text"
              placeholder="e.g., Kilogram"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className={`w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 ease-in-out
                ${error ? 'border-red-500': ''}`}
            />
          </div>
          <button
            onClick={handleAddUnit}
            className="w-full sm:w-auto px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-200 ease-in-out shadow-sm"
          >
           {editIndex !== null ?  'Update Unit':'Add Unit'}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
            <label htmlFor="items-per-page" className="text-gray-700">Show</label>
            <select
              id="items-per-page"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(parseInt(e.target.value));
                setCurrentPage(1);
              }}
              className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {[10, 25, 50, 100].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            <span className="text-gray-700">entries</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <label htmlFor="search-input" className="sr-only">Search unit</label>
            <input
              id="search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search unit..."
              className="w-full sm:w-auto border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
          <table className="w-full text-sm sm:text-base border-collapse">
            <thead className="bg-gray-50 text-left text-gray-600 uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3 border-b border-gray-200">Sr. No.</th>
                <th className="px-4 py-3 border-b border-gray-200">Unit</th>
                <th className="px-4 py-3 border-b border-gray-200">Actions</th>
                
              </tr>
            </thead>
            <tbody>
              {currentUnits.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-500 border-b border-gray-200">
                    No units found.
                  </td>
                </tr>
              ) : (
                currentUnits.map((u, index) => (
                   <tr key={startIndex + index}>
                <td className="border px-4 py-2">{startIndex + index + 1}</td>
                <td className="border px-4 py-2">{u}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    // onClick={() => handleEdit(index)}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => showModal(index)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-md max-w-sm w-full text-center">
              <p className="text-lg font-semibold mb-4">Are you sure you want to delete this unit?</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {totalPages > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
            <div className="flex gap-2 order-2 sm:order-1">
              <button
                onClick={goToFirst}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700"
              >
                &laquo; First
              </button>
              <button
                onClick={goToPrev}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700"
              >
                &larr; Prev
              </button>
            </div>

            <div className="text-center font-medium text-gray-700 order-1 sm:order-2">
              Page {currentPage} of {totalPages}
            </div>

            <div className="flex gap-2 order-3 sm:order-3">
              <button
                onClick={goToNext}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700"
              >
                Next &rarr;
              </button>
              <button
                onClick={goToLast}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700"
              >
                Last &raquo;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}