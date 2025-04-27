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
import { loginUser, registerUser } from '../../api/authentication/api';
import { registerSchema } from '../../api/authentication/schemas';
import {
    LoginResponse,
    RegisterFormData
} from '../../api/authentication/types';
import { SetAccessTokenFunction } from '../../hooks/authentication/types';
import { useFormOf } from '../../hooks/form';
import { PAGES_ROUTES } from '../../routes/routes.const';
import {
    createRegisterButtonProps,
    createRegisterTextFieldProps,
    loginPageLinkProps,
    subTitleProps,
    titleProps
} from './components.props';
import { styles } from './styles';

export interface RegisterPageProps extends WithStyles<typeof styles> {
    setAccessToken: SetAccessTokenFunction;
}

const RegisterPage: FunctionComponent<RegisterPageProps> = (props) => {
    const { classes, setAccessToken } = props;
    const navigate = useNavigate();
    const { form, errors, validateForm, fieldsChangeHandlers } = useFormOf(
        registerSchema,
        {
            username: '',
            email: '',
            password: ''
        }
    );

    const onSuccessfulLogin = ({ token }: LoginResponse) => {
        setAccessToken(token);
        navigate(PAGES_ROUTES.HOME);
    };

    const submitRegistration = async () => {
        if (validateForm()) {
            await registerUser(form);
            const { data } = await loginUser(form);
            onSuccessfulLogin(data);
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
        navigate(PAGES_ROUTES.LOGIN);
    };

    const usernameInputProps = createRegisterFormFieldProps('username');
    const emailTextFieldProps = createRegisterFormFieldProps('email');
    const passwordTextFieldProps: TextFieldProps = {
        ...createRegisterFormFieldProps('password'),
        type: 'password'
    };
    const registerButtonProps = createRegisterButtonProps(
        classes.registerButton
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

                <Button {...registerButtonProps} onClick={submitRegistration}>
                    Register
                </Button>

                <Link {...loginPageLinkProps} onClick={navigateToLoginPage}>
                    already have account? login here
                </Link>
            </section>
        </div>
    );
};

export default withStyles(styles)(RegisterPage);
