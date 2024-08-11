import React, { useState } from 'react';
import translate from '../../../i18n/translate';
import { NotifyData, HideNotification, setNotifyListener } from '../../../providers/Notifier';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import './NotificationBar.css';

const NotificationBar = () => {
    const [message, setMessage] = useState<NotifyData>(HideNotification);

    setNotifyListener(setMessage);

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setMessage(HideNotification);
    };
    const action = (
        <>
            <Button color="secondary" size="small" onClick={handleClose}>
                OK
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
            <CloseIcon fontSize="small" />
            </IconButton>
        </>
    );
    const messageElement = message.kind ? <div className={"notification-bar__" + message.kind}>{message.message && translate(message.message)}</div> : null; 
    return (
        <>
            <Snackbar
                open={!!message.kind}
                anchorOrigin={{ vertical: "top", horizontal:"center" }}
                autoHideDuration={6000}
                onClose={handleClose}
                message={messageElement }
                action={action}
            />
        </>
 
    );
};

export default NotificationBar;