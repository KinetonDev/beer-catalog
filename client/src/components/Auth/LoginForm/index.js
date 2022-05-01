import React from 'react';
import useStyle from './styles'
import {Formik} from 'formik'
import {Button, IconButton, InputAdornment, TextField, Typography} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {POST} from "../../../helpers/HTTPMethods";
import PropTypes from 'prop-types'
import validationSchema from "./validationSchema";
import {FormattedMessage, injectIntl} from "react-intl";

const LoginForm = (
    {
        handleSubmit,
        isPasswordVisible,
        handleVisibilityChange,
        handleNavigationToRegisterPage,
        loginError,
        loginSucceeded,
        wasLoginRequested,
        intl
    }) => {
    const classes = useStyle();
    const emailPlaceholder = intl.formatMessage(
        {id: "login.email.placeHolder",
            defaultMessage: "Write your email here",
            description: "Email placeholder"});
    const passwordPlaceholder = intl.formatMessage(
        {id: "login.password.placeHolder",
            defaultMessage: "Write your password here",
            description: "Password placeholder"});
    const emailInput = intl.formatMessage(
        {id: "login.email",
            defaultMessage: "Email",
            description: "Email input label"}
    );
    const passwordInput = intl.formatMessage(
        {id: "login.password",
            defaultMessage: "Password",
            description: "Password input labelr"}
    );

    return (
        <div className={classes.loginSection}>
            <Typography variant={"h4"} className={classes.loginHeader}>
                <FormattedMessage
                    description="message"
                    defaultMessage="Login"
                    id="login.header"
                />
            </Typography>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                {({getFieldProps, handleSubmit, errors, touched}) => (
                    <>
                        <form onSubmit={handleSubmit} method={POST} className={classes.loginForm}>
                            <TextField
                                fullWidth
                                className={classes.input}
                                variant={"outlined"}
                                label={emailInput}
                                placeholder={emailPlaceholder}
                                type={"email"}
                                name={"email"}
                                error={(errors.email && touched.email)}
                                helperText={((errors.email && touched.email) ? errors.email : " ")}
                                {...getFieldProps('email')}
                            />
                            <TextField
                                fullWidth
                                className={classes.input}
                                variant={"outlined"}
                                label={passwordInput}
                                placeholder={passwordPlaceholder}
                                type={isPasswordVisible ? "text" : "password"}
                                error={(errors.password && touched.password)}
                                helperText={((errors.password && touched.password) ? errors.password : " ")}
                                {...getFieldProps('password')}
                                InputProps={{
                                    endAdornment: <InputAdornment position={"end"}>
                                        <IconButton
                                            onClick={handleVisibilityChange}
                                        >
                                            {isPasswordVisible ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                }
                            />
                            {(wasLoginRequested && !loginSucceeded) && (
                                <Typography
                                    variant={"subtitle1"}
                                    align={"center"}
                                    color={"red"}
                                >
                                    {loginError.message}
                                </Typography>
                            )}
                            <Button
                                variant={"contained"}
                                size={"large"}
                                type={"submit"}
                                className={classes.submitButton}>
                                <FormattedMessage
                                    description="log in button"
                                    defaultMessage="Log in"
                                    id="login.loginButton"
                                />
                            </Button>
                        </form>
                    </>
                )}
            </Formik>
            <div className={classes.registerHint}>
                <Typography variant={"subtitle1"}>
                    <FormattedMessage
                        description="no account yet"
                        defaultMessage="Don't have an account yet?"
                        id="login.noAccountYet"
                    />
                </Typography>
                <Button variant={"text"} size={"large"} onClick={handleNavigationToRegisterPage}>
                    <FormattedMessage
                        description="sign up"
                        defaultMessage="Sign up"
                        id="login.signUp"
                    />
                </Button>
            </div>
        </div>
    );
};

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    isPasswordVisible: PropTypes.bool.isRequired,
    handleVisibilityChange: PropTypes.func.isRequired,
    handleNavigationToRegisterPage: PropTypes.func.isRequired
};

export default injectIntl(LoginForm);