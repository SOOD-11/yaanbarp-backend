import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL, // Replace with your backend URL
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // if you need to send cookies
});

export default axiosInstance;