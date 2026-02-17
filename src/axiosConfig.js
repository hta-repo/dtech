

import axios from "axios";

const user = JSON.parse(localStorage.getItem("loggedUser"));
let token = user ? user.token : '';

// Next we make an 'instance' of it
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    // 'Content-Type': 'multipart/form-data',
    'Accept': 'application/json',
    "Access-Control-Allow-Origin": "*",
    'Authorization': "Bearer " + token
  }
});

// Also add/ configure interceptors && all the other cool stuff
axios.interceptors.request.use(
  (request) => {
    // console.log(request);
    // Edit request config
    return request;
  },
  (error) => {
    // console.log(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    // console.log(response);
    // Edit response config
    return response;
  },
  (error) => {
    // console.log(error);
    return Promise.reject(error);
  }
);

export default instance;
