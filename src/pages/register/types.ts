import { RegisterFormData } from "../../api/authentication/types";

export type RegisterFormErrors = Partial<
    Record<keyof RegisterFormData, string>
>;
