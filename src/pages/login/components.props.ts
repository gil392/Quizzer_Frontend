import { ButtonProps, TypographyProps } from '@mui/material';
import { MouseEventHandler } from 'react';

export const titleProps: TypographyProps = {
    component: 'h1',
    variant: 'h4'
};

export const subTitleProps: TypographyProps = {
    variant: 'subtitle1',
    color: 'textSecondary',
    align: 'center'
};

export const createLoginButtonProps = (
    className: string,
    submit: MouseEventHandler
): ButtonProps => ({
    fullWidth: true,
    variant: 'contained',
    className,
    onClick: submit
});

export const createGoToRegisterButtonProps = (
    className: string,
    navigateToRegisterPage: MouseEventHandler
): ButtonProps => ({
    variant: 'outlined',
    className,
    onClick: navigateToRegisterPage
});
