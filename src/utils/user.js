import axios from "./index";

class UserApi {
  static getAll = () => {
    return axios.get(`${base}`);
  };

  static add = (data) => {
    return axios.post(`${base}/register`, data);
  };

  static delete = (id) => {
    return axios.delete(`${base}/${id}`);
  };

  static update = (data,id) => {
    return axios.put(`${base}/${id}`, data);
    // return axios.put(`${base}/${id}`, data);
  };
}

let base = "api/users";

export default UserApi;
