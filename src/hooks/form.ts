import { ChangeEventHandler, useState } from "react";
import { ZodSchema } from "zod";
import { extractZodErrorMessagesByFields } from "../utils/utils";

type FormStateErrors<T extends {}> = Partial<Record<keyof T, string>>;

type FormState<T extends {}> = {
  form: T;
  errors: FormStateErrors<T>;
  validateForm: () => boolean;
  fieldsChangeHandlers: (field: keyof T) => ChangeEventHandler;
};

export const useFormOf = <T extends {}>(
  formSchema: ZodSchema<T>,
  initialForm: T
): FormState<T> => {
  const [form, setForm] = useState<T>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange =
    (field: keyof T) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [field]: event.target.value });
      setErrors({ ...errors, [field]: undefined });
    };

  const validateForm = () => {
    const { success, error } = formSchema.safeParse(form);
    if (!success) {
      const fieldErrors = extractZodErrorMessagesByFields(error);
      setErrors(fieldErrors);
    }

    return success;
  };

  return { form, errors, validateForm, fieldsChangeHandlers: handleChange };
};
