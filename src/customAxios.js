import axios from "axios";

const customAxios = axios.create({
  baseURL: "http://localhost:3000/",
});

customAxios.interceptors.request.use(
  async (config) => {
    const user = localStorage.getItem("user");
    const token = user?.accessToken;
    if (token) {
      config.headers.authorization = `bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default customAxios;
