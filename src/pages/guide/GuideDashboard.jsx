import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const GuideDashboard = () => {
  return (
    <div className="flex  min-h-screen text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-purple-500 p-6">
        <h2 className="text-black text-2xl font-bold mb-6">WELCOME [customer name]</h2>
        <nav className="flex flex-col space-y-4">
          <NavLink to="/guide/change-password" className="block hover:text-purple-400">Change Password</NavLink>
          <NavLink to="/guide/add-customer" className="block hover:text-purple-400">Add Customer</NavLink>
          <NavLink to="/guide/view-customer" className="block hover:text-purple-400">View My Customer</NavLink>
          <NavLink to="/guide/view-details" className="block hover:text-purple-400">View My Details</NavLink>
          <NavLink to="/guide/update-details" className="block hover:text-purple-400">Update My Details</NavLink>
          <NavLink to="/guide/report" className="block hover:text-purple-400">Reports</NavLink>

        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl text-black font-bold mb-4">Guide Dashboard</h1>
        <Outlet />
      </main>
    </div>
  );
};

export default GuideDashboard;