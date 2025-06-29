import React from "react";
import { NavLink,Outlet  } from "react-router-dom";

const CustomerDashboard = () => {
  return (
    <div className="flex   min-h-screen text-white">
      <aside className="w-64 bg-purple-500 p-6">
        <h2 className="text-black text-2xl font-bold mb-6">WELCOME [customer name]</h2>
        <nav className="flex flex-col space-y-4">
           <NavLink to="/customer/change-password"  className={({ isActive }) => isActive ? "text-purple-400 font-bold" : "hover:text-purple-300"}>Change Password</NavLink>
           <NavLink to="/customer/view-details"  className={({ isActive }) => isActive ? "text-purple-400 font-bold" : "hover:text-purple-300"}>View My Details</NavLink>
           <NavLink to="/customer/update-details"  className={({ isActive }) => isActive ? "text-purple-400 font-bold" : "hover:text-purple-300"}>Update My Details</NavLink>
           <NavLink to="/customer/reports"  className={({ isActive }) => isActive ? "text-purple-400 font-bold" : "hover:text-purple-300"}>My Bills</NavLink>
        </nav>
      </aside>

           <main className="flex-1 p-6">
              <h1 className="text-3xl text-black font-bold mb-8">Customer Dashboard</h1>
               <Outlet />
           </main>
    </div>
  );
};

export default CustomerDashboard;