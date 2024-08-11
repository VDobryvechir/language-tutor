import { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import TextField from '@mui/material/TextField';
import { blue } from '@mui/material/colors';
import { getDbKeyList, dbPayloadResponse } from '../../../providers/IndexedStorage';
import translate from '../../../i18n/translate';
import "./SaveOpenDialog.css";
export interface Props {
    open: boolean;
    operation: string;
    dbparams: string;
    onClose: (value: string) => void;
}
const SaveOpenDialog = ({ onClose, operation, dbparams, open }: Props) => {
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        if (open) {
            getDbKeyList({
                dbparams: dbparams,
                filter: filter,
                limit: 24,
                response: (res: dbPayloadResponse) => {
                    if (res.error || !res.payload) {
                        console.log("Error ", res.error);
                    } else {
                        setItems(res.payload);
                    }
                },
            });
        }
    }, [filter, open]);

    const handleClose = () => {
        onClose("");
    };

    const handleListItemClick = (value: string) => {
        onClose(value);
    };


    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>{translate(operation)}</DialogTitle>
            <div className="save-open-dialog__content">
                <TextField
                    label="Name"
                    variant="standard"
                    value={filter}
                    onChange={(event) => setFilter(event.target.value)}
                />
                <List sx={{ pt: 0 }}>
                    {items.map((item) => (
                        <ListItem disableGutters key={item}>
                            <ListItemButton onClick={() => handleListItemClick(item)}>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                        <PersonIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={item} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                    {operation === "Save" ? < ListItem disableGutters>
                        <ListItemButton
                            autoFocus
                            onClick={() => handleListItemClick(filter)}
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    <AddIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Add new entry" />
                        </ListItemButton>
                    </ListItem> : null
                    }
                </List>
            </div>
        </Dialog>
    );
}

export default SaveOpenDialog;
