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
        `${import.meta.env.VITE_API_BASE_URL}/protected-route`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Your new backend returns user data in response.data.user
      setState({ user: response.data.user, loading: false, error: null });
    } catch (error) {
      console.error("Fetch user error:", error);
      localStorage.removeItem("token");
      setState({ user: null, loading: false, error: null });
    }
  };

  const login = async (data) => {
    try {
      setState({ ...state, loading: true });
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        data
      );
      // Your backend returns access_token
      const token = response.data.access_token;
      localStorage.setItem("token", token);
      await fetchUser();
      navigate("/");
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Login failed";
      setState({
        ...state,
        loading: false,
        error: errorMessage,
      });
      return { error: errorMessage };
    }
  };

  const register = async (data) => {
    try {
      setState({ ...state, loading: true });
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
        data
      );
      setState({ ...state, loading: false });
      navigate("/login");
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Registration failed";
      setState({
        ...state,
        loading: false,
        error: errorMessage,
      });
      return { error: errorMessage };
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
