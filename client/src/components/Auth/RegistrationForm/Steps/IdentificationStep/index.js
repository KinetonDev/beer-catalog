import React from 'react';
import PropTypes from 'prop-types';
import {Button, TextField} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import useStyle from './styles'

const IdentificationStep = (props) => {
    const classes = useStyle();

    return (
        <div>
            <div className={classes.inputs}>
                <TextField fullWidth variant={"outlined"} label={"Username"}
                           placeholder={"Write your username here."}
                           className={classes.input}
                />
                <TextField fullWidth variant={"outlined"} label={"Email"}
                           placeholder={"And email here."}
                           className={classes.input}
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
                    onClick={() => props.nextStep()}
                    variant={"contained"}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

IdentificationStep.propTypes = {
    nextStep: PropTypes.func.isRequired
};

export default IdentificationStep;