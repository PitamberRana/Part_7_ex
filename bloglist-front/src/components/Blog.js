import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { Link } from "react-router-dom";
import { Button, ListGroup } from "react-bootstrap";
import PropTypes from "prop-types";

const Blog = ({ blog, deleteBlogs }) => {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const showWhenVisible = { display: visible ? "" : "none" };
  const buttonLabel = visible ? "hide" : "view";

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  // const increaseLikes = (id) => {
  //   updateLikes(id, blog.likes + 1);
  //   dispatch(
  //     setNotification(`Blog ${blog.title} successfully updated`, "success", 5)
  //   );
  // };

  const removeBlog = (id) => {
    deleteBlogs(id);
    dispatch(
      setNotification(`Blog ${blog.title} successfully deleted`, "success", 5)
    );
  };

  return (
    <div className="blog">
      <div>
        <p>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} - {blog.author}
          </Link>{" "}
          <Button variant="primary" onClick={toggleVisibility}>
            {buttonLabel}
          </Button>
        </p>
      </div>
      <ListGroup>
        <div style={showWhenVisible}>
          <ListGroup.Item>{blog.url}</ListGroup.Item>
          <ListGroup.Item>
            {blog.likes}{" "}
            {/* <Button variant="primary" id="like-button" onClick={increaseLikes}>
              like
            </Button> */}
          </ListGroup.Item>
          <Button variant="danger" id="remove" onClick={removeBlog}>
            remove
          </Button>
        </div>
      </ListGroup>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
