import { Box, Button } from '@mui/material';
import { FunctionComponent } from 'react';

interface EditingActionsProps {
    saveEdit: () => void;
    cancelEditing: () => void;
}

const EditingActions: FunctionComponent<EditingActionsProps> = (props) => {
    const { saveEdit, cancelEditing } = props;

    return (
        <Box display='flex' gap={2} mt={3}>
            <Button variant='contained' color='primary' onClick={saveEdit}>
                Save
            </Button>
            <Button
                variant='outlined'
                color='secondary'
                onClick={cancelEditing}
            >
                Cancel
            </Button>
        </Box>
    );
};

export default EditingActions;
