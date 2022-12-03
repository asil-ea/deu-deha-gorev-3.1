import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const { user, setUser }: any = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  const navigate = useNavigate();

  const login = (e: any) => {

    e.preventDefault();

    axios
      .post("http://localhost:1337/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.data.message) {
          setLoginStatus(res.data.message);
        } else {
          setLoginStatus("success");
          setUser({
            username: res.data[0].username,
            email: res.data[0].email,
            password: res.data[0].password,
          });
          navigate("/profile");
        }
      });
  };

  useEffect(() => {
    if (user.username) {
      console.log("already logged in, redirecting to profile...");
      navigate("/profile");
    }
  }, []);

  return (
    <>
      <Link to="/profile">Profile</Link>
      <Link to="/signup">Sign Up</Link>
      <div className="login">
        <form onSubmit={login}>
          <h1>Login</h1>
          <label>Username</label>
          <input
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit">Login</button>
        </form>
      </div>
      <h1>{loginStatus}</h1>
      <h1>{user.username}</h1>
    </>
  );
};

export default SignIn;