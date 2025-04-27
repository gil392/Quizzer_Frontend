import {
    ButtonProps,
    LinkProps,
    TextFieldProps,
    TypographyProps
} from '@mui/material';
import { isNotNil } from 'ramda';
import { ChangeEventHandler } from 'react';

export const titleProps: TypographyProps = {
    component: 'h1',
    variant: 'h4'
};

export const subTitleProps: TypographyProps = {
    variant: 'subtitle1',
    color: 'textSecondary',
    align: 'center'
};

export const createRegisterButtonProps = (className: string): ButtonProps => ({
    fullWidth: true,
    variant: 'contained',
    className
});

export const createRegisterTextFieldProps = (
    label: string,
    handleChange: ChangeEventHandler,
    value: string,
    className: string,
    error?: string
): TextFieldProps => ({
    label: label[0].toUpperCase() + label.slice(1),
    fullWidth: true,
    onChange: handleChange,
    error: isNotNil(error),
    helperText: error,
    required: true,
    className,
    value
});

export const loginPageLinkProps: LinkProps = {
    variant: 'body2',
    underline: 'none',
    style: { cursor: 'pointer' }
};
