import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthMiddleware = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const apiUrl =
    window.location.hostname === "localhost"
      ? "http://localhost:1000/api"
      : "https://blaze-backend-node.onrender.com/api";

  useEffect(() => {
    const checkAuthentication = async () => {
      if (token) {
        try {
          const loggedInUser = await getProfile();
          console.log(loggedInUser, "loggedInUser");
          setIsAuthenticated(true);
        } catch (error) {
          setIsAuthenticated(false);
          console.error("Error", error);
          navigate("/");
        } finally {
        }
      } else {
        setIsAuthenticated(false);
        navigate("/");
      }
    };

    checkAuthentication();
  }, [navigate, token]);

  const getProfile = async () => {
    try {
      let loggedInUser = await axios.get(`${apiUrl}/getProfile`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      console.log(loggedInUser, "loggedInUser");
    } catch (error) {
      throw error.message;
    }
  };

  useEffect(() => {
    if (isAuthenticated == true && window.location.pathname == "/") {
      navigate("/currency-conversion-history");
    }
  }, []);

  return children;
};

export default AuthMiddleware;
