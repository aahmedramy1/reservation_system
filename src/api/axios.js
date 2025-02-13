import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: {
    Authorization: `Bearer ${process.env.VUE_APP_AUTH_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export default api;
