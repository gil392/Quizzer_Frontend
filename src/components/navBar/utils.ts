import { PAGES_ROUTES } from '../../routes/routes.const';

export const isNavBarAvailableInPath = (pathName: string): boolean =>
    pathName !== PAGES_ROUTES.LOGIN && pathName !== PAGES_ROUTES.REGISTER;
