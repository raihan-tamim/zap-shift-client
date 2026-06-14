import axios from "axios";


const axiosInstance = axios.create({
    baseURL: "https://zap-shift-server-smoky.vercel.app"
})

const useAxiosInstance = () => {
    return axiosInstance
};

export default useAxiosInstance;