import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import CustomerDashboard from "./pages/customer/customerDashboard";
import ERPLogin from "./pages/auth/erpLogin";
import Header from "./pages/global/Header";
import Footer from "./pages/global/Footer";
import GuideDashboard from "./pages/guide/GuideDashboard";
import UnitEntryPage from "./component/unitEntryPage";
import ProductCategoryEntryPage from "./component/productCategoryEntryPage";
import ProductEntryPage from "./component/productEntryPage";
import SupplierEntryPage from "./component/supplierEntryPage";
import ViewDetails from "./pages/customer/ViewDetails";
import UpdateDetails from "./pages/customer/UpdateCustomerDetails";
import Reports from "./pages/customer/Reports";
import ViewCustomers from "./pages/guide/ViewCustomers";
import ChangePassword from "./pages/customer/ChangePassword";
import AddCustomer from "./pages/guide/AddCustomer";
import ChangeGuidePassword from "./pages/guide/ChangeGuidePassword";
import ViewGuideDetails from "./pages/guide/ViewGuideDetails";
import ErpDashboard from "./pages/erp/ErpDashboard";
import ErpAccount from "./pages/erp/ErpAccount";
import ErpMaster from "./pages/erp/ErpMaster";
import ErpTransaction from "./pages/erp/ErpTransaction";
import ErpReport from "./pages/erp/ErpReport";
import Unauthorized from "./pages/global/Unauthorized";
import RoleProtectedRoute from "./pages/global/RoleProtectedRoute";
import UpdateGuideDetails from "./pages/guide/UpdateGuideDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/erp-login" element={<ERPLogin />} />

        // handling unknow url
        <Route path="*" element={<Navigate to="/" />} />

        <Route path="/master/add-unit" element={<UnitEntryPage />} />
        <Route path="/master/add-category"  element={<ProductCategoryEntryPage />}/>
        <Route path="/master/add-product" element={<ProductEntryPage />} />
        <Route path="/master/add-supplier" element={<SupplierEntryPage />} />

        {/* Redirect /customer to /customer/view-details */}
        <Route
          path="/customer"
          element={<Navigate to="/customer/view-details" replace />}
        />
        <Route
          path="/customer/*"
          element={
            <RoleProtectedRoute allowedRoles={["Customer"]}>
              <>
                <Header />
                <CustomerDashboard />
                <Footer />
              </>
            </RoleProtectedRoute>
          }
        >
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="view-details" element={<ViewDetails />} />
          <Route path="update-details" element={<UpdateDetails />} />
          <Route path="reports" element={<Reports />} />
        </Route>


        <Route
          path="/guide"
          element={<Navigate to="/guide/view-customer" replace />}
        />
        <Route
          path="/guide/*"
          element={
            <RoleProtectedRoute allowedRoles={['Guide']}>
              <>
                <Header />
                <GuideDashboard />
                <Footer />
              </>
            </RoleProtectedRoute>
          }
        >
          <Route path="view-customer" element={<ViewCustomers />} />
          <Route path="view-details" element={<ViewGuideDetails />} />
          <Route path="change-password" element={<ChangeGuidePassword />} />
          <Route path="add-customer" element={<AddCustomer />} />
          <Route path="update-details" element={<UpdateGuideDetails/>} />
        </Route>

        <Route
          path="/erp"
          element={<Navigate to="/erp/master" replace />}
        />
        <Route
          path="/erp/*"
          element={
           <RoleProtectedRoute allowedRoles={['erp']}>
              <>
              <Header />
              <ErpDashboard />
              <Footer />
            </>
           </RoleProtectedRoute>
          }
        >
          <Route path="account" element={<ErpAccount />} />
          <Route path="master" element={<ErpMaster />} />
          <Route path="transaction" element={<ErpTransaction />} />
          <Route path="report" element={<ErpReport />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
