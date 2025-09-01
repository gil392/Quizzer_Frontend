import {
  Box,
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
import { SetAccessTokenFunction } from "../../hooks/authentication/types";
import { useFormOf } from "../../hooks/form";
import { PAGES_ROUTES } from "../../routes/routes.const";
import useStyles from "./styles";
import DisplayModeSwitch from "../../components/settings/DisplayModeSwitch/DisplayModeSwitch";
import { toastWarning } from "../../utils/utils";

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

  const onSuccessfulLogin = ({ token }: LoginResponse) => {
    setAccessToken(token);
    navigate(PAGES_ROUTES.HOME);
  };

  const submitRegistration = async () => {
    if (validateForm()) {
      try {
        await registerUser(form);
        const { data } = await loginUser(form);
        onSuccessfulLogin(data);
      } catch (error) {
        toastWarning("Failed to register user");
      }
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
      <div className={classes.left}>
        <Box
          component="img"
          src="/images/logo.png"
          alt="Logo"
          className={classes.logo}
        />
        <div className={classes.imageWrapper}>
          <Box
            component="img"
            src="/images/login.png"
            alt="Login"
            className={classes.image}
          />
        </div>
      </div>
      <div className={classes.right}>
        <div className={classes.displayModeSwitch}>
          <DisplayModeSwitch />
        </div>
        <section>
          <Typography component="h1" variant="h4">
            Create an account
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" align="center">
            Enter your email, username and password to create your account
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
            already have an account? Login here
          </Link>
        </section>
      </div>
    </div>
  );
};

export default RegisterPage;
