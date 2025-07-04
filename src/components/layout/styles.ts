import { createStyles } from '@mui/styles';

export const styles = createStyles({
    root: {
        width: '100%',
        padding: '0 2rem',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'auto',
        flexGrow: 1
    },
    noPadding: {
        padding: 0
    }
});
