import React from 'react';
import PropTypes from 'prop-types';
import {Button, TextField} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import useStyle from './styles'

const PasswordStep = (props) => {
    const classes = useStyle();

    return (
        <div>
            <div className={classes.inputs}>
                <TextField fullWidth variant={"outlined"} label={"Password"}
                           placeholder={"Write your password here."}
                           className={classes.input}
                />
                <TextField fullWidth variant={"outlined"} label={"Confirm password"}
                           placeholder={"Password confirmation."}
                           className={classes.input}
                />
            </div>
            <div className={classes.buttons}>
                <Button
                    startIcon={<ArrowBackIcon/>}
                    onClick={() => props.prevStep()}
                    variant={"outlined"}
                >
                    Previous
                </Button>
                <Button
                    endIcon={<ArrowForwardIcon/>}
                    onClick={() => props.nextStep()}
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
};

export default PasswordStep;