import React from 'react';
import useStyle from './styles'
import {Formik} from 'formik'
import {Button, IconButton, InputAdornment, TextField, Typography} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {POST} from "../../../helpers/HTTPMethods";
import PropTypes from 'prop-types'
import validationSchema from "./validationSchema";

const LoginForm = (
    {
        handleSubmit,
        isPasswordVisible,
        handleVisibilityChange,
        handleNavigationToRegisterPage,
        loginError,
        loginSucceeded,
        wasLoginRequested
    }) => {
    const classes = useStyle();

    return (
        <div className={classes.loginSection}>
            <Typography variant={"h4"} className={classes.loginHeader}>Login</Typography>
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
                                label={"Email"}
                                placeholder={"Write your email here"}
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
                                label={"Password"}
                                placeholder={"Write your password here"}
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
                                Log in
                            </Button>
                        </form>
                    </>
                )}
            </Formik>
            <div className={classes.registerHint}>
                <Typography variant={"subtitle1"}>
                    Don't have an account yet?
                </Typography>
                <Button variant={"text"} size={"large"} onClick={handleNavigationToRegisterPage}>
                    Sign up
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

export default LoginForm;