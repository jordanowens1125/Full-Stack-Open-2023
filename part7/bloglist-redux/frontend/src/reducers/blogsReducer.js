import { createSlice } from "@reduxjs/toolkit";
import api from "../services/blog";
import { createError, createSuccess } from "./notificationReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    createNewBlog: (state, action) => {
      state.push(action.payload);
    },
    updateBlog: (state, action) => {
      const updatedBlog = action.payload;
      const id = updatedBlog.id;
      return state.map((blog) =>
        blog.id === id
          ? {
              ...blog,
              likes: blog.likes + 1,
            }
          : blog
      );
    },
    deleteBlog: (state, action) => {
      return state.filter((blog) => blog.id !== action.payload);
    },
    setBlogs: (state, action) => {
      return action.payload;
    },
  },
});

export const { createNewBlog, updateBlog, deleteBlog, setBlogs } =
  blogSlice.actions;

export default blogSlice.reducer;

export const initializeBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await api.getAll();
      dispatch(setBlogs(blogs));
    } catch (error) {
      dispatch(createError(`Failed to fetch blogs from server!`));
    }
  };
};

export const addNewBlog = (newBlog) => {
  return async (dispatch) => {
    try {
      const createdBlog = await api.create(newBlog);
      dispatch(createNewBlog(createdBlog));
      dispatch(createSuccess(`New Blog ${newBlog.title} was created!`));
    } catch (error) {
      console.log(error);
      dispatch(createError(`New Blog ${newBlog.title} was not created!`));
    }
  };
};

export const removeBlog = (blogID) => {
  return async (dispatch) => {
    try {
      await api.deleteBlog(blogID).catch((error) => console.log(error));
      dispatch(deleteBlog(blogID));
      dispatch(createSuccess(`Blog was deleted!`));
    } catch (error) {
      console.log(error);
      dispatch(createError(`The blog was not deleted!`));
    }
  };
};

export const likeBlog = (editedBlog) => {
  return async (dispatch) => {
    try {
      await api.update({
        ...editedBlog,
        likes: editedBlog.likes + 1,
      });
      dispatch(updateBlog(editedBlog));
      dispatch(createSuccess(`You liked blog ${editedBlog.title}`));
    } catch (error) {
      console.log(error);
      dispatch(
        createError(`Attempt to like blog ${editedBlog.title} failed!`)
      );
    }
  };
};
