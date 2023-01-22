import axios from "axios";
//const API_URL = "http://localhost:8081/api/v1"; //local
const API_URL = "https://dalle-2clone.onrender.com/api/v1"; //local

export const createPhoto = async (prompt) => {
  const { data } = await axios.get(`${API_URL}/dalle?prompt=${prompt}`);
  return data;
};

export const getPosts = async ({ searchText }) => {
  const { data } = await axios.get(`${API_URL}/posts/all?searchText=${searchText}`);
  return data;
};

export const createPost = async (form) => {
  const { data } = await axios.post(`${API_URL}/posts/new`, { form });
  return data;
};
