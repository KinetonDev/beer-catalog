import React from 'react';
import PropTypes from 'prop-types';
import {Button, TextField} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import useStyle from './styles'

const PasswordStep = ({nextStep, prevStep, onPasswordChange}) => {
    const classes = useStyle();

    return (
        <div>
            <div className={classes.inputs}>
                <TextField fullWidth variant={"outlined"} label={"Password"}
                           placeholder={"Write your password here."}
                           className={classes.input}
                           onChange={onPasswordChange}
                />
                <TextField fullWidth variant={"outlined"} label={"Confirm password"}
                           placeholder={"Password confirmation."}
                           className={classes.input}
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
    onPasswordChange: PropTypes.func.isRequired
};

export default PasswordStep;