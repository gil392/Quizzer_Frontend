import {
  Button,
  Link,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { isNotNil } from "ramda";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../api/authentication/api";
import { registerSchema } from "../../api/authentication/schemas";
import {
  LoginResponse,
  RegisterFormData,
} from "../../api/authentication/types";
import { SetAccessTokenFunction, setUserIdInStorage } from "../../hooks/authentication/types";
import { useFormOf } from "../../hooks/form";
import { PAGES_ROUTES } from "../../routes/routes.const";
import useStyles from "./styles";

export interface RegisterPageProps {
  setAccessToken: SetAccessTokenFunction;
}

const RegisterPage: FunctionComponent<RegisterPageProps> = (props) => {
  const { setAccessToken } = props;
  const classes = useStyles();
  const navigate = useNavigate();
  const { form, errors, validateForm, fieldsChangeHandlers } = useFormOf(
    registerSchema,
    {
      username: "",
      email: "",
      password: "",
    }
  );

  const onSuccessfulLogin = ({ token, userId }: LoginResponse) => {
    setAccessToken(token);
    setUserIdInStorage(userId);
    navigate(PAGES_ROUTES.HOME);
  };

  const submitRegistration = async () => {
    if (validateForm()) {
      await registerUser(form);
      const { data } = await loginUser(form);
      onSuccessfulLogin(data);
    }
  };

  const navigateToLoginPage = () => {
    navigate(PAGES_ROUTES.LOGIN);
  };

  const createRegisterFormFieldProps = (
    field: keyof RegisterFormData
  ): TextFieldProps => ({
    fullWidth: true,
    required: true,
    className: classes.textField,
    label: field[0].toUpperCase() + field.slice(1),
    value: form[field],
    helperText: errors[field],
    error: isNotNil(errors[field]),
    onChange: fieldsChangeHandlers(field),
  });
  const usernameInputProps = createRegisterFormFieldProps("username");
  const emailTextFieldProps = createRegisterFormFieldProps("email");
  const passwordTextFieldProps = createRegisterFormFieldProps("password");

  return (
    <div className={classes.root}>
      <section>
        <Typography component="h1" variant="h4">
          Create an account
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" align="center">
          Enter your email below to create your account
        </Typography>
      </section>

      <section className={classes.formSection}>
        <TextField {...usernameInputProps} />
        <TextField {...emailTextFieldProps} />
        <TextField {...passwordTextFieldProps} type="password" />

        <Button
          fullWidth
          variant="contained"
          className={classes.submitButton}
          onClick={submitRegistration}
        >
          Register
        </Button>

        <Link
          variant="body2"
          underline="none"
          className={classes.link}
          onClick={navigateToLoginPage}
        >
          already have account? login here
        </Link>
      </section>
    </div>
  );
};

export default RegisterPage;
