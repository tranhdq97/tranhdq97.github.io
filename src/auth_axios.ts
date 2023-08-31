import axios, { AxiosInstance } from "axios";

// Authenticated Axios Configurations
const authAxios: AxiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://dongquoctranh.pythonanywhere.com/api/"
      : "http://127.0.0.1:8009/api/",
  timeout: 5000,
});

export default authAxios;
