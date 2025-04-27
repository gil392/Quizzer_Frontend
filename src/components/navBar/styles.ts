import { CSSObject, Drawer as MuiDrawer, styled, Theme } from '@mui/material';

const drawerWidth = 200;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
    }),
    overflowX: 'hidden'
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`
    }
});

export const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open'
})(({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    maxWidth: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        maxWidth: `calc(${theme.spacing(8)} + 1px)`
    },
    variants: [
        {
            props: ({ open }) => open,
            style: {
                ...openedMixin(theme),
                '& .MuiDrawer-paper': openedMixin(theme)
            }
        },
        {
            props: ({ open }) => !open,
            style: {
                ...closedMixin(theme),
                '& .MuiDrawer-paper': closedMixin(theme)
            }
        }
    ]
}));

export const listSx = {
    flexGrow: 1
};

export const logoBoxSx = (open: boolean) => ({
    py: 1,
    px: 2.5,
    display: 'flex',
    justifyContent: open ? 'initial' : 'center',
    mr: 'auto'
});

export const listItemSx = { display: 'block' };

export const listItemIconSx = (open: boolean) => ({
    minWidth: 0,
    justifyContent: 'center',
    mr: open ? 3 : 'auto'
});

export const listItemButtonSx = (open: boolean) => ({
    minHeight: 48,
    px: 2.5,
    justifyContent: open ? 'initial' : 'center'
});

export const listItemTextSx = (open: boolean) => ({
    opacity: open ? 1 : 0
});
