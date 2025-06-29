import React, { useState } from "react";
import { ImagePath } from "../../constant/ImagePath";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../redux/reducers/authSlice";
import { useNavigate } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import { loginUser } from "../../redux/actions/loginActions";

function LoginPage() {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  // const userRole = useSelector(state => state.auth.userRole);
  // if (userRole) {
  //   // Already logged in, redirect
  //   return <Navigate to={`/${userRole}`} replace />;
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!role) validationErrors.role = "Please select a role.";
    if (!username) validationErrors.username = "Username is required.";
    if (!password) validationErrors.password = "Password is required.";
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {  
        dispatch(loginUser(username, password, role, navigate))
        // dispatch(loginSuccess({
        //     accessToken: 'shubhammaurya',
        //     userRole: role,
        //     user: {username}
        // }))
        //  if (role === "customer") navigate("/customer",{ replace: true });
        //   else if (role === "guide") navigate("/guide",{ replace: true });
        //   else if (role === "educator") navigate("/erp-dashboard");
        //   else if (role === "mentor") navigate("/erp-dashboard");
        //   else navigate("/unauthorized",{ replace: true });
    }
  };


  return (
     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-3xl shadow-lg flex flex-col md:flex-row w-full max-w-5xl overflow-hidden">
        <div className="w-full md:w-1/2 p-8 sm:p-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-center md:text-left">
            Hello, Welcome Back
          </h2>
          <p className="text-gray-600 mb-8 text-center md:text-left">
            Hey, welcome back to your special place
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label htmlFor="role" className="sr-only">
                Select Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.role ? "border-red-500" : ""
                }`}
              >
                <option value="">Select Role</option>
                <option value="Educator">Educator</option>
                <option value="Mentor">Mentor</option>
                <option value="Guide">Guide</option>
                <option value="Customer">Customer</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">{errors.role}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.username ? "border-red-500" : ""
                }`}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••••"
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out"
            >
              Log In
            </button>
          </form>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center justify-center w-full md:w-1/2 bg-gradient-to-br from-purple-400 to-purple-600 p-6">
          <img
            src={ImagePath.login}
            alt="Login Illustration"
            className="object-contain h-full max-h-[400px] lg:max-h-[500px]"
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
