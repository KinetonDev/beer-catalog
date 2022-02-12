import React from 'react';
import PropTypes from 'prop-types';
import {Button, TextField} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import useStyle from './styles'

const IdentificationStep = ({nextStep, onUsernameChange, onEmailChange}) => {
    const classes = useStyle();

    return (
        <div>
            <div className={classes.inputs}>
                <TextField fullWidth variant={"outlined"} label={"Username"}
                           placeholder={"Write your username here."}
                           className={classes.input}
                           onChange={onUsernameChange}
                />
                <TextField fullWidth variant={"outlined"} label={"Email"}
                           placeholder={"And email here."}
                           className={classes.input}
                           onChange={onEmailChange}
                />
            </div>
            <div className={classes.buttons}>
                <Button
                    startIcon={<ArrowBackIcon/>}
                    variant={"outlined"}
                >
                    Cancel
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

IdentificationStep.propTypes = {
    nextStep: PropTypes.func.isRequired,
    onEmailChange: PropTypes.func.isRequired,
    onUsernameChange: PropTypes.func.isRequired,
};

export default IdentificationStep;