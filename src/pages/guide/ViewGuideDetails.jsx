import React from 'react'

export default function ViewGuideDetails() {
  return (
     <div className="p-4">
      <p className="text-2xl text-black font-semibold mb-4 text-center sm:text-left">My Details</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white shadow-lg shadow-gray-400 rounded-lg p-6 transition-transform hover:scale-105">
          <p className="text-lg font-bold text-gray-800 mb-2">Name: Aniket</p>
          <p className="text-gray-700">Role: Guide</p>
          <p className="text-gray-700">Username: username</p>
          <p className="text-gray-700">Email: hello@gmail.com</p>
          <p className="text-gray-700">Address: Thane, Maharashtra</p>
          <p className="text-gray-700">Contact: 9936524554</p>
        </div>
      </div>
    </div>
  )
}
