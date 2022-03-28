import React from 'react';
import PropTypes from 'prop-types';
import {Button, TextField} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import useStyle from './styles'

const IdentificationStep = (
    {
        nextStep,
        handleChange,
        handleUsernameBlur,
        handleEmailBlur,
        values,
        touched,
        errors,
        areInputsInvalid,
        userWithEmailExists,
        userWithUsernameExists,
        navigateToLoginPage
    }) => {
    const classes = useStyle();

    return (
        <div>
            <div className={classes.inputs}>
                <TextField fullWidth variant={"outlined"} label={"Username"}
                           placeholder={"Write your username here."}
                           className={classes.input}
                           onChange={handleChange}
                           onBlur={handleUsernameBlur}
                           value={values.username}
                           error={(errors.username && touched.username) || (userWithUsernameExists && touched.username)}
                           helperText={((errors.username && touched.username) ?  errors.username : " ") ?
                               errors.username : (userWithUsernameExists ? "User with that username already exists" : "")}
                           name="username"
                />
                <TextField fullWidth variant={"outlined"} label={"Email"}
                           placeholder={"And email here."}
                           className={classes.input}
                           onChange={handleChange}
                           onBlur={handleEmailBlur}
                           value={values.email}
                           error={(errors.email && touched.email) || (userWithEmailExists && touched.email)}
                           helperText={((errors.email && touched.email) ?  errors.email : " ") ?
                               errors.email : (userWithEmailExists ? "User with that email already exists" : "")}
                           name="email"
                />
            </div>
            <div className={classes.buttons}>
                <Button
                    startIcon={<ArrowBackIcon/>}
                    variant={"outlined"}
                    onClick={navigateToLoginPage}
                >
                    Cancel
                </Button>
                <Button
                    endIcon={<ArrowForwardIcon/>}
                    onClick={() => nextStep()}
                    variant={"contained"}
                    disabled={areInputsInvalid}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

IdentificationStep.propTypes = {
    nextStep: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
    areInputsInvalid: PropTypes.bool.isRequired
};

export default IdentificationStep;