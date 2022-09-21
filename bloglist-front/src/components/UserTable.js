import React from "react";
import { Link } from "react-router-dom";

const UserTable = ({ userList }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>
              <h3>Users</h3>
            </td>{" "}
            &nbsp; &nbsp; &nbsp;
            <td>
              <h3>blogs created</h3>
            </td>
          </tr>
        </thead>
        <tbody>
          {userList.map((user, index) => {
            return (
              <tr key={index}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>{" "}
                &nbsp; &nbsp; &nbsp;
                <td>{user.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
