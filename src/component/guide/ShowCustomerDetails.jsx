import React, { useRef , useEffect} from 'react';

export default function ShowCustomerDetailsModal({ isOpen, onClose, customer }) {
   const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

   if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div ref={modalRef} className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4 text-purple-700">Customer Details</h2>

        <div className="space-y-2 text-gray-800">
          <p><strong>Customer Name:</strong> {customer.firstName} {customer.middleName} {customer.lastName}</p>
          {/* <p><strong>Middle Name:</strong> {customer.middleName}</p>
          <p><strong>Last Name:</strong> {customer.lastName}</p> */}
          <p><strong>Contact Number:</strong> {customer.contact}</p>
          <p><strong>Email:</strong> {customer.email}</p>
          <p><strong>Address:</strong> {customer.address}</p>
        </div>
      </div>
    </div>
  );
}
