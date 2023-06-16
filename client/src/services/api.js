import axios from "axios";

const API_URL = "http://localhost:3001/api/v1/";

const getToken = ({email, password}) => {
  return axios.post(API_URL + 'user/login', {
    email: email,
    password: password
  });
};

const getUserData = (token) => {
  return axios.post(API_URL + 'user/profile', null, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });
};

const editUserName = ({ firstName, lastName }, token) => {
  return axios.put(API_URL + 'user/profile', {
    firstName: firstName,
    lastName: lastName
  },
  {
    headers: {
      authorization: `Bearer ${token}`
    }
  });
};

const API = {
  getToken,
  getUserData,
  editUserName,
}

export default API;