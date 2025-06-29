import React, { useState, useEffect } from 'react';

export default function ProductCategoryEntryPage() {
  const [productCategory, setProductCategory] = useState('');
  const [productCategoryList, setProductCategoryList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState('')

  const [searchQuery, setSearchQuery] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteIndex, setDeleteIndex] = useState(null)

  const handleAddOrUpdateCategory = () => {

    if(!productCategory) {
      setError('required')
      return;
    }
    
    setError('')
    const trimmed = productCategory.trim();
    
    if (editIndex !== null) {
      const updatedList = [...productCategoryList];
      updatedList[editIndex] = trimmed;
      setProductCategoryList(updatedList);
      setEditIndex(null);
    } else {
      setProductCategoryList([...productCategoryList, trimmed]);
    }
    setProductCategory('');
  };

  const handleEdit = (index) => {
    // When editing, set the input value to the category being edited.
    // The index passed here is the *current page's* index, so we need to
    // find the global index for `productCategoryList` to get the correct value.
    setError('')
    const globalIndex = index + (currentPage - 1) * itemsPerPage;
    setProductCategory(productCategoryList[globalIndex]);
    setEditIndex(globalIndex);
  };

  const handleDelete = (index) => {
    // const globalIndex = index + (currentPage - 1) * itemsPerPage;
    const updatedList = productCategoryList.filter((_, i) => i !== deleteIndex);
    setProductCategoryList(updatedList);
    setShowDeleteModal(false)
    setDeleteIndex(null); 
  };

  const showModal = (index) => {
    setShowDeleteModal(true)
    setDeleteIndex(index)
  }

  const filteredCategories = productCategoryList.filter(category =>
    category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCategories = filteredCategories.slice(startIndex, startIndex + itemsPerPage);


  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [filteredCategories.length, itemsPerPage, totalPages, currentPage]);


  const goToFirst = () => setCurrentPage(1);
  const goToLast = () => setCurrentPage(totalPages);
  const goToNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const goToPrev = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 border-b pb-2 text-gray-800">Product Category Entry</h1>

        <div className="flex flex-col sm:flex-row gap-4 items-end mb-6">
          <div className="flex-1 w-full">
            <label htmlFor="category-input" className="block text-gray-700 font-semibold mb-1">Enter Product Category</label>
            <input
              id="category-input"
              type="text"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              placeholder="Eg. Electronics"
              className={`w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 ease-in-out
                ${error ? 'border-red-500': ''}`}
            />
          </div>
          <button
            onClick={handleAddOrUpdateCategory}
            className="w-full sm:w-auto px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-200 ease-in-out shadow-sm"
          >
            {editIndex !== null ? 'Update' : 'Add'}
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
              {[10, 25, 50, 100].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
            <span className="text-gray-700">entries</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <label htmlFor="search-input" className="sr-only">Search category</label>
            <input
              id="search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search..."
              className="w-full sm:w-auto border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
          <table className="w-full text-sm sm:text-base border-collapse">
            <thead className="bg-gray-50 text-left text-gray-600 uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3 border-b border-gray-200">Sr. No.</th>
                <th className="px-4 py-3 border-b border-gray-200">Category</th>
                <th className="px-4 py-3 border-b border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCategories.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-500 border-b border-gray-200">
                    No categories found.
                  </td>
                </tr>
              ) : (
                currentCategories.map((category, index) => (
                  <tr key={startIndex + index} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b border-gray-200">{startIndex + index + 1}</td>
                    <td className="px-4 py-2 border-b border-gray-200">{category}</td>
                    <td className="px-4 py-2 border-b border-gray-200 space-x-2">
                      <button
                        // onClick={() => handleEdit(index)}
                        className="text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleEdit(index)}
                        className="text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => showModal(index)}
                        className="text-red-600 hover:text-red-800 transition duration-150 ease-in-out"
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
              <p className="text-lg font-semibold mb-4">Are you sure you want to delete this category?</p>
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