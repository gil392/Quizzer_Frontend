import { NavigateFunction } from "react-router-dom";
import { logout } from "../../api/authentication/api";
import { PAGES_ROUTES } from "../../routes/routes.const";
import { removeUserDisplayMode } from "../settings/DisplayModeSwitch/utils";

export const createAppbarMenu = (
  navigate: NavigateFunction
): { label: string; onClick: () => void }[] => [
  {
      label: 'Profile',
      onClick: () => {
          navigate(PAGES_ROUTES.PROFILE);
      }
  },
  {
    label: "Sign Out",
    onClick: () => {
      removeUserDisplayMode();
      logout().finally(() => navigate(PAGES_ROUTES.LOGIN));
    },
  },
];
