import { createContext, useContext, useEffect, useState } from "react";
import {
  getToken,
  storeToken,
  deleteToken,
  getApiIp,
} from "../utilities/storage";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(null);
  const [ip, setIp] = useState(getApiIp());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await fetch(`${ip}/api/user`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          });
  
          if (response.ok) {
            const result = await response.json();
            setUser(result);
          } else {
            console.error("Failed to fetch user:", await response.json());
            deleteToken();
            setToken(null);
            setUser(null);
          }
        } catch (error) {
          console.error("Error fetching user:", error);
          deleteToken();
          setToken(null);
        }
      }
    };
  
    fetchUser();
  }, [token, ip]);
  

  async function handleLogin(username, password) {
    const response = await fetch(`${ip}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();

    if (response.ok) {
      storeToken(result.token);
      setToken(result.token);
      setUser(result.user);
      navigate("/");
    } else {
      return { error: result.error || "Login failed" };
    }
  }

  async function handleRegister(username, password) {
    const response = await fetch(`${ip}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();

    if (response.ok) {
      storeToken(result.token);
      setToken(result.token);
      setUser(result.user);
      navigate("/");
    } else {
      return { error: result.error || "Registration failed" };
    }
  }

  async function handleLogout() {
    deleteToken();
    setToken(null);
    setUser(null);
    navigate("/");
  }

  return (
    <AuthContext.Provider
      value={{ token, user, handleLogin, handleRegister, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
