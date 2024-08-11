import React, { useContext } from 'react';
import UserContext from '../../../providers/UserContext';
import { LOCALES, translate } from '../../../i18n';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import FlagIcon from '@mui/icons-material/Flag';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const LanguageSelector = () => {
    const { setLocale } = (useContext(UserContext) as any);
    const [open, setOpen] = React.useState(false);
    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={() => setOpen(false)}>
            <List>
                {Object.keys(LOCALES).map((name, index) => (
                    <ListItem key={(LOCALES as any)[name]} disablePadding>
                        <ListItemButton onClick={() => setLocale((LOCALES as any)[name])}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <FlagCircleIcon /> : <FlagIcon />}
                            </ListItemIcon>
                            <ListItemText primary={translate((LOCALES as any)[name] + "_full")} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
    return (
        <>
            <IconButton
                color="inherit"
                aria-label="change language"
                edge="start"
                onClick={() => setOpen(true)}
                sx={{ mr: 2 }}
            >
                <FlagCircleIcon />
            </IconButton>
            <Drawer
                anchor="top"
                open={open}
                onClose={() => setOpen(false)}
            >
                {DrawerList}
            </Drawer>
        </>
    );
};

export default LanguageSelector;