import axios, { AxiosInstance } from "axios";
import { API_BASE_URL } from "../config/config";

const http: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export default http;
