import { HomeFilled, LogoDev, Quiz, School } from '@mui/icons-material';
import { Box, Divider, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { FunctionComponent, useState } from 'react';
import { Drawer, listItemButtonSx, listItemIconSx, listItemTextSx, logoBoxSx } from './styles';

const navBarNavigations: ({
    text: string;
    icon: ReactNode;
    route: keyof PAGES_ROUTES
})[] = [
    {
        text: 'Home',
        icon: <HomeFilled />
        route: 'HOME'
    },
    {
        text: 'Lessons',
        icon: <School />
        route: 'LESSONS_LIST'
    }
]

const NavBar: FunctionComponent = () => {
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

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
                <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton sx={listItemButtonSx(open)}>
                        <ListItemIcon sx={listItemIconSx(open)}>
                            <HomeFilled />
                        </ListItemIcon>
                        <ListItemText primary='Home' sx={listItemTextSx(open)} />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton sx={listItemButtonSx(open)}>
                        <ListItemIcon sx={listItemIconSx(open)}>
                            <School />
                        </ListItemIcon>
                        <ListItemText primary='Lessons' sx={listItemTextSx(open)} />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton sx={listItemButtonSx(open)}>
                        <ListItemIcon sx={listItemIconSx(open)}>
                            <Quiz />
                        </ListItemIcon>
                        <ListItemText primary='Quiz' sx={listItemTextSx(open)} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
};

export default NavBar;
