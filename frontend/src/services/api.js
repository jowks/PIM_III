import axios from "axios";

const { protocol, hostname } = window.location;

const api = axios.create({
  baseUrl: `${protocol}//${hostname}:3001`,
});

export default api;
