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
import { googleLogin, loginUser } from "../../api/authentication/api";
import { loginSchema } from "../../api/authentication/schemas";
import { LoginFormData, LoginResponse } from "../../api/authentication/types";
import { SetAccessTokenFunction } from "../../hooks/authentication/types";
import { useFormOf } from "../../hooks/form";
import { PAGES_ROUTES } from "../../routes/routes.const";
import useStyles from "../register/styles";
import DisplayModeSwitch from "../../components/settings/DisplayModeSwitch/DisplayModeSwitch";

export interface LoginPageProps {
  setAccessToken: SetAccessTokenFunction;
}

const LoginPage: FunctionComponent<LoginPageProps> = (props) => {
  const { setAccessToken } = props;
  const classes = useStyles();
  const navigate = useNavigate();
  const { form, errors, validateForm, fieldsChangeHandlers } = useFormOf(
    loginSchema,
    {
      username: "",
      password: "",
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

  const createLoginFormFieldProps = (
    field: keyof LoginFormData
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
  const usernameInputProps = createLoginFormFieldProps("username");
  const passwordTextFieldProps = createLoginFormFieldProps("password");

  const handleGoogleLogin = () => {
    googleLogin();
  };

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
            Login
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" align="center">
            Enter your username and password to login your account
          </Typography>
        </section>

        <section className={classes.formSection}>
          <TextField {...usernameInputProps} />
          <TextField {...passwordTextFieldProps} type="password" />

          <Button
            fullWidth
            variant="contained"
            className={classes.submitButton}
            onClick={submitLoginForm}
          >
            Login
          </Button>

          <Link
            variant="body2"
            underline="none"
            className={classes.link}
            onClick={navigateToRegisterPage}
          >
            Don't have an account? Register here
          </Link>
          <Typography className={classes.orText} variant="h4" gutterBottom>
            OR
          </Typography>
          <Button
            fullWidth
            variant="contained"
            className={classes.submitButton}
            onClick={handleGoogleLogin}
          >
            Continue with Google
          </Button>
        </section>
      </div>
    </div>
  );
};

export default LoginPage;
