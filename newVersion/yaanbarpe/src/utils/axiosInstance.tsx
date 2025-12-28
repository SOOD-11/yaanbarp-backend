import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "https://yaanbarpe-backend.onrender.com/api/v1", // Replace with your backend URL
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // if you need to send cookies
});

export default axiosInstance;