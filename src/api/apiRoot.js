import axios from "axios";

const apiRoot = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 10000,
});

export { apiRoot };
