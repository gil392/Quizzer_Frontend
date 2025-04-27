import { ButtonProps, TypographyProps } from '@mui/material';
import { createRegisterTextFieldProps } from '../register/components.props';

export const titleProps: TypographyProps = {
    component: 'h1',
    variant: 'h4'
};

export const subTitleProps: TypographyProps = {
    variant: 'subtitle1',
    color: 'textSecondary',
    align: 'center'
};

export const createLoginButtonProps = (className: string): ButtonProps => ({
    fullWidth: true,
    variant: 'contained',
    className
});

export const createGoToRegisterButtonProps = (
    className: string
): ButtonProps => ({
    variant: 'outlined',
    className
});

export const createLoginTextFieldProps = createRegisterTextFieldProps;
