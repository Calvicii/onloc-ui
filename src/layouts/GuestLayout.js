import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function GuestLayout({ children }) {
  const { token, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token !== null) {
      navigate("/");
    }
  }, []);

  return <>{children}</>;
}

export default GuestLayout;
