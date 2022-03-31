import React from 'react';
import PropTypes from 'prop-types';
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {Avatar, CardMedia, Dialog} from "@mui/material";
import useStyle from './styles'

const AvatarDialog = (
    {
        isOpened,
        handleClose,
        handleAvatarChanging,
        handleAvatarSaving,
        avatarBase64
    }) => {
    const classes = useStyle();

    return (
        <div>
            <Dialog open={isOpened} onClose={handleClose}>
                <DialogContent className={classes.avatars}>
                    <Avatar
                        sx={{ width: 300, height: 300, marginRight: "10px"}}
                        src={avatarBase64}
                    />
                    <Avatar
                        sx={{ width: 100, height: 100}}
                        src={avatarBase64}
                    />
                </DialogContent>
                <DialogActions className={classes.actions}>
                    <Button onClick={handleAvatarChanging}>Select new file...</Button>
                    <Button onClick={() => {
                        handleAvatarSaving();
                        handleClose();
                    }}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

AvatarDialog.propTypes = {};

export default AvatarDialog;