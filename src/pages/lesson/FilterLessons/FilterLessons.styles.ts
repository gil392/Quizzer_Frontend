import { createStyles } from "@mui/styles";

const styles = createStyles({
    filterContainer: {
        marginTop: '1rem',
        marginBottom: '1rem'
    },
    filterPaper: {
        '&.MuiPaper-root': {
            backgroundColor: 'rgba(245, 245, 245, 1)',
        },
        padding: '1rem',
        marginBottom: '1rem'
    },
    filterHeader: {
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '1rem'
    },
    filterBody: {
        display: 'flex', 
        flexWrap: 'wrap',
        gap: '1rem'
    },
    searchTextContainer: {
        flex: '1 1 200px', 
        minWidth: '200px'
    }
})

export default styles;