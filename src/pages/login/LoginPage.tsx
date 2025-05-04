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
import { loginUser } from "../../api/authentication/api";
import { loginSchema } from "../../api/authentication/schemas";
import { LoginFormData, LoginResponse } from "../../api/authentication/types";
import {
  SetAccessTokenFunction,
  setUserIdInStorage,
} from "../../hooks/authentication/types";
import { useFormOf } from "../../hooks/form";
import { PAGES_ROUTES } from "../../routes/routes.const";
import useStyles from "../register/styles";

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

  const onSuccessfulLogin = ({ token, userId }: LoginResponse) => {
    setAccessToken(token);
    setUserIdInStorage(userId);
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

  return (
    <div className={classes.root}>
      <section>
        <Typography component="h1" variant="h4">
          Login
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" align="center">
          Enter your email below to login your account
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
          dont have account? register here
        </Link>
      </section>
    </div>
  );
};

export default LoginPage;
