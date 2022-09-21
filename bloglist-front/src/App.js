import BlogForm from "./components/BlogForm";
import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import loginService from "./services/login";
import userService from "./services/users";
import Notification from "./components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import {
  createBlogs,
  deleteBlogs,
  initializeBlogs,
  updateLikes,
} from "./reducers/blogReducer";
import { setUsers } from "./reducers/userReducer";
import { Link, Route, Routes, useMatch, useNavigate } from "react-router-dom";
import UserTable from "./components/UserTable";
import { UserInfo } from "./components/UserInfo";
import UserList from "./components/UserList";
import BlogList from "./components/BlogList";
import { AppBar, Button, Container, TextField, Toolbar } from "@mui/material";
import React from "react";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const [visible, setVisible] = useState(false);

  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = window.localStorage.getItem("loggedinUser");
    dispatch(setUsers(JSON.parse(user)));
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    userService.getAll().then((result) => {
      setUserList(result);
    });
  }, []);
  const matchUser = useMatch("/users/:id");
  const foundUser = matchUser
    ? userList.find((user) => {
        return user.id === matchUser.params.id;
      })
    : null;

  const matchBlog = useMatch("/blogs/:id");
  const foundBlog = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedinUser", JSON.stringify(user));
      dispatch(setUsers(user));
    } catch (exception) {
      dispatch(
        setNotification({
          message: exception.response.data.error,
          type: "error",
        })
      );
      setTimeout(() => {
        dispatch(
          setNotification({
            message: null,
            type: null,
          })
        );
      }, 5000);
    }
  };

  const LoginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <TextField
          style={{ margin: 5 }}
          id="username"
          type="text"
          name="username"
          label="username"
        />
      </div>
      <div>
        <TextField
          style={{ margin: 5 }}
          label="password"
          id="password"
          type="password"
          name="password"
        />
      </div>
      <Button
        style={{ margin: 5 }}
        variant="contained"
        id="login-button"
        type="submit"
      >
        login
      </Button>
    </form>
  );

  const handleLogout = () => {
    window.localStorage.removeItem("loggedinUser");
    dispatch(setUsers(null));
    navigate("/");
  };

  const handleBlogCreation = async (blogObject) => {
    try {
      setVisible(false);

      dispatch(createBlogs(blogObject));

      setTimeout(() => {
        dispatch(
          setNotification({
            message: null,
            type: null,
          })
        );
      }, 2000);
    } catch (exception) {
      dispatch(
        setNotification({
          message: exception.response.data.error,
          type: "error",
        })
      );
      setTimeout(() => {
        dispatch(setNotification({ message: null, type: null }));
      }, 2000);
    }
  };

  const updateLike = async (id, updatedLikes) => {
    try {
      const blogToUpdate = blogs.find((blog) => blog.id === id);
      const newBlogObject = {
        likes: updatedLikes,
        author: blogToUpdate.author,
        title: blogToUpdate.title,
        url: blogToUpdate.url,
      };

      dispatch(updateLikes(id, newBlogObject));
    } catch (exception) {
      dispatch(
        setNotification({
          message: exception.response.data.error,
          type: "error",
        })
      );
      setTimeout(() => {
        dispatch(setNotification({ message: null, type: null }));
      }, 2000);
    }
  };

  const deleteBlog = async (id) => {
    const blogToRemove = blogs.find((blog) => blog.id === id);
    const ok = window.confirm(
      `Remove blog ${blogToRemove.title} by ${blogToRemove.author}?`
    );

    if (ok) {
      dispatch(deleteBlogs(id));

      dispatch(
        setNotification({
          message: `blog ${blogToRemove.title} by ${blogToRemove.author} removed`,
          type: "error",
        })
      );
      setTimeout(() => {
        dispatch(setNotification({ message: null, type: null }));
      }, 2000);
    }
  };

  const createBlogForm = () => (
    <BlogForm setVisible={setVisible} newBlog={handleBlogCreation} />
  );

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  const Home = ({
    user,
    visible,
    createBlogForm,
    setVisible,
    sortedBlogs,
    updateLike,
    deleteBlog,
  }) => {
    return (
      <div>
        {user === null ? (
          <>
            <h2> Login </h2>
            <LoginForm />
          </>
        ) : (
          <>
            <h1 style={{ margin: 5 }}>blog app</h1>

            {visible ? (
              createBlogForm()
            ) : (
              <div style={{ marginTop: 5 }}>
                <button
                  onClick={() => {
                    setVisible(true);
                  }}
                >
                  create new blog
                </button>
              </div>
            )}
            {sortedBlogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                updateLike={updateLike}
                removeBlog={deleteBlog}
                user={user}
              />
            ))}
          </>
        )}
      </div>
    );
  };
  const style = {
    padding: 5,
    textDecoration: "none",
    fontWeight: "bold",
  };
  return (
    <Container>
      <Notification />

      <AppBar
        position="static"
        style={{ backgroundColor: "aqua", padding: "5px" }}
      >
        <Container>
          <Toolbar disableGutters>
            <div>
              <Link style={style} to="/">
                Blogs
              </Link>
              <Link style={style} to="/users">
                Users
              </Link>
              <span
                style={{
                  position: "absolute",
                  right: "0px",
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                <UserInfo handleLogout={handleLogout} />
              </span>
            </div>{" "}
          </Toolbar>
        </Container>
      </AppBar>

      <Routes>
        <Route
          path="/users"
          element={
            <UserTable handleLogout={handleLogout} userList={userList} />
          }
        />
        <Route
          path="/users/:id"
          element={<UserList user={foundUser} handleLogout={handleLogout} />}
        />
        <Route
          path="/blogs/:id"
          element={
            <BlogList
              blog={foundBlog}
              updateLike={updateLike}
              handleLogout={handleLogout}
            />
          }
        />
        <Route
          path="/"
          element={
            <Home
              user={user}
              handleLogout={handleLogout}
              visible={visible}
              createBlogForm={createBlogForm}
              setVisible={setVisible}
              sortedBlogs={sortedBlogs}
              updateLike={updateLike}
              deleteBlog={deleteBlog}
            />
          }
        ></Route>
      </Routes>
    </Container>
  );
};

export default App;
