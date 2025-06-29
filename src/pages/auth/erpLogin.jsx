import React, { useState } from "react";
import { ImagePath } from "../../constant/ImagePath";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {loginSuccess} from '../../redux/reducers/authSlice'
import { erpLogin } from "../../redux/actions/loginActions";


function ERPLogin() {
  // const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    
    e.preventDefault();
    const validationErrors = {};
    if (!username) validationErrors.username = "Username is required.";
    if (!password) validationErrors.password = "Password is required.";
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      dispatch(erpLogin(username, password, navigate))
    //  dispatch(loginSuccess({
    //   accessToken: 'shubham',
    //   userRole: 'erp',
    //   user:{username}
    // }))
    //  navigate('/erp-dashboard', {replace : true})
    }
  };

  

  return (
   <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6 lg:p-8">
     <div className="bg-white rounded-3xl shadow-lg flex flex-col md:flex-row w-full max-w-5xl overflow-hidden">
        {/* Left section */}
        <div className="w-full md:w-1/2 p-8 sm:p-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-center md:text-left">Welcome To ERP</h2>
         <p className="text-gray-600 mb-8 text-center md:text-left">
            Hey, welcome back to your special place
          </p>

          <form onSubmit={handleSubmit}>
           
            <input
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              className={`w-full p-3 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                errors.username ? "border-red-500" : ""
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mb-2">{errors.username}</p>
            )}

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••••"
              className={`w-full p-3 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mb-2">{errors.password}</p>
            )}



            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
              onClick={handleSubmit}
            >
              Login
            </button>
          </form>
        </div>

        {/* Right Section - Illustration */}
        <div className="hidden md:flex items-center justify-center w-full md:w-1/2 bg-gradient-to-br from-purple-400 to-purple-600 p-6">
          <img
            src={ImagePath.login}
            alt="Login Illustration"
            className="object-contain h-full max-h-[500px]"
          />
        </div>
      </div>
    </div>
  );
}

export default ERPLogin;
