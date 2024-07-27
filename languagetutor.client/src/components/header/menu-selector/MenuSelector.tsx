import React from 'react';
import { translate } from '../../../i18n';
import { Link } from 'react-router-dom';
import BookIcon from '@mui/icons-material/Book';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import TranslateIcon from '@mui/icons-material/Translate';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const MenuSelector = () => {
    const [open, setOpen] = React.useState(false);
    const menuList = [
        { name: "Books", action: "book", icon: <BookIcon /> },
        { name: "Translate", action: "translate", icon: <TranslateIcon /> },
        { name: "Dictionary", action: "dictionary", icon: <SpellcheckIcon /> },
        { name: "Settings", action: "settings", icon: <SettingsIcon /> },
    ];
    const setMenuAction = (action: string) => {
        console.log(action);
    };
    const DrawerList = (start:number, end:number) => (
            <List>
                {menuList.slice(start, end).map((menu) => (
                    <ListItem key={menu.name} disablePadding>
                        <Link to={menu.action}>
                            <ListItemButton onClick={() => setMenuAction(menu.action) }>
                                <ListItemIcon>
                                    {menu.icon}
                                </ListItemIcon>
                                <ListItemText primary={translate(menu.name)} />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
    );
    return (
        <>
            <IconButton
                color="inherit"
                aria-label="menu selection"
                edge="start"
                onClick={() => setOpen(true)}
                sx={{ mr: 2 }}
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                anchor="top"
                open={open}
                onClose={() => setOpen(false)}
            >
                <Box sx={{ width: 250 }} role="presentation" onClick={() => setOpen(false)}>
                    {DrawerList(0, 3)}
                    <Divider />
                    {DrawerList(3, 4)}
                </Box>
            </Drawer>
        </>
    );
};

export default MenuSelector;