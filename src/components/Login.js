import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";
import "./Login.css"; 

const Login = () => {
  const apiUrl = "http://localhost:1000/api";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("Email:", email);
      console.log("Password:", password);

    let loginUser = await axios.post(`${apiUrl}/login`, {
        email: email,
        password: password,
      });

      if (loginUser.status) {
        localStorage.setItem('token', loginUser.headers.access_token);
        Cookie.set("token", loginUser.headers.access_token);
        navigate("/currency-conversion-history");
      }else{

      }
      console.log(loginUser, "loginUser");
    } catch (error) {
      throw error.message;
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
