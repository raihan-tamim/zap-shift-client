import axios from 'axios';
import { useEffect } from 'react';
import UseAuth from './UseAuth';
import { useNavigate } from 'react-router';


const axiosSecure = axios.create({
    baseURL: "https://zap-shift-server-smoky.vercel.app"
})

const useAxiosSecure = () => {
    const {user,logOut} = UseAuth();
    const navigate = useNavigate()

    useEffect(()=>{
        // intercept req
        const reqInterceptor = axiosSecure.interceptors.request.use(config=>{
            config.headers.Authorization = `Bearer ${user?.accessToken}`
            return config;
        })

        // intercept res
        const resInterceptor = axiosSecure.interceptors.response.use((response)=>{
            return response;
        },(error)=>{
            console.log(error);
            const statusCode = error.status;
            if(statusCode === 401 || statusCode === 403){
                logOut()
                .then(()=>{
                    navigate('/login')
                })
            }
            return Promise.reject(error)
        })
        return ()=>{
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor);
        }
    },[user, logOut, navigate])

    return axiosSecure;
};

export default useAxiosSecure;