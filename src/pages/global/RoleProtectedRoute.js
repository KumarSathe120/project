import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RoleProtectedRoute = ({allowedRoles, children}) => {
    let token = useSelector((state) => state.auth.accessToken)
    let userRole = useSelector((state) => state.auth.userRole)

    console.log(token,userRole)
    if(!token) return <Navigate to="/" replace />
    if (!allowedRoles.includes(userRole)) return <Navigate to="/unauthorized" replace />;

    return children
}


export default RoleProtectedRoute;