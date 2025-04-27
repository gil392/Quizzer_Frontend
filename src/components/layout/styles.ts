import { Theme } from '@mui/material';
import { createStyles } from '@mui/styles';

export const rootSx = (theme: Theme) => ({
    width: `calc(100vw - ${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(100vw - ${theme.spacing(8)} + 1px)`
    }
});

export const styles = createStyles({
    root: {
        height: '100%',
        margin: '0 auto',
        padding: '2rem',
        textAlign: 'center',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'auto'
    }
});
