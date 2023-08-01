import axios from "axios";
const baseURL = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const createAnecdote = async (anecdote) => {
  const response = await axios.post(baseURL, {
    votes: 0,
    content: anecdote,
  });
  return response.data;
};

const likeAnecdote = async (anecdote) => {
  const response = await axios.put(baseURL + `/${anecdote.id}`, {
    ...anecdote,
    votes: anecdote.votes + 1,
  });
  return response.data;
};

export default {
  getAll,
  createAnecdote,
  likeAnecdote,
};
