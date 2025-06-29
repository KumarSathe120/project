import React, { useEffect, useState } from 'react';

export default function UpdateCustomerDetails() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    address: '',
    contact: '',
  });

  const [originalData, setOriginalData] = useState({});
  const [isUpdated, setIsUpdated] = useState(false);

  // Simulate API call
  useEffect(() => {
    const fetchUserDetails = async () => {
      // Replace with actual API call
      const userDetails = {
        name: 'Shubham Maurya',
        username: 'username',
        email: 'hello@gmail.com',
        address: 'Thane, Maharashtra',
        contact: '9936524554',
      };
      setFormData(userDetails);
      setOriginalData(userDetails);
    };
    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    setIsUpdated(true);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    // Replace with actual API update call
    alert('Information updated successfully!');
    setOriginalData(formData);
    setIsUpdated(false);
  };

  const isFormChanged = JSON.stringify(formData) !== JSON.stringify(originalData);

  return (
    <div className="p-4">
      <p className="text-2xl text-black font-semibold mb-6 text-center sm:text-left">
        Update My Details
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="border text-black rounded px-4 py-2 w-full"
        />
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="border text-black rounded px-4 py-2 w-full"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="border text-black rounded px-4 py-2 w-full"
        />
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          placeholder="Contact Number"
          className="border text-black rounded px-4 py-2 w-full"
        />
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          className="border text-black rounded px-4 py-2 w-full resize-none col-span-1 sm:col-span-2"
        />

        <button
          disabled={!isFormChanged}
          onClick={handleUpdate}
          className={`w-full py-2 mt-4 rounded text-white font-semibold transition ${
            isFormChanged ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-400 cursor-not-allowed'
          } col-span-1 sm:col-span-2`}
        >
          Update Details
        </button>
      </div>
    </div>
  );
}


