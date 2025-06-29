import React, { useState } from 'react';

export default function SupplierEntryPage() {
  const [supplierName, setSupplierName] = useState('');
  const [contactPersonName, setContactPersonName] = useState('');
  const [contactPersonContact, setContactPersonContact] = useState('');
  const [branchName, setBranchName] = useState('');
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [suppliers, setSuppliers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState({})

  const [searchQuery, setSearchQuery] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);


  const handleAddSupplier = () => {
  const errorMessage = {};
  if (!supplierName) errorMessage.supplierName = 'required';
  if (!email) errorMessage.email = 'required';
  if (!address) errorMessage.address = 'required';
  if (!contactPersonName) errorMessage.contactPersonName = 'required';
  if (!contactPersonContact) errorMessage.contactPersonContact = 'required';
  if (!branchName) errorMessage.branchName = 'required';
  
  setError(errorMessage);


  if (Object.keys(errorMessage).length === 0) {
    const newSupplier = {
      supplierName,
      contactPersonName,
      contactPersonContact,
      branchName,
      email,
      address
    };

    if (editIndex !== null) {
      const updated = [...suppliers];
      updated[editIndex] = newSupplier;
      setSuppliers(updated);
      setEditIndex(null);
    } else {
      setSuppliers([...suppliers, newSupplier]);
    }

    setSupplierName('');
    setContactPersonName('');
    setContactPersonContact('');
    setBranchName('');
    setEmail('');
    setAddress('');
    setError({});
  }
};

  const handleEdit = (index) => {
    const supplier = suppliers[index];
    setError({});
    setSupplierName(supplier.supplierName);
    setContactPersonName(supplier.contactPersonName);
    setContactPersonContact(supplier.contactPersonContact);
    setBranchName(supplier.branchName);
    setEmail(supplier.email)
    setAddress(supplier.address)
    setEditIndex(index);
  };

    const handleDeleteConfirm = () => {
        const updated = suppliers.filter((_, i) => i !== deleteIndex);
        setSuppliers(updated);
        setShowDeleteModal(false);
        setDeleteIndex(null);
      };

    const openDeleteModal = (index) => {
        setDeleteIndex(index);
        setShowDeleteModal(true);
    };


  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.supplierName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSuppliers = filteredSuppliers.slice(startIndex, startIndex + itemsPerPage);

  const goToFirst = () => setCurrentPage(1);
  const goToLast = () => setCurrentPage(totalPages);
  const goToNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Supplier Entry</h2>

      <div className="flex flex-col gap-4 mb-6">
        <input
          value={supplierName}
          onChange={(e) => setSupplierName(e.target.value)}
          placeholder="Supplier Name"
          className={`p-2 rounded border w-full ${error.supplierName ? 'border-red-500':''}`}
        />
        <input
          value={contactPersonName}
          onChange={(e) => setContactPersonName(e.target.value)}
          placeholder="Contact Person Name"
         className={`p-2 rounded border w-full ${error.contactPersonName ? 'border-red-500':''}`}
        />
        <input
          value={contactPersonContact}
          onChange={(e) => setContactPersonContact(e.target.value)}
          placeholder="Contact Number"
         className={`p-2 rounded border w-full ${error.contactPersonContact ? 'border-red-500':''}`}
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className={`p-2 rounded border w-full ${error.email ? 'border-red-500':''}`}
        />
        <textarea
          value={address}
          rows="3"
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
         className={`p-2 rounded border w-full ${error.address ? 'border-red-500':''}`}
        />
        <input
          value={branchName}
          onChange={(e) => setBranchName(e.target.value)}
          placeholder="Branch Name"
          className={`p-2 rounded border w-full ${error.branchName ? 'border-red-500':''}`}
        />

        <div className="flex justify-center">
          <button
            onClick={handleAddSupplier}
            className="w-[200px]  bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
          >
            {editIndex !== null ? 'Update' : 'Add'} Supplier
          </button>
        </div>
      </div>

      {/* Search and items per page */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
        <div className="flex items-center gap-2">
          <label>Show</label>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(parseInt(e.target.value));
              setCurrentPage(1);
            }}
            className="border rounded px-2 py-1"
          >
            {[10, 25, 50, 100].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
          <span>entries</span>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by Supplier Name"
            className="border rounded px-2 py-1"
          />
          <button
            onClick={() => setCurrentPage(1)}
            className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
          >
            Search
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border text-sm sm:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Sr No.</th>
              <th className="border px-4 py-2">Supplier Name</th>
              <th className="border px-4 py-2">Branch</th>
              <th className="border px-4 py-2">Contact Person</th>
              <th className="border px-4 py-2">Contact</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentSuppliers.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">No suppliers found.</td>
              </tr>
            ) : (
              currentSuppliers.map((supplier, index) => (
                <tr key={startIndex + index}>
                  <td className="border px-4 py-2">{startIndex + index + 1}</td>
                  <td className="border px-4 py-2">{supplier.supplierName}</td>
                  <td className="border px-4 py-2">{supplier.branchName}</td>
                  <td className="border px-4 py-2">{supplier.contactPersonName}</td>
                  <td className="border px-4 py-2">{supplier.contactPersonContact}</td>
                  <td className="border px-4 py-2 whitespace-nowrap">
                    <button
                    //   onClick={() => handleEdit(startIndex + index)}
                      className="text-blue-600 hover:underline mr-2"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(startIndex + index)}
                      className="text-blue-600 hover:underline mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => openDeleteModal(startIndex + index)}
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
              <p className="text-lg font-semibold mb-4">Are you sure you want to delete this supplier?</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}


      {/* Pagination */}
    {totalPages >= 1 && (
        <div className="flex flex-col sm:flex-row sm:justify-between items-center mt-4 gap-4">
            
            {/* Left side: Prev and First */}
            <div className="flex gap-2">
            <button
                onClick={goToFirst}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50"
            >
                ⬅ First
            </button>
            <button
                onClick={goToPrev}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50"
            >
                ⬅ Prev
            </button>
            </div>

            {/* Center: Current page info */}
            <div className="text-center font-semibold">
            Page {currentPage} of {totalPages}
            </div>

            {/* Right side: Next and Last */}
            <div className="flex gap-2">
            <button
                onClick={goToNext}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50"
            >
                Next ➡
            </button>
            <button
                onClick={goToLast}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50"
            >
                Last ➡
            </button>
            </div>

        </div>
        )}

    </div>
  );
}
