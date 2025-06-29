import React, { useState } from 'react'
import ShowCustomerDetailsModal from '../../component/guide/ShowCustomerDetails'

export default function ViewCustomers() {
  const [showCustomerDetails, setShowCustomerDetails] = useState(false)
  const [pageSize, setPageSize] = useState(10)

  const customer = {
    firstName: "Shubham",
    middleName: "Kumar",
    lastName: "Maurya",
    contact: "9936524554",
    email: "shubham@example.com",
    address: "Thane, Maharashtra",
    registrationDate: "2024-01-15"
  };

  return (
    <div className="px-4">
      <h2 className="text-2xl font-bold text-black mb-4">My Customers</h2>
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-4 gap-4">
        
        <div className="flex flex-wrap gap-2 items-center text-sm">
          <label className="text-black font-medium">Show</label>
          <select 
            className="border px-2 py-1 rounded text-black"
            value={pageSize}
            onChange={(e) => setPageSize(e.target.value)}
          >
            <option className='text-black'  value={5}>5</option>
            <option className='text-black' value={10} selected>10</option>
            <option className='text-black' value={25}>25</option>
            <option className='text-black' value={50}>50</option>
          </select>

          <input type="date" className="border text-black px-2 py-1 rounded" placeholder="From Date" />
          <input type="date" className="border text-black px-2 py-1 rounded" placeholder="To Date" />
          <input type="text" placeholder="Search" className="border text-black px-2 py-1 rounded" />
          <button className="bg-blue-600 text-white px-3 py-1 rounded">Search</button>
        </div>
      </div>

      <div>
        <table className="w-full border shadow-md text-sm sm:text-base">
          <thead className="bg-gray-500 text-white">
            <tr>
              <th className="border px-4 py-2  text-black">Sr. No.</th>
              <th className="border px-4 py-2 text-black">Name</th>
              <th className="border px-4 py-2 text-black">Role</th>
              <th className="border px-4 py-2 text-black">Username</th>
              <th className="border px-4 py-2 text-black">Contact</th>
              <th className="border px-4 py-2 text-black">Customer Registration Date</th>
              <th className="border px-4 py-2 text-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2 text-center text-black">1</td>
              <td className="border px-4 py-2 text-center text-black">Shubham Maurya</td>
              <td className="border px-4 py-2 text-center text-black">Customer</td>
              <td className="border px-4 py-2 text-center text-black">shubhammaurya</td>
              <td className="border px-4 py-2 text-center text-black">9936534556</td>
              <td className="border px-4 py-2 text-center text-black">2024-01-15</td>
              <td className="border px-4 py-2 text-center text-black">
                <button
                  onClick={() => setShowCustomerDetails(true)}
                  className="text-blue-600 hover:underline"
                >
                  View
                </button>
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2 text-center text-black">2</td>
              <td className="border px-4 py-2 text-center text-black">Aniket</td>
              <td className="border px-4 py-2 text-center text-black">Guide</td>
              <td className="border px-4 py-2 text-center text-black">aniket</td>
              <td className="border px-4 py-2 text-center text-black">7976533456</td>
              <td className="border px-4 py-2 text-center text-black">2024-02-10</td>
              <td className="border px-4 py-2 text-center  text-gray-400">—</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Modal for Customer Details */}
      {showCustomerDetails && (
        <ShowCustomerDetailsModal
          isOpen={true}
          onClose={() => setShowCustomerDetails(false)}
          customer={customer}
        />
      )}
    </div>
  );
}
