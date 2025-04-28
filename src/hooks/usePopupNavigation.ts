import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const usePopupNavigation = (
  basePath: string,
  popupPath: string,
  onClosePopup?: () => void
) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // current URL path

  useEffect(() => {
    const isPopupOpen = location.pathname === `${basePath}/${popupPath}`;
    setIsPopupOpen(isPopupOpen);
  }, [location, basePath, popupPath]);

  useEffect(() => {
    !isPopupOpen && onClosePopup?.();
  }, [isPopupOpen]);

  const openPopup = () => {
    setIsPopupOpen(true);
    navigate(`${basePath}/${popupPath}`);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    navigate(basePath);
    onClosePopup?.();
  };

  return { isPopupOpen, openPopup, closePopup };
};
