import { Button, TextField, TextFieldProps, Typography } from '@mui/material';
import { withStyles, WithStyles } from '@mui/styles';
import { FunctionComponent, useState } from 'react';
import { registerUser } from '../../api/users/api';
import { registerSchema } from '../../api/users/schemas';
import { RegisterFormData } from '../../api/users/types';
import {
    createRegisterButtonProps,
    createTextFieldProps,
    subTitleProps,
    titleProps
} from './components.props';
import { getRegisterFormErrors } from './logic';
import { styles } from './styles';
import { RegisterFormErrors } from './types';

export interface RegisterPageProps extends WithStyles<typeof styles> {}

const RegisterPage: FunctionComponent<RegisterPageProps> = (props) => {
    const { classes } = props;
    const [form, setForm] = useState<RegisterFormData>({
        name: '',
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
            const fieldErrors = getRegisterFormErrors(error);
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

    const nameInputProps = createRegisterFormFieldProps('name');
    const emailTextFieldProps = createRegisterFormFieldProps('email');
    const passwordTextFieldProps: TextFieldProps = {
        ...createRegisterFormFieldProps('password'),
        type: 'password'
    };
    const registerButtonProps = createRegisterButtonProps(
        classes.registerBtn,
        submitRegistration
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
                <TextField {...nameInputProps} />
                <TextField {...emailTextFieldProps} />
                <TextField {...passwordTextFieldProps} />

                <Button {...registerButtonProps}>Register</Button>
            </section>
        </div>
    );
};

export default withStyles(styles)(RegisterPage);
