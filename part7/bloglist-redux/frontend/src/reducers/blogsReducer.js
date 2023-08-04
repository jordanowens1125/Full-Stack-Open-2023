import { createSlice } from "@reduxjs/toolkit";
import api from "../services/blog";

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
    const blogs = await api.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const addNewBlog = (newBlog) => {
  return async (dispatch) => {
    const createdBlog = await api.create(newBlog);
    dispatch(createNewBlog(createdBlog));
  };
};

export const removeBlog = (blogID) => {
  return async (dispatch) => {
    await api.deleteBlog(blogID);
    dispatch(deleteBlog(blogID));
  };
};

export const updateBlogState = (updatedBlog) => {
  return async (dispatch) => {
    await api.update(updatedBlog);
    dispatch(updateBlog(updatedBlog));
  };
};
