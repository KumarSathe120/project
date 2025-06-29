//  Example: customer dashboard internal routing
import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import ViewDetails from "./customer/ViewDetails";
import UpdateDetails from "./customer/UpdateDetails";
import Reports from "./customer/Reports";

export default function CustomerDashboard() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-1/4 bg-purple-700 text-white p-6">
        <nav className="flex flex-col space-y-4">
          <NavLink to="view-details" className={({ isActive }) => isActive ? "font-bold" : ""}>View My Details</NavLink>
          <NavLink to="update-details" className={({ isActive }) => isActive ? "font-bold" : ""}>Update My Details</NavLink>
          <NavLink to="reports" className={({ isActive }) => isActive ? "font-bold" : ""}>Reports</NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Routes>
          <Route path="view-details" element={<ViewDetails />} />
          <Route path="update-details" element={<UpdateDetails />} />
          <Route path="reports" element={<Reports />} />
        </Routes>
      </main>
    </div>
  );
}
