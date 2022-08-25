import Axios from "axios";
import { API_SERVER } from "../config/constant";
// import swal from "sweetalert2";

const user = JSON.parse(localStorage.getItem("user"));
const token = user !== null ? user.token : "";
const axios = Axios.create({
  baseURL: `${API_SERVER}`,
  headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
});

/*axios.interceptors.request.use(
  (config) => {
    // trigger 'loading=true' event here
    // if (config.url !== `/sanctum/csrf-cookie`) {
    swal.fire({
      title: "Veuillez patientez",
      imageUrl: `${API_SERVER}loading2.gif`,
      imageWidth: 50,
      imageHeight: 50,
      imageAlt: "Attendre",
      allowOutsideClick: false,
      showConfirmButton: false,
    });
    // }
    return config;
  },
  (error) => {
    // trigger 'loading=false' event here
    swal.close();
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    // trigger 'loading=false' event here
    swal.close();
    return response;
  },
  (error) => {
    // trigger 'loading=false' event here
    swal.close();
    return Promise.reject(error);
  }
);*/

export default axios;
