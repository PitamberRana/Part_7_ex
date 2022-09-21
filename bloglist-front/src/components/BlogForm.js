import { TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import React from "react";
import { addBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useField } from "../hook";

const BlogForm = () => {
  const title = useField("text", "title");
  const author = useField("text", "author");
  const url = useField("text", "url");

  const dispatch = useDispatch();

  const create = (event, title, author, url) => {
    event.preventDefault();
    dispatch(addBlog({ title, author, url }));
    dispatch(setNotification(`a new blog ${title} by ${author}`, 5));
  };

  return (
    <div>
      <h3>create new</h3>
      <form
        onSubmit={(event) =>
          create(event, title.value, author.value, url.value)
        }
      >
        <div>
          <TextField style={{ margin: 5 }} {...title} />
        </div>
        <div>
          <TextField style={{ margin: 5 }} {...author} />
        </div>
        <div>
          <TextField style={{ margin: 5 }} {...url} />
        </div>
        <Button
          style={{ margin: 5 }}
          variant="contained"
          color="primary"
          type="submit"
        >
          create
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
