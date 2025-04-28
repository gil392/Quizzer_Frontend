import { ReactNode } from "react";
import { PAGES_ROUTES } from "../../routes/routes.const";

export type NavBarItem = {
    text: string;
    icon: ReactNode;
    route: keyof typeof PAGES_ROUTES;
};
