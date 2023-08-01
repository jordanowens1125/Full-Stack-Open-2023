import { createSlice } from "@reduxjs/toolkit";
import api from "../api/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    sortAnecdotesAfterUpdate(state, action) {
      const changedAnecdote = action.payload;

      const newArr = state.map((anecdote) =>
        anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote
      );
      return newArr.sort(function (a, b) {
        return b.votes - a.votes;
      });
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
  },
});

export default anecdoteSlice.reducer;
export const { setAnecdotes, appendAnecdote, sortAnecdotesAfterUpdate } =
  anecdoteSlice.actions;

export const intializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await api.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await api.createAnecdote(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteForAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await api.likeAnecdote(anecdote);
    dispatch(sortAnecdotesAfterUpdate(updatedAnecdote));
  };
};
