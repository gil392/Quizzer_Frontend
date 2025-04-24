import { ZodError } from 'zod';

export const extractZodErrorMessagesByFields = <T extends {}>({
    errors
}: ZodError<T>) => {
    const fieldErrors: Partial<Record<keyof T, string>> = {};
    errors.forEach((err) => {
        const field = err.path[0] as keyof T;
        fieldErrors[field] = err.message;
    });

    return fieldErrors;
};
