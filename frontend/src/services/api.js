import axios from "axios";

const { protocol, hostname } = window.location;
const url = `${protocol}//${hostname}:3001`;

export default axios.create({
  baseURL: url,
});
