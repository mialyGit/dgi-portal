import axios from "./index";

class ContApi {
  static getAll = () => {
    return axios.get(`${base}`);
  };

  static getAllDemandes = () => {
    return axios.get(`api/users/demandes`);
  };

  static getAllHistoriques = () => {
    return axios.get(`api/users/historiques`);
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

  static clearHistory = () => {
    return axios.delete(`api/historiques_all`);
    // return axios.put(`${base}/${id}`, data);
  };
}

// let base = "api/users";
let base = "api/contribuables";

export default ContApi;
