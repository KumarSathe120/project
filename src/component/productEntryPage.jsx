import React, { useState } from 'react';

export default function ProductEntryPage() {
  const [categoryList, setCategoryList] = useState(["Electronics", "Grocery", "Clothing"]);
  const [unitList, setUnitList] = useState(["KG", "Gram", "Liter"]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [unit, setUnit] = useState("")
  const [productDescription, setProductDescription] = useState("")
  const [openingStockQuantity, setOpeningStockQuantity] = useState(null)
  const [currentgStockQuantity, setCurrentStockQuantity] = useState(null)
  const [productList, setProductList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState({});

  const [searchQuery, setSearchQuery] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState('')
  const [deleteIndex, setDeleteIndex] = useState('')

  const handleAddProduct = () => {
    let errorMessage = {}
    if(!productName) errorMessage.productName = 'required'
    if(!selectedCategory) errorMessage.selectedCategory = 'required'
    if(!unit) errorMessage.unit = 'required'
    if(!productDescription) errorMessage.productDescription = 'required'
    if(!openingStockQuantity) errorMessage.openingStockQuantity = 'required'
    if(!currentgStockQuantity) errorMessage.currentgStockQuantity = 'required'
    setError(errorMessage)

    if(Object.keys(errorMessage).length === 0){
        const newProduct = { 
          category: selectedCategory, 
          name: productName, 
          unit: unit, 
          description: productDescription,
          openStock: openingStockQuantity,
          currentStock: currentgStockQuantity
        };

        if (editIndex !== null) {
          const updatedList = [...productList];
          updatedList[editIndex] = newProduct;
          setProductList(updatedList);
          setEditIndex(null);
        } else {
          setProductList([...productList, newProduct]);
        }

        setSelectedCategory("");
        setProductName("");
        setUnit('')
        setProductDescription('')
        setOpeningStockQuantity('')
        setCurrentStockQuantity('')
        setError({})
    }
  };

  const handleEdit = (index) => {
    const product = productList[index];
    setError({})
    setSelectedCategory(product.category);
    setProductName(product.name);
    setUnit(product.unit)
    setProductDescription(product.description)
    setOpeningStockQuantity(product.openStock)
    setCurrentStockQuantity(product.currentStock)
    setEditIndex(index + (currentPage - 1) * itemsPerPage);
  };

  const handleDelete = () => {
    // const globalIndex = index + (currentPage - 1) * itemsPerPage;
    const updatedList = productList.filter((_, i) => i !== deleteIndex);
    setProductList(updatedList);
    setShowDeleteModal(false)
    setDeleteIndex(null)
  };

  const showModal = (index) => {
    setShowDeleteModal(true)
    setDeleteIndex(index)
  }

  const filteredProducts = productList.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const goToFirst = () => setCurrentPage(1);
  const goToLast = () => setCurrentPage(totalPages);
  const goToNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const goToPrev = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Product Entry</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className={`w-full border p-2 rounded ${error.selectedCategory ? 'border-red-500': ''}`}
        >
          <option value="">Select Category</option>
          {categoryList.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

       <div className="mb-4">
        <label className="block mb-1 font-medium">Unit</label>
        <select
             value={unit}
             onChange={(e) => setUnit(e.target.value)}
             className={`w-full border p-2 rounded ${error.unit ? 'border-red-500': ''}`}
        >
            <option value="">Select Unit</option>
            {unitList.map((u, index) => (
              <option key={index} value={u}>{u}</option>
            ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Product Name</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className={`w-full border p-2 rounded ${error.productName ? 'border-red-500': ''}`}
        />
      </div>
     
      <div className="mb-4">
        <label className="block mb-1 font-medium">Product Description</label>
        <textarea
          type="text"
          value={productDescription}
          cols={2}
          onChange={(e) => setProductDescription(e.target.value)}
          className={`w-full border p-2 rounded ${error.productDescription ? 'border-red-500': ''}`}
        />
      </div>
       <div className="mb-4">
        <label className="block mb-1 font-medium">Product Opening Stock</label>
        <input
          type="text"
          value={openingStockQuantity}
          onChange={(e) => setOpeningStockQuantity(e.target.value)}
          className={`w-full border p-2 rounded ${error.openingStockQuantity ? 'border-red-500': ''}`}
        />
      </div> 
      
      <div className="mb-4">
        <label className="block mb-1 font-medium">Product Current Stock</label>
        <input
          type="text"
          value={currentgStockQuantity}
          onChange={(e) => setCurrentStockQuantity(e.target.value)}
          className={`w-full border p-2 rounded ${error.currentgStockQuantity ? 'border-red-500': ''}`}
        />
      </div>
     

      <div className="flex justify-center mb-6">
        <button
          onClick={handleAddProduct}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          {editIndex !== null ? "Update Product" : "Add Product"}
        </button>
      </div>

      {/* Search & Show Entries */}
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
            placeholder="Search by Product Name"
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

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Sr. No.</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Product</th>
            <th className="border px-4 py-2">Unit</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                No products found.
              </td>
            </tr>
          ) : (
            currentProducts.map((product, index) => (
              <tr key={startIndex + index}>
                <td className="border px-4 py-2">{startIndex + index + 1}</td>
                <td className="border px-4 py-2">{product.category}</td>
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">{product.unit}</td>
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

      {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-md max-w-sm w-full text-center">
              <p className="text-lg font-semibold mb-4">Are you sure you want to delete this product?</p>
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

      {/* Pagination */}
      {totalPages >= 1 && (
        <div className="flex flex-col sm:flex-row sm:justify-between items-center mt-4 gap-4">
          {/* Left - Prev & First */}
          <div className="flex gap-2">
            <button
              onClick={goToPrev}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50"
            >
              ⬅ Prev
            </button>
            <button
              onClick={goToFirst}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50"
            >
              ⬅ First
            </button>
          </div>

          {/* Center - Current Page */}
          <div className="text-center font-semibold">
            Page {currentPage} of {totalPages}
          </div>

          {/* Right - Next & Last */}
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
