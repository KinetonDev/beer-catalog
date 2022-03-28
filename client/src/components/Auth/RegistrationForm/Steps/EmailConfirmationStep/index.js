import React from 'react';
import {CircularProgress, TextField, Typography, InputAdornment} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import useStyle from './styles'
import PropTypes from 'prop-types'

function showIcon(isConfirmationProcessing, confirmationSucceeded, wasConfirmationRequested) {
    if (isConfirmationProcessing) return (<CircularProgress/>);
    if (wasConfirmationRequested && !isConfirmationProcessing) return confirmationSucceeded ? (<CheckIcon color={"success"} sx={{
        width: "40px",
        height: "40px",
    }}/>) : (<CloseIcon color={"error"} sx={{
        width: "40px",
        height: "40px",
    }}/>);
    return null;
}

const EmailConfirmationStep = ({handleChange, handleBlur, values, touched, errors, isConfirmationProcessing, confirmationSucceeded, wasConfirmationRequested}) => {
    const classes = useStyle();

    return (
        <div>
            <Typography variant={"h6"}>Email confirmation</Typography>
            <Typography variant={"body1"}>We've sent an email confirmation to your email. The letter will include the
                code, please, type it in the field below. If you don't see anything, please check your Spam
                folder.</Typography>
            <div className={classes.codeInput}>
                <TextField
                    inputProps={{maxLength: 6}} variant={"outlined"} label={"Confirmation code"}
                    placeholder={"Code"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.code}
                    error={errors.code && touched.code}
                    helperText={(errors.code && touched.code) ? errors.code : " "}
                    name="code"
                />
                {showIcon(isConfirmationProcessing, confirmationSucceeded, wasConfirmationRequested)}
            </div>
        </div>
    );
};

EmailConfirmationStep.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
};

export default EmailConfirmationStep;