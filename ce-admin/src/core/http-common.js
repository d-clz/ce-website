import axios from "axios";
const BASE_URL =
  process.env.VUE_APP_BASE_URL || `http://jsonplaceholder.typicode.com/`;

export const buildUrl = url => {
  return BASE_URL + url;
};

export const HTTP = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: "Bearer {token}"
  }
});
