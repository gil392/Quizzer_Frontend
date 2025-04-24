import { Button, TextField, TextFieldProps, Typography } from '@mui/material';
import { withStyles, WithStyles } from '@mui/styles';
import { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/authentication/api';
import { registerSchema } from '../../api/authentication/schemas';
import {
    LoginFormData,
    RegisterFormData
} from '../../api/authentication/types';
import { extractZodErrorMessagesByFields } from '../../utils/utils';
import { createTextFieldProps } from '../register/components.props';
import {
    createGoToRegisterButtonProps,
    createLoginButtonProps,
    subTitleProps,
    titleProps
} from './components.props';
import { styles } from './styles';
import { LoginFormErrors } from './types';

export interface LoginPageProps extends WithStyles<typeof styles> {}

const LoginPage: FunctionComponent<LoginPageProps> = (props) => {
    const { classes } = props;
    const navigate = useNavigate();
    const [form, setForm] = useState<LoginFormData>({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState<LoginFormErrors>({});

    const handleChange =
        (field: keyof RegisterFormData) =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setForm({ ...form, [field]: event.target.value });
            setErrors({ ...errors, [field]: undefined });
        };

    const validateForm = () => {
        const { success, error } = registerSchema.safeParse(form);
        if (!success) {
            const fieldErrors = extractZodErrorMessagesByFields(error);
            setErrors(fieldErrors);
        }

        return success;
    };

    const submitRegistration = () => {
        if (validateForm()) {
            loginUser(form);
        }
    };

    const createLoginFormFieldProps = (field: keyof LoginFormData) =>
        createTextFieldProps(
            field,
            handleChange(field),
            form[field],
            classes.textField,
            errors[field]
        );
    const navigateToRegisterPage = () => {
        navigate('/signup');
    };

    const usernameInputProps = createLoginFormFieldProps('username');
    const passwordTextFieldProps: TextFieldProps = {
        ...createLoginFormFieldProps('password'),
        type: 'password'
    };
    const loginButtonProps = createLoginButtonProps(
        classes.loginButton,
        submitRegistration
    );
    const goToRegisterButtonProps = createGoToRegisterButtonProps(
        classes.goToRegisterButton,
        navigateToRegisterPage
    );

    return (
        <div className={classes.root}>
            <section>
                <Typography {...titleProps}>Login</Typography>
                <Typography {...subTitleProps}>
                    Enter your email below to login your account
                </Typography>
            </section>

            <section className={classes.formSection}>
                <TextField {...usernameInputProps} fullWidth />
                <TextField {...passwordTextFieldProps} />

                <Button {...loginButtonProps}>Login</Button>
            </section>

            <Button {...goToRegisterButtonProps}>Register</Button>
        </div>
    );
};

export default withStyles(styles)(LoginPage);
