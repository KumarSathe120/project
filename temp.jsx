// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import ViewDetails from "./pages/customer/ViewDetails";
import UpdateCustomer from "./pages/customer/UpdateDetails";
import CustomerReports from "./pages/customer/Reports";

import GuideDashboard from "./pages/guide/GuideDashboard";
import ViewCustomers from "./pages/guide/ViewCustomers";
import AddCustomer from "./pages/guide/AddCustomer";
import UpdateGuide from "./pages/guide/UpdateDetails";
import GuideReports from "./pages/guide/Reports";

function App() {
  return (
    <Router>
      <Routes>
        {/* Customer Routes */}
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/customer/view-details" element={<ViewDetails />} />
        <Route path="/customer/update-details" element={<UpdateCustomer />} />
        <Route path="/customer/reports" element={<CustomerReports />} />

        {/* Guide Routes */}
        <Route path="/guide/dashboard" element={<GuideDashboard />} />
        <Route path="/guide/view-customers" element={<ViewCustomers />} />
        <Route path="/guide/add-customer" element={<AddCustomer />} />
        <Route path="/guide/update-details" element={<UpdateGuide />} />
        <Route path="/guide/reports" element={<GuideReports />} />
      </Routes>
    </Router>
  );
}

export default App;

// components/Sidebar.jsx
import { Link } from "react-router-dom";

const Sidebar = ({ role }) => {
  return (
    <div className="w-60 bg-black text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      {role === "customer" ? (
        <>
          <Link to="/customer/view-details" className="block mb-2">View My Details</Link>
          <Link to="/customer/update-details" className="block mb-2">Update My Details</Link>
          <Link to="/customer/reports" className="block mb-2">Reports</Link>
        </>
      ) : role === "guide" ? (
        <>
          <Link to="/guide/view-customers" className="block mb-2">View My Customers</Link>
          <Link to="/guide/add-customer" className="block mb-2">Add Customer</Link>
          <Link to="/guide/update-details" className="block mb-2">Update My Details</Link>
          <Link to="/guide/reports" className="block mb-2">Reports</Link>
        </>
      ) : null}
    </div>
  );
};

export default Sidebar;

// pages/customer/CustomerDashboard.jsx
const CustomerDashboard = () => <h1>Customer Dashboard</h1>;
export default CustomerDashboard;

// pages/customer/ViewDetails.jsx
const ViewDetails = () => <h1>View My Details</h1>;
export default ViewDetails;

// pages/customer/UpdateDetails.jsx
const UpdateCustomer = () => <h1>Update My Details</h1>;
export default UpdateCustomer;

// pages/customer/Reports.jsx
const CustomerReports = () => <h1>Customer Reports</h1>;
export default CustomerReports;

// pages/guide/GuideDashboard.jsx
const GuideDashboard = () => <h1>Guide Dashboard</h1>;
export default GuideDashboard;

// pages/guide/ViewCustomers.jsx
const ViewCustomers = () => <h1>View My Customers</h1>;
export default ViewCustomers;

// pages/guide/AddCustomer.jsx
const AddCustomer = () => <h1>Add Customer</h1>;
export default AddCustomer;

// pages/guide/UpdateDetails.jsx
const UpdateGuide = () => <h1>Update My Details</h1>;
export default UpdateGuide;

// pages/guide/Reports.jsx
const GuideReports = () => <h1>Guide Reports</h1>;
export default GuideReports;
