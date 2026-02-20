import axios from "axios"
// Create an instance of axios with default configuration
 const axiosInstance = axios.create({
    baseURL: "http://localhost:5001/api", // Set the base URL for all requests

 })

 export default axiosInstance