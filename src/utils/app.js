import axios from "./index";

class AppApi {
  static getAll = () => {
    return axios.get(`${base}`);
  };

  static delete = (id) => {
    return axios.delete(`${base}/${id}`);
  };

  static update = (id, data) => {
    return axios.post(`${base}/${id}?_method=PUT`, data);
  };

  static add = (data) => {
    return axios.post(`${base}`, data);
  };
}

let base = "api/applications";

export default AppApi;
