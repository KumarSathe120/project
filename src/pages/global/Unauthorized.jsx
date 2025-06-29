import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const Unauthorized = () => {
    const userRole = useSelector((state) => state.auth.userRole)


    if(userRole){
        return <Navigate to={`/${userRole}`} replace />;
    }
    
 return (
   <div className="text-center mt-20">
    <h1 className="text-3xl font-bold text-red-600">403 - Unauthorized</h1>
    <p className="text-lg mt-4">You don’t have permission to access this page.</p>
  </div>
 )
};
export default Unauthorized;
