import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ErpMaster() {
  const navigate = useNavigate();

  const options = [
    { title: 'Add Unit', route: '/master/add-unit', color: 'bg-blue-500' },
    { title: 'Add Product', route: '/master/add-product', color: 'bg-green-500' },
    { title: 'Add Category', route: '/master/add-category', color: 'bg-purple-500' },
    { title: 'Add Supplier', route: '/master/add-supplier', color: 'bg-red-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 ">ERP Master</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {options.map((item, index) => (
          <div
            key={index}
            className={`cursor-pointer rounded-lg shadow-lg text-white p-6 text-center font-semibold hover:scale-105 transform transition duration-300 ${item.color}`}
            onClick={() => navigate(item.route)}
          >
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
}
