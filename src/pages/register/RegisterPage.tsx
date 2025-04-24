import { Button, TextField, TextFieldProps, Typography } from '@mui/material';
import { withStyles, WithStyles } from '@mui/styles';
import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/authentication/api';
import { registerSchema } from '../../api/authentication/schemas';
import { RegisterFormData } from '../../api/authentication/types';
import { useFormOf } from '../../hooks/form';
import {
    createGoToLoginButtonProps,
    createRegisterButtonProps,
    createRegisterTextFieldProps,
    subTitleProps,
    titleProps
} from './components.props';
import { styles } from './styles';

export interface RegisterPageProps extends WithStyles<typeof styles> {}

const RegisterPage: FunctionComponent<RegisterPageProps> = (props) => {
    const { classes } = props;
    const navigate = useNavigate();
    const { form, errors, validateForm, fieldsChangeHandlers } = useFormOf(
        registerSchema,
        {
            username: '',
            email: '',
            password: ''
        }
    );

    const submitRegistration = () => {
        if (validateForm()) {
            registerUser(form);
        }
    };

    const createRegisterFormFieldProps = (field: keyof RegisterFormData) =>
        createRegisterTextFieldProps(
            field,
            fieldsChangeHandlers(field),
            form[field],
            classes.textField,
            errors[field]
        );
    const navigateToLoginPage = () => {
        navigate('/login');
    };

    const usernameInputProps = createRegisterFormFieldProps('username');
    const emailTextFieldProps = createRegisterFormFieldProps('email');
    const passwordTextFieldProps: TextFieldProps = {
        ...createRegisterFormFieldProps('password'),
        type: 'password'
    };
    const registerButtonProps = createRegisterButtonProps(
        classes.registerButton,
        submitRegistration
    );
    const gotToLoginButtonProps = createGoToLoginButtonProps(
        classes.goToLoginButton,
        navigateToLoginPage
    );

    return (
        <div className={classes.root}>
            <section>
                <Typography {...titleProps}>Create an account</Typography>
                <Typography {...subTitleProps}>
                    Enter your email below to create your account
                </Typography>
            </section>

            <section className={classes.formSection}>
                <TextField {...usernameInputProps} />
                <TextField {...emailTextFieldProps} />
                <TextField {...passwordTextFieldProps} />

                <Button {...registerButtonProps}>Register</Button>
            </section>

            <Button {...gotToLoginButtonProps}>Login</Button>
        </div>
    );
};

export default withStyles(styles)(RegisterPage);
