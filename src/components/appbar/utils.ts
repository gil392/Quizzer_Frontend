import { NavigateFunction } from "react-router-dom";
import { logout } from "../../api/authentication/api";
import { PAGES_ROUTES } from "../../routes/routes.const";

export const createAppbarMenu = (
  navigate: NavigateFunction,
  handleLogout: () => void
): { label: string; onClick: () => void }[] => [
  {
    label: "Profile",
    onClick: () => {
      navigate(PAGES_ROUTES.PROFILE);
    },
  },
  {
    label: "Sign Out",
    onClick: () => {
      handleLogout();
      logout().finally(() => navigate(PAGES_ROUTES.LOGIN));
    },
  },
];
