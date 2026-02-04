import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    loading: true,
    error: null,
  });
  const navigate = useNavigate();

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setState({ user: null, loading: false, error: null });
      return;
    }
    try {
      const response = await axios.get(
        "https://blog-post-project-api-with-db.vercel.app/auth/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setState({ user: response.data.data, loading: false, error: null });
    } catch (error) {
      localStorage.removeItem("token");
      setState({ user: null, loading: false, error: null });
    }
  };

  const login = async (data) => {
    try {
      setState({ ...state, loading: true });
      const response = await axios.post(
        "https://blog-post-project-api-with-db.vercel.app/auth/login",
        data
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      await fetchUser();
      navigate("/");
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error: error.response?.data?.message || "Login failed",
      });
      return { error: error.response?.data?.message || "Login failed" };
    }
  };

  const register = async (data) => {
    try {
      setState({ ...state, loading: true });
      await axios.post(
        "https://blog-post-project-api-with-db.vercel.app/auth/register",
        data
      );
      setState({ ...state, loading: false });
      navigate("/login");
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error: error.response?.data?.message || "Registration failed",
      });
      return { error: error.response?.data?.message || "Registration failed" };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setState({ user: null, loading: false, error: null });
    navigate("/login");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ state, login, register, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
