import {
    Button,
    Link,
    TextField,
    TextFieldProps,
    Typography
} from '@mui/material';
import { withStyles, WithStyles } from '@mui/styles';
import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/authentication/api';
import { loginSchema } from '../../api/authentication/schemas';
import { LoginFormData, LoginResponse } from '../../api/authentication/types';
import { SetAccessTokenFunction } from '../../hooks/authentication/types';
import { useFormOf } from '../../hooks/form';
import { PAGES_ROUTES } from '../../routes/routes.const';
import {
    createLoginButtonProps,
    createLoginTextFieldProps,
    registerPageLinkProps,
    subTitleProps,
    titleProps
} from './components.props';
import { styles } from './styles';

export interface LoginPageProps extends WithStyles<typeof styles> {
    setAccessToken: SetAccessTokenFunction;
}

const LoginPage: FunctionComponent<LoginPageProps> = (props) => {
    const { classes, setAccessToken } = props;
    const navigate = useNavigate();
    const { form, errors, validateForm, fieldsChangeHandlers } = useFormOf(
        loginSchema,
        {
            username: '',
            password: ''
        }
    );

    const onSuccessfulLogin = ({ token }: LoginResponse) => {
        setAccessToken(token);
        navigate(PAGES_ROUTES.HOME);
    };

    const submitLoginForm = async () => {
        if (validateForm()) {
            const { data } = await loginUser(form);
            onSuccessfulLogin(data);
        }
    };

    const navigateToRegisterPage = () => {
        navigate(PAGES_ROUTES.REGISTER);
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
    const loginButtonProps = createLoginButtonProps(classes.loginButton);

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

                <Button {...loginButtonProps} onClick={submitLoginForm}>
                    Login
                </Button>

                <Link
                    {...registerPageLinkProps}
                    onClick={navigateToRegisterPage}
                >
                    dont have account? register here
                </Link>
            </section>
        </div>
    );
};

export default withStyles(styles)(LoginPage);
