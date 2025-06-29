import React, { useState } from 'react';

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Function to evaluate password strength
  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[\W_]/.test(password)) strength++;

    switch (strength) {
      case 0:
      case 1: return { label: "Weak", color: "bg-red-500" };
      case 2: return { label: "Fair", color: "bg-yellow-500" };
      case 3: return { label: "Good", color: "bg-blue-500" };
      case 4: return { label: "Strong", color: "bg-green-600" };
      default: return { label: "", color: "" };
    }
  };

  const handleUpdatePassword = () => {
    const validationErrors = {};
    if (!oldPassword) validationErrors.oldPassword = "Old password is required";
    if (!newPassword) validationErrors.newPassword = "New password is required";
    if (newPassword !== confirmPassword) validationErrors.confirmPassword = "Passwords do not match";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // ✅ Submit new password to backend
      console.log("Password updated successfully");
      alert("Password updated!");
    }
  };

  const strength = getPasswordStrength(newPassword);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-lg space-y-4">
      <h2 className="text-2xl font-bold text-center text-purple-700">Reset Password</h2>

      {/* Old Password */}
      <div>
        <label className="block font-semibold mb-1">Old Password</label>
        <input
          type={showPassword ? "text" : "password"}
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className={`w-full px-4 py-2 border text-black  rounded ${errors.oldPassword ? "border-red-500" : ""}`}
          placeholder="Enter old password"
          
        />
        {errors.oldPassword && <p className="text-sm text-red-500 mt-1">{errors.oldPassword}</p>}
      </div>

      {/* New Password */}
      <div>
        <label className="block font-semibold mb-1">New Password</label>
        <input
          type={showPassword ? "text" : "password"}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className={`w-full px-4 py-2 border text-black rounded ${errors.newPassword ? "border-red-500" : ""}`}
          placeholder="Enter new password"
        />
        <div className="h-2 mt-1 rounded w-full bg-gray-200">
          <div className={`h-full ${strength.color} rounded transition-all duration-300`} style={{ width: `${(strength.label === "Weak" ? 25 : strength.label === "Fair" ? 50 : strength.label === "Good" ? 75 : 100)}%` }}></div>
        </div>
        {newPassword && <p className="text-sm mt-1 font-medium text-gray-600">Strength: <span className={`text-${strength.color.split('-')[1]}-600`}>{strength.label}</span></p>}
        {errors.newPassword && <p className="text-sm text-red-500 mt-1">{errors.newPassword}</p>}
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block font-semibold mb-1">Confirm New Password</label>
        <input
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={`w-full px-4 py-2 border text-black rounded ${errors.confirmPassword ? "border-red-500" : ""}`}
          placeholder="Re-enter new password"
        />
        {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>}
      </div>

      {/* Show Password Toggle */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
        />
        <label className="text-sm font-medium text-gray-700">Show Password</label>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleUpdatePassword}
        className="w-full bg-purple-600 text-white font-semibold py-2 rounded hover:bg-purple-700 transition"
      >
        Update Password
      </button>
    </div>
  );
}
