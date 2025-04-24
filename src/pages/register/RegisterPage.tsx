import { Button, TextField, TextFieldProps, Typography } from '@mui/material';
import { withStyles, WithStyles } from '@mui/styles';
import { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/authentication/api';
import { registerSchema } from '../../api/authentication/schemas';
import { RegisterFormData } from '../../api/authentication/types';
import { extractZodErrorMessagesByFields } from '../../utils/utils';
import {
    createGoToLoginButtonProps,
    createRegisterButtonProps,
    createTextFieldProps,
    subTitleProps,
    titleProps
} from './components.props';
import { styles } from './styles';
import { RegisterFormErrors } from './types';

export interface RegisterPageProps extends WithStyles<typeof styles> {}

const RegisterPage: FunctionComponent<RegisterPageProps> = (props) => {
    const { classes } = props;
    const navigate = useNavigate();
    const [form, setForm] = useState<RegisterFormData>({
        username: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState<RegisterFormErrors>({});

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
            registerUser(form);
        }
    };

    const createRegisterFormFieldProps = (field: keyof RegisterFormData) =>
        createTextFieldProps(
            field,
            handleChange(field),
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
