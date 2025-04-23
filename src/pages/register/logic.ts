import { TextFieldProps } from '@mui/material';
import { isNotNil } from 'ramda';
import { ChangeEventHandler } from 'react';
import { ZodError } from 'zod';
import { RegisterFormData } from '../../api/authentication/types';
import { RegisterFormErrors } from './types';

export const createCustomTextField = ({
    fieldName,
    errors,
    handleChange,
    className,
    value
}: {
    fieldName: keyof RegisterFormData;
    errors: RegisterFormErrors;
    handleChange: (field: keyof RegisterFormData) => ChangeEventHandler;
    className: string;
    value: string;
}): TextFieldProps => ({
    label: fieldName[0].toUpperCase() + fieldName.slice(1),
    fullWidth: true,
    onChange: handleChange(fieldName),
    error: isNotNil(errors[fieldName]),
    helperText: errors[fieldName],
    required: true,
    className,
    value
});

export const getRegisterFormErrors = (error: ZodError<RegisterFormData>) => {
    const fieldErrors: RegisterFormErrors = {};
    error.errors.forEach((err) => {
        const field = err.path[0] as keyof RegisterFormData;
        fieldErrors[field] = err.message;
    });

    return fieldErrors;
};
