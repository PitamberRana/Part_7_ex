import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const BlogDetail = ({ blog, updateLike }) => {
  if (!blog) return null;

  const [comments, setComments] = useState([]);

  const increaseLike = (id) => {
    updateLike(id, blog.likes + 1);
  };

  const handleComment = (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    setComments([...comments, comment]);
    event.target.comment.value = "";
  };
  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes{" "}
        <Button
          onClick={() => {
            increaseLike(blog.id);
          }}
        >
          like
        </Button>
      </div>
      added by {blog.author}
      <div>
        <strong>comments</strong>
        <Form onSubmit={handleComment}>
          <input type="text" name="comment" />
          <Button>add comment</Button>
        </Form>

        {comments &&
          comments.map((comment, index) => {
            console.log(index);
            return <li key={index}>{comment}</li>;
          })}
      </div>
    </div>
  );
};

export default BlogDetail;
