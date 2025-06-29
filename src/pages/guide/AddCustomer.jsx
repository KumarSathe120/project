import React, {useState} from 'react'

export default function AddCustomer() {
 const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    contact: '',
    email: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Perform validation or submission logic here
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8 ">
      <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">Customer Information Form</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
                First Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              required={true}
              onChange={handleChange}
              className="w-full border text-black border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter first name"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Middle Name</label>
            <input
              type="text"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              className="w-full border text-black border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter middle name"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Last Name <span className="text-red-600">*</span></label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              required={true}
              onChange={handleChange}
              className="w-full border text-black border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter last name"
            />
          </div>
        </div>

        {/* Contact & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Contact Number <span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required={true}
              className="w-full border text-black border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter contact number"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email ID <span className="text-red-600">*</span></label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required={true}
              className="w-full border text-black border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter email address"
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Address <span className="text-red-600">*</span></label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            className="w-full border text-black border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter address"
        
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}