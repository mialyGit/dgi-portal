import axios from "./index";

class AutreApi {
  
  static getPrivileges = () => {
    return axios.get(`api/privileges`);
  };

  static getServices = () => {
    return axios.get(`api/services`);
  };

  static getGrades = () => {
    return axios.get(`api/grades`);
  };

  static getFonctions = () => {
    return axios.get(`api/fonctions`);
  };

  

  static addPrivilege = (data) => {
    return axios.post(`api/privileges`, data);
  };

  static addService = (data) => {
    return axios.post(`api/services`, data);
  };

  static addGrade = (data) => {
    return axios.post(`api/grades`, data);
  };

  static addFonction = (data) => {
    return axios.post(`api/fonctions`, data);
  };



  static deletePrivilege = (id) => {
    return axios.delete(`api/privileges/${id}`);
  };

  static deleteFonction = (id) => {
    return axios.delete(`api/fonctions/${id}`);
  };

  static deleteGrade= (id) => {
    return axios.delete(`api/grades/${id}`);
  };

  static deleteService = (id) => {
    return axios.delete(`api/services/${id}`);
  };



  static updatePrivilege = (data,id) => {
    return axios.put(`api/privileges/${id}`, data);
  };

  static updateService = (data,id) => {
    return axios.put(`api/services/${id}`, data);
  };

  static updateGrade = (data,id) => {
    return axios.put(`api/grades/${id}`, data);
  };

  static updateFonction = (data,id) => {
    return axios.put(`api/fonctions/${id}`, data);
  };
}

export default AutreApi;
