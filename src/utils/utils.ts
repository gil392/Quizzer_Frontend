import { ZodError } from "zod";
import { toast } from "sonner";

export const extractZodErrorMessagesByFields = <T extends {}>({
  errors,
}: ZodError<T>) => {
  const fieldErrors: Partial<Record<keyof T, string>> = {};
  errors.forEach((err) => {
    const field = err.path[0] as keyof T;
    fieldErrors[field] = err.message;
  });

  return fieldErrors;
};

export const toastWarning = (message: string) => {
  toast.warning(message);
};

export const toastSuccess = (message: string) => {
  toast.success(message);
};
