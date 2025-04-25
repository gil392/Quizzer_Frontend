import { createStyles } from '@mui/styles';

export const styles = createStyles({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    formSection: { marginTop: '0.5em', width: '33%' },
    textField: {
        '&.MuiTextField-root': {
            margin: '0.5em 0'
        }
    },
    loginButton: {
        '&.MuiButton-root': {
            margin: '1em 0'
        }
    },
    goToRegisterButton: {
        '&.MuiButton-root': {
            position: 'absolute',
            top: 0,
            right: 0,
            margin: '1em',
            color: 'black',
            borderColor: 'grey'
        }
    }
});
