import { HomeFilled, LogoDev, Quiz, School } from '@mui/icons-material';
import { Box, Divider, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { FunctionComponent, useState } from 'react';
import { Drawer } from './styles';

const NavBar: FunctionComponent = () => {
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const logoBoxSx = {
        py: 1,
        px: 2.5,
        display: 'flex',
        justifyContent: open ? 'initial' : 'center',
        mr: 'auto'
    };

    const listItemIconSx = {
        minWidth: 0,
        justifyContent: 'center',
        mr: open ? 3 : 'auto'
    };

    const listItemButtonSx = {
        minHeight: 48,
        px: 2.5,
        justifyContent: open ? 'initial' : 'center'
    };

    const listItemTextSx = {
        opacity: open ? 1 : 0
    };
    return (
        <Drawer
            variant='permanent'
            open={open}
            onMouseEnter={handleDrawerOpen}
            onMouseLeave={handleDrawerClose}
        >
            <Box sx={logoBoxSx}>
                <LogoDev />
                {open ? (
                    <Typography textAlign='center'>Quizzer</Typography>
                ) : null}
            </Box>
            <Divider />
            <List>
                <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton sx={listItemButtonSx}>
                        <ListItemIcon sx={listItemIconSx}>
                            <HomeFilled />
                        </ListItemIcon>
                        <ListItemText primary='Home' sx={listItemTextSx} />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton sx={listItemButtonSx}>
                        <ListItemIcon sx={listItemIconSx}>
                            <School />
                        </ListItemIcon>
                        <ListItemText primary='Lessons' sx={listItemTextSx} />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton sx={listItemButtonSx}>
                        <ListItemIcon sx={listItemIconSx}>
                            <Quiz />
                        </ListItemIcon>
                        <ListItemText primary='Quiz' sx={listItemTextSx} />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton sx={listItemButtonSx}>
                        <ListItemIcon sx={listItemIconSx}>
                            <Quiz />
                        </ListItemIcon>
                        <ListItemText primary='Quiz' sx={listItemTextSx} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
};

export default NavBar;
