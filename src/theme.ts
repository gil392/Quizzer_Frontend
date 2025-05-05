import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#6750A4',
            light: '#E8DEF8',
            contrastText: '#FFFFFF'
        },
        secondary: {
            main: '#625B71'
        },
        background: {
            default: '#FFFBFE',
            paper: '#FFFFFF'
        },
        error: {
            main: '#B3261E'
        },
        text: {
            primary: '#1C1B1F',
            secondary: '#49454F'
        }
    },
    components: {
        MuiButton: {
            defaultProps: {
                style: { textTransform: 'none' }
            }
        }
    }
});

export default theme;
