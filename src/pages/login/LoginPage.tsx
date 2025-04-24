import { Button, TextField, TextFieldProps, Typography } from '@mui/material';
import { withStyles, WithStyles } from '@mui/styles';
import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/authentication/api';
import { loginSchema } from '../../api/authentication/schemas';
import { LoginFormData } from '../../api/authentication/types';
import { useFormOf } from '../../hooks/form';
import {
    createGoToRegisterButtonProps,
    createLoginButtonProps,
    createLoginTextFieldProps,
    subTitleProps,
    titleProps
} from './components.props';
import { styles } from './styles';

export interface LoginPageProps extends WithStyles<typeof styles> {}

const LoginPage: FunctionComponent<LoginPageProps> = (props) => {
    const { classes } = props;
    const navigate = useNavigate();
    const { form, errors, validateForm, fieldsChangeHandlers } = useFormOf(
        loginSchema,
        {
            username: '',
            password: ''
        }
    );

    const submitLoginForm = () => {
        if (validateForm()) {
            loginUser(form);
        }
    };

    const navigateToRegisterPage = () => {
        navigate('/signup');
    };

    const createLoginFormFieldProps = (field: keyof LoginFormData) =>
        createLoginTextFieldProps(
            field,
            fieldsChangeHandlers(field),
            form[field],
            classes.textField,
            errors[field]
        );
    const usernameInputProps = createLoginFormFieldProps('username');
    const passwordTextFieldProps: TextFieldProps = {
        ...createLoginFormFieldProps('password'),
        type: 'password'
    };
    const loginButtonProps = createLoginButtonProps(
        classes.loginButton,
        submitLoginForm
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
                <TextField {...usernameInputProps} />
                <TextField {...passwordTextFieldProps} />

                <Button {...loginButtonProps}>Login</Button>
            </section>

            <Button {...goToRegisterButtonProps}>Register</Button>
        </div>
    );
};

export default withStyles(styles)(LoginPage);
