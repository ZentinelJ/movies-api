import axios from "axios";

// La URL viene de frontend/.env; si no existe, usa la API local
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
});

export default api;
