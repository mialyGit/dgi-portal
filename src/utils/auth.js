import axios from "./index";

class AuthApi {
  static Login = (data) => {
    return axios.post(`${base}/login`, data);
  };

  static Activate = (isContribuable,data) => {
    if(isContribuable) return axios.post(`${base}/activate/cont`, data);
    else return axios.post(`${base}/activate/pers`, data);
  };

  static Register = (data) => {
    return axios.post(`${base}/register`, data);
  };

  static Logout = (data) => {
    return axios.post(`${base}/logout`, data, {
      headers: { Authorization: `Bearer ${data.token}` },
    });
  };
}

let base = "api/users";

export default AuthApi;
