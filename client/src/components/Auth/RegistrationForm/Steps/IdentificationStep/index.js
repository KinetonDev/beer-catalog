import React from 'react';
import PropTypes from 'prop-types';
import {Button, TextField} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import useStyle from './styles'

const IdentificationStep = ({nextStep, handleChange, handleBlur, values, touched, errors, areInputsInvalid}) => {
    const classes = useStyle();

    return (
        <div>
            <div className={classes.inputs}>
                <TextField fullWidth variant={"outlined"} label={"Username"}
                           placeholder={"Write your username here."}
                           className={classes.input}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           value={values.username}
                           error={errors.username && touched.username}
                           helperText={(errors.username && touched.username) ?  errors.username : ""}
                           name="username"
                />
                <TextField fullWidth variant={"outlined"} label={"Email"}
                           placeholder={"And email here."}
                           className={classes.input}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           value={values.email}
                           error={errors.email && touched.email}
                           helperText={(errors.email && touched.email) ?  errors.email : ""}
                           name="email"
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
    handleBlur: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
    areInputsInvalid: PropTypes.bool.isRequired
};

export default IdentificationStep;