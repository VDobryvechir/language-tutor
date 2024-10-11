import { useState } from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import translate from '../../../i18n/translate';
import { downloadMedia } from '../../../providers/DownloadUtils';
import "./DownloadDialog.css";
export interface Props {
    open: boolean;
    operation: string;
    url: string;
    method: string;
    fileName: string;
    payload: any;
    onClose: (value: string) => void;
}
const DownloadDialog = ({ onClose, operation, open, url, method, payload, fileName }: Props) => {
    const [name, setName] = useState(fileName);

    const handleClose = () => {
        onClose("");
    };

    const handleListItemClick = (name: string) => {
        downloadMedia(url, method, payload, name + ".odt").then(() => {
            onClose("");
        }).catch(() => {
            onClose("Error");
        });
    };


    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>{translate(operation || "Action")}</DialogTitle>
            <div className="download-dialog__content">
                <TextField
                    label="Name"
                    variant="standard"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <List sx={{ pt: 0 }}>
                    < ListItem disableGutters>
                        <ListItemButton
                            autoFocus
                            onClick={() => handleListItemClick(name)}
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    <DownloadIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={translate("Download")} />
                        </ListItemButton>
                    </ListItem> 
                </List>
            </div>
        </Dialog>
    );
}

export default DownloadDialog;
