import axios from "./index";

class PersApi {

  static getUsers = () => {
    return axios.get(`api/users`);
  };

  static getAll = () => {
    return axios.get(`${base}`);
  };

  static getAllDemandes = () => {
    return axios.get(`api/users/demandes`);
  };

  static validateStatus = (validate, id) => {
    if(validate) return axios.get(`api/users/validate/${id}`);
    else return axios.get(`api/users/unvalidate/${id}`);
  };

  static unValidateStatus = (id) => {
    return axios.get(`api/users/unvalidate/${id}`);
  };

  static add = (data) => {
    return axios.post(`${base}`, data);
  };

  static delete = (id) => {
    return axios.delete(`${base}/${id}`);
  };

  static update = (data,id) => {
    return axios.put(`api/uusers/${id}`, data);
    // return axios.put(`${base}/${id}`, data);
  };
}

// let base = "api/users";
let base = "api/personnels";

export default PersApi;
