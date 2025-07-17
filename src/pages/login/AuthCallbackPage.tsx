import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("token");

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      
      navigate("/");
    } else {
      console.error("No token found in the URL");
      navigate("/login"); 
    }
  }, [navigate]);

  return null; 
};

export default AuthCallbackPage;