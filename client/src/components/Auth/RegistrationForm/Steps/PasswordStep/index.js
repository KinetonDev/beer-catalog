import React from 'react';
import PropTypes from 'prop-types';
import {Button, TextField} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import useStyle from './styles'

const PasswordStep = ({nextStep, prevStep, handleChange, handleBlur, values, errors, touched, areInputsInvalid}) => {
    const classes = useStyle();

    return (
        <div>
            <div className={classes.inputs}>
                <TextField fullWidth variant={"outlined"} label={"Password"}
                           placeholder={"Write your password here."}
                           className={classes.input}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           value={values.password}
                           error={errors.password && touched.password}
                           helperText={(errors.password && touched.password) ? errors.password : ""}
                           name="password"
                />
                <TextField fullWidth variant={"outlined"} label={"Confirm password"}
                           placeholder={"Repeat your password here."}
                           className={classes.input}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           value={values.confirmationPassword}
                           error={errors.confirmationPassword && touched.confirmationPassword}
                           helperText={(errors.confirmationPassword && touched.confirmationPassword) ? errors.confirmationPassword : ""}
                           name="confirmationPassword"
                />
            </div>
            <div className={classes.buttons}>
                <Button
                    startIcon={<ArrowBackIcon/>}
                    onClick={() => prevStep()}
                    variant={"outlined"}
                >
                    Previous
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

PasswordStep.propTypes = {
    nextStep: PropTypes.func.isRequired,
    prevStep: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
    areInputsInvalid: PropTypes.bool.isRequired
};

export default PasswordStep;