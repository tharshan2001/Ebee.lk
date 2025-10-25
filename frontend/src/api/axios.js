import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8001/api",
  withCredentials: true, // crucial for cookies or JWTs in cookies
});

export default api;
