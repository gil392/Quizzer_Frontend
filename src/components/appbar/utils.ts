import { NavigateFunction } from "react-router-dom";
import { PAGES_ROUTES } from "../../routes/routes.const";
import { logout } from "../../api/authentication/api";

export const createAppbarMenu = (
    navigate: NavigateFunction
): { label: string; onClick: () => void }[] => [
    // {
    //     label: 'Profile',
    //     onClick: () => {
    //         navigate(PAGES_ROUTES.PROFILE);
    //     }
    // },
    {
        label: 'Sign Out',
        onClick: () => {
            logout().finally(() => navigate(PAGES_ROUTES.LOGIN));
        }
    }
];