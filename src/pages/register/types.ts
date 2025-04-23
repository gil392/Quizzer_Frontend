import { RegisterFormData } from "../../api/users/types";

export type RegisterFormErrors = Partial<
    Record<keyof RegisterFormData, string>
>;
