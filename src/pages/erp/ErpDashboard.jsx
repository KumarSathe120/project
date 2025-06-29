import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function ErpDashboard() {
  return (
     <div className="flex  min-h-screen text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-purple-500 p-6">
        <h2 className="text-black text-2xl font-bold mb-6">WELCOME [erp name]</h2>
        <nav className="flex flex-col space-y-4">
            <NavLink to={'/erp-dashboard/master'} className="block hover:text-purple-400">Master</NavLink>
            <NavLink to={'/erp-dashboard/account'} className="block hover:text-purple-400">Account</NavLink>
            <NavLink to={'/erp-dashboard/transaction'} className="block hover:text-purple-400" >Transaction</NavLink>
            <NavLink to={'/erp-dashboard/report'} className="block hover:text-purple-400">Report</NavLink>
        </nav>
      </aside>

       <main className="flex-1 p-10">
        <h1 className="text-3xl text-black font-bold mb-8">ERP Dashboard</h1>
        <Outlet />
      </main>
    </div>
  )
}
