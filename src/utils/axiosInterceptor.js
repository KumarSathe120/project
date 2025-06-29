import axios from "axios";
import { store } from "../redux/store";

const axiosInstance = axios.create({
    baseURL: ''
})

axiosInstance.interceptors.request.use(
    (config) => {
        let token = store.getState().auth.accessToken
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    },
    (error) => Promise.reject(error)
)

export default axiosInstance
    

