import axios from "axios";
import { loginSuccess, logout } from "../reducers/authSlice";



export const loginUser = (username, password, role, navigate) => async(dispatch) => {
    console.log("api called");
    try {
        const response = await axios.post('https://localhost:7217/api/Auth/login', {username :username, password:password, userType:role})
        console.log(response.data);
        if(response.data.statusCode === 200){
            const {token} = response.data.data
            console.log(token);
            dispatch(loginSuccess({
                accessToken: token,
                userRole: role,
                user:{username}
            }))
            if (role === "Customer") navigate("/customer",{ replace: true });
            else if (role === "Guide") navigate("/guide",{ replace: true });
            else if (role === "Educator") navigate("/erp-dashboard");
            else if (role === "Mentor");
        }
    } catch (error) {
        console.log('login fail', error)
    }
}

export const erpLogin = (username, password, navigate) => async (dispatch) => {
    try {
        const response = await axios.post('https://localhost:7217/api/Auth/ErpLogin', {username:username, password:password,userType:"AdminUser"})
        if(response.status === 200){
            const {token, role} = response.data.data
            dispatch(loginSuccess({
                accessToken: token,
                userRole: role,
                user: {username}
            }))
            console.log(role);
            if(role === 'SuperAdmin'){
                navigate('/superadmin-dashboard',{replace: true})
            }else if(role === 'Admin'){
                navigate('/admin', {replace: true})
            }
        }
    } catch (error) {
        console.log('ERP login fail', error) 
    }
}

export const logoutUser = (navigate) => async (dispatch) => {
    try {
        const response = await axios.post('')
        if(response.status === 200){
            dispatch(logout())
            navigate('/', {replace: true})
        }
    } catch (error) {
        console.log('logout fail', error)
    }
}