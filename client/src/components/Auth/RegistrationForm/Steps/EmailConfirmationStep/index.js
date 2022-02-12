import React from 'react';
import {TextField, Typography} from "@mui/material";
import useStyle from './styles'

const EmailConfirmationStep = (props) => {
    const classes = useStyle();

    return (
        <div>
            <Typography variant={"h6"}>Email confirmation</Typography>
            <Typography variant={"body1"}>We've sent an email confirmation to your email. The letter will include the
                code, please, type it in the field below. If you don't see anything, please check your Spam
                folder.</Typography>
            <div className={classes.codeInput}>
                <TextField
                    inputProps={{maxLength: 6}}
                    variant={"outlined"}
                    label={"Confirmation code"}
                />
            </div>
        </div>
    );
};

EmailConfirmationStep.propTypes = {

};

export default EmailConfirmationStep;