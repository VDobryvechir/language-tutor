import React from 'react';
import { translate } from '../../../i18n';
import { Link } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { MenuListData } from './MenuList';

const MenuSelector = () => {
    const [open, setOpen] = React.useState(false);
    
    const setMenuAction = (action: string) => {
        console.log(action);
    };
    const DrawerList = (start:number, end:number) => (
            <List>
                {MenuListData.slice(start, end).map((menu) => (
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
                    {DrawerList(0, MenuListData.length - 1)}
                    <Divider />
                    {DrawerList(MenuListData.length - 1, MenuListData.length)}
                </Box>
            </Drawer>
        </>
    );
};

export default MenuSelector;