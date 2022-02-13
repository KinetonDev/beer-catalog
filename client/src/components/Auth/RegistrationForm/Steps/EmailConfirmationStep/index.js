import React from 'react';
import {CircularProgress, TextField, Typography, InputAdornment} from "@mui/material";
import useStyle from './styles'
import PropTypes from 'prop-types'

const EmailConfirmationStep = ({handleChange, handleBlur, isSubmitting, values, touched, errors}) => {
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
                    helperText={(errors.code && touched.code) ? errors.code : ""}
                    name="code"
                />
                {isSubmitting && <CircularProgress/>}
            </div>
        </div>
    );
};

EmailConfirmationStep.propTypes = {
    isSubmitting: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
};

export default EmailConfirmationStep;