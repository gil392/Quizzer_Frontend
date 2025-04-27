import { HomeFilled, LogoDev, School, Settings } from '@mui/icons-material';
import { Box, Divider, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PAGES_ROUTES } from '../../routes/routes.const';
import {
    Drawer,
    listItemButtonSx,
    listItemIconSx,
    listItemSx,
    listItemTextSx,
    listSx,
    logoBoxSx
} from './styles';
import { NavBarItem } from './types';

const navBarNavigations: readonly NavBarItem[] = [
    {
        text: 'Home',
        icon: <HomeFilled />,
        route: 'HOME'
    },
    {
        text: 'Lessons',
        icon: <School />,
        route: 'LESSONS_LIST'
    }
];

const NavBar: FunctionComponent = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const createNavigationHandle = (to: keyof typeof PAGES_ROUTES) => () =>
        navigate(PAGES_ROUTES[to]);

    const navBarItems = navBarNavigations.map(({ text, icon, route }) => (
        <ListItem disablePadding sx={listItemSx}>
            <ListItemButton
                sx={listItemButtonSx(open)}
                onClick={createNavigationHandle(route)}
            >
                <ListItemIcon sx={listItemIconSx(open)}>{icon}</ListItemIcon>
                <ListItemText primary={text} sx={listItemTextSx(open)} />
            </ListItemButton>
        </ListItem>
    ));

    return (
        <Drawer
            variant='permanent'
            open={open}
            onMouseEnter={handleDrawerOpen}
            onMouseLeave={handleDrawerClose}
        >
            <Box sx={logoBoxSx(open)}>
                <LogoDev sx={listItemIconSx(open)} />
                {open ? (
                    <Typography textAlign='center'>Quizzer</Typography>
                ) : null}
            </Box>
            <Divider />
            <List sx={listSx}>{navBarItems}</List>
            <Divider />
            <Box>
                <ListItemButton sx={listItemButtonSx(open)} disabled>
                    <ListItemIcon sx={listItemIconSx(open)}>
                        <Settings />
                    </ListItemIcon>
                    <ListItemText primary='Setting' sx={listItemTextSx(open)} />
                </ListItemButton>
            </Box>
        </Drawer>
    );
};

export default NavBar;
