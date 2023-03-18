import axios from "./index";

class PrivilegeApi {
  static getAll = () => {
    return axios.get(`${base}`);
  };

  static get = (id) => {
    return axios.get(`${base}/${id}`);
  };

  static add = (data) => {
    return axios.post(`${base}`, data);
  };

  static delete = (id) => {
    return axios.delete(`${base}/${id}`);
  };

  static update = (data) => {
    return axios.post(`api/update_user_privilege_apps`, data);
  };
}
let base = "api/user_privilege_apps";

export default PrivilegeApi;
