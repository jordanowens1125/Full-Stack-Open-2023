import axios from "axios";
const baseUrl = "/api/blogs";

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

const create = async (newObject) => {
  let token = getToken();
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (newObject) => {
  let token = getToken();
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(
    `${baseUrl}/${newObject.id}`,
    newObject,
    config
  );
  return response.data;
};

const deleteBlog = async (id) => {
  let token = getToken();
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.delete(`${baseUrl}/${id}`, config);
  return request;
};

export default {
  getAll,
  create,
  update,
  deleteBlog,
};
