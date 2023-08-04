import { createSlice } from "@reduxjs/toolkit";
import api from "../services/users";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    createNewUser: (state, action) => {
      state.push(action.payload);
    },
    updateUser: (state, action) => {
      const updatedUser = action.payload;
      const id = updatedUser.id;
      return state.map((users) =>
        users.id === id
          ? {
              ...users,
              likes: users.likes + 1,
            }
          : users
      );
    },
    deleteUser: (state, action) => {
      return state.filter((users) => users.id !== action.payload);
    },
    setUsers: (state, action) => {
      return action.payload;
    },
  },
});

export const { createNewUser, updateUser, deleteUser, setUsers } =
  usersSlice.actions;

export default usersSlice.reducer;

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await api.getAll();
    dispatch(setUsers(users));
  };
};


