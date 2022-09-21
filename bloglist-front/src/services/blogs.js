import axios from "axios";
const baseUrl = "/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newBlog) => {
  const token = await JSON.parse(window.localStorage.getItem("loggedinUser"))
    .token;
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };

  const response = await axios.post(baseUrl, newBlog, config);

  return response.data;
};

const update = async (id, newBlog) => {
  const token = JSON.parse(window.localStorage.getItem("loggedinUser")).token;
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };

  const response = await axios.put(`${baseUrl}/${id}`, newBlog, config);
  return response.data;
};

const remove = async (id) => {
  const token = JSON.parse(window.localStorage.getItem("loggedinUser")).token;
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

// eslint-disable-next-line
export default { getAll, create, update, remove };
