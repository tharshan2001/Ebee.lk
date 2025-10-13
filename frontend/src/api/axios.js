import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8001/api", // backend URL
  withCredentials: true, // send/receive cookies
});

export default api;
