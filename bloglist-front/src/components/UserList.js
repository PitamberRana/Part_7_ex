import React from "react";

const UserList = ({ user }) => {
  if (!user) return null;
  return (
    <div>
      <h1>{user.name}</h1>
      <strong>added blogs</strong>
      {user.blogs && (
        <ul>
          {user.blogs.map((blog, index) => (
            <li key={index}>{blog.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
