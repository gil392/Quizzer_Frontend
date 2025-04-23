import { createStyles } from '@mui/styles';

export const styles = createStyles({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    formSection: { marginTop: '0.5em', width: '50%' },
    textField: {
        '&.MuiTextField-root': {
            margin: '0.5em 0'
        }
    },
    registerBtn: {
        '&.MuiButton-root': {
            margin: '1em 0'
        }
    }
});
