import axios from "axios";
const baseUrl = "/api/blogs";

const getToken = () => {
  const token = JSON.parse(localStorage.getItem("loggedBlogappUser"))?.token;
  return `Bearer ${token}`;
};

const getConfig = () => {
  return {
    headers: {
      Authorization: getToken(),
    },
  };
};

const getAll = () => {
  const config = getConfig();
  const request = axios.get(baseUrl, config);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = getConfig();

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (newObject) => {
  const config = getConfig();
  const response = await axios.put(
    `${baseUrl}/${newObject.id}`,
    newObject,
    config
  );
  return response.data;
};

const deleteBlog = async (id) => {
  const config = getConfig();
  const request = await axios.delete(`${baseUrl}/${id}`, config);
  return request;
};

const getBlog = async (id) => {
  const config = getConfig();
  const request = await axios.get(`${baseUrl}/${id}`, config);
  return request.data;
};

const createComment = async (id, text) => {
  const config = getConfig();
  const request = await axios.post(
    `${baseUrl}/${id}/comments`,
    { text },
    config
  );
  return request.data;
};

export default {
  getAll,
  create,
  update,
  deleteBlog,
  getBlog,
  createComment,
};
