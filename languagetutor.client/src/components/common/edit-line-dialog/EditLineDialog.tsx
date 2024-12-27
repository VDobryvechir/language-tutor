
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';

import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { RepetitionModel } from '../../../models/RepetitionModel';
import translate from '../../../i18n/translate';
import "./EditLineDialog.css";
import React, { useState } from 'react';
export interface Props {
    open: boolean;
    model: RepetitionModel;
    index: number;
    onClose: (model?: RepetitionModel) => void;
}
interface KeyValue {
    key: string;
    value: string;
};
const EditLineDialog = ({ onClose, model, open, index }: Props) => {
    if (!open) {
        return <></>;
    }
    const initLineKeyValue = ():KeyValue[] => {
        const res: KeyValue[] = [];
        res.push({ key: model.sourceLanguage, value: model.sourceLines[index] || "" })
        model.targetLanguages.forEach((key, ind) => {
            res.push({ key: key, value: model.targetLines[ind] && model.targetLines[ind][index] || "" })
        });
        console.log(res, model);
        return res;
    };
    const [lineKeyValues, setLineKeyValue] = useState(initLineKeyValue());
    const handleClose = () => {
        onClose();
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, key: string) => {
        const data = event.target.value;
        const n = lineKeyValues.length;
        for (let i = 0; i < n; i++) {
            if (lineKeyValues[i].key === key) {
                const values = lineKeyValues.slice();
                values[i].value = data;
                setLineKeyValue(values);
                break;
            }
        }
    };
    const handleSave = () => {
        const sourceLines = model.sourceLines || [];
        sourceLines[index] = lineKeyValues[0].value;
        const targetLines = model.targetLines || [];
        const n = lineKeyValues.length;
        for (let i = 1; i < n; i++) {
            targetLines[i - 1][index] = lineKeyValues[i].value;
        }
        onClose({
            ...model,
            sourceLines: sourceLines,
            targetLines: targetLines,
        })
    };
    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>
                <div className="dictionary-dialog__title">
                    <div>
                        {index + 1}
                    </div>
                    <div className="dictionary-dialog__title-control">
                        <span> <Avatar onClick={handleClose}>
                            <CloseIcon />
                        </Avatar></span>
                    </div>
                </div>
            </DialogTitle>
            <div className="dictionary-dialog__content" key="dialog-content">
                    <List sx={{ pt: 0 }} key="dialog_list">
                    < ListItem disableGutters>
                       <div>
                        {  
                            lineKeyValues.map((item: KeyValue) => (
                                <div key={item.key }>
                                    <span>
                                        {translate(item.key)}
                                    </span>
                                    <span>
                                        <TextField
                                            fullWidth
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event, item.key)}
                                            value={item.value}
                                        />
                                    </span>
                                </div>
                            ))
                            }
                        </div>
                    </ListItem>

                    < ListItem disableGutters>
                        <ListItemButton
                            autoFocus
                            onClick={() => handleClose()}
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    <CloseIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Cancel" />
                        </ListItemButton>
                        <ListItemButton
                            onClick={() => handleSave()}
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    <SaveIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Save" />
                        </ListItemButton>
                    </ListItem> 

                    </List>
            </div>
        </Dialog>
    );
}

export default EditLineDialog;
