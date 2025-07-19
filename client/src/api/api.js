import axios from "axios";

const api = axios.create({
    baseURL : 'http://localhost:6000/api',  // ✅ fixed here
    withCredentials: true,
});

export default api;
