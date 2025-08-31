import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLoggedUser } from "../../store/userReducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { useAuthentication } from "../../hooks/authentication/authentication";

const AuthCallbackPage: React.FC = () => {
  const navigate = useNavigate();
  const setAccessToken = useAuthentication();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("token");

    if (accessToken) {
      setAccessToken(accessToken);

      dispatch(fetchLoggedUser()).then(() => {
        navigate("/");
      });
    } else {
      console.error("No token found in the URL");
      navigate("/login"); 
    }
  }, [navigate, dispatch]);

  return null; 
};

export default AuthCallbackPage;