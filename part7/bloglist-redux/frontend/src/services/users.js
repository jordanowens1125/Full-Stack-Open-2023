import axios from "axios";
const baseUrl = "/api/users";

const getToken = () => {
  const token = JSON.parse(localStorage.getItem("loggedBlogappUser"))?.token;
  return `Bearer ${token}`;
};

const getAll = () => {
  let token = getToken();
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.get(baseUrl, config);
  return request.then((response) => response.data);
};

export default {
  getAll,
};