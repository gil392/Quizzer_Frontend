import { HomeFilled, LogoDev, School } from '@mui/icons-material';
import { Box, Divider, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { FunctionComponent, ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PAGES_ROUTES } from '../../routes/routes.const';
import {
    Drawer,
    listItemButtonSx,
    listItemIconSx,
    listItemTextSx,
    logoBoxSx
} from './styles';

const navBarNavigations: {
    text: string;
    icon: ReactNode;
    route: keyof typeof PAGES_ROUTES;
}[] = [
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
        <ListItem disablePadding sx={{ display: 'block' }}>
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
                <LogoDev />
                {open ? (
                    <Typography textAlign='center'>Quizzer</Typography>
                ) : null}
            </Box>
            <Divider />
            <List>
                {navBarItems}
                {/* <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton sx={listItemButtonSx(open)}>
                        <ListItemIcon sx={listItemIconSx(open)}>
                            <HomeFilled />
                        </ListItemIcon>
                        <ListItemText
                            primary='Home'
                            sx={listItemTextSx(open)}
                        />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton sx={listItemButtonSx(open)}>
                        <ListItemIcon sx={listItemIconSx(open)}>
                            <School />
                        </ListItemIcon>
                        <ListItemText
                            primary='Lessons'
                            sx={listItemTextSx(open)}
                        />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton sx={listItemButtonSx(open)}>
                        <ListItemIcon sx={listItemIconSx(open)}>
                            <Quiz />
                        </ListItemIcon>
                        <ListItemText
                            primary='Quiz'
                            sx={listItemTextSx(open)}
                        />
                    </ListItemButton>
                </ListItem> */}
            </List>
        </Drawer>
    );
};

export default NavBar;
