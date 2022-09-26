import axios from "./index";

class PersApi {
  static getAll = () => {
    return axios.get(`${base}`);
  };

  static add = (data) => {
    return axios.post(`${base}`, data);
  };

  static delete = (id) => {
    return axios.delete(`${base}/${id}`);
  };

  static update = (data,id) => {
    return axios.put(`${base}/${id}`, data);
    // return axios.put(`${base}/${id}`, data);
  };
}

// let base = "api/users";
let base = "api/personnels";

export default PersApi;
