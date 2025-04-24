import { LoginFormData } from "../../api/authentication/types";

export type LoginFormErrors = Partial<
    Record<keyof LoginFormData, string>
>;
