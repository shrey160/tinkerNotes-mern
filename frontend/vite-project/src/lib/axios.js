import axios from "axios"
// Create an instance of axios with default configuration
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api"
 const axiosInstance = axios.create({
    baseURL: BASE_URL, // Set the base URL for all requests

 })

 // if in development mode, start front end server separately
 

 export default axiosInstance