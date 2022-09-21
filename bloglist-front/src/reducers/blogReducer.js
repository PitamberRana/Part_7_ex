import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const blogSLice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      state.push(action.payload);
    },
    updateBlogObject(state, action) {
      const id = action.payload.id;
      const blogToUpdate = state.find((blog) => blog.id === id);
      const updatedBlog = action.payload;
      const index = state.indexOf(blogToUpdate);
      state[index] = updatedBlog;
    },
    deleteBlogObject(state, action) {
      const id = action.payload;

      // console.log(state);
      const filteredState = state.filter((x) => x.id !== id);

      return filteredState;
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlogs = (content) => {
  return async (dispatch) => {
    const returnedBlog = await blogService.create(content);

    dispatch(addBlog(returnedBlog));
    dispatch(
      setNotification({
        message: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
        type: "success",
      })
    );
  };
};

export const updateLikes = (id, blogToUpdate) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(id, blogToUpdate);
    dispatch(updateBlogObject(updatedBlog));
  };
};

export const deleteBlogs = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch(deleteBlogObject(id));
  };
};

export const { setBlogs, addBlog, updateBlogObject, deleteBlogObject } =
  blogSLice.actions;
export default blogSLice.reducer;
