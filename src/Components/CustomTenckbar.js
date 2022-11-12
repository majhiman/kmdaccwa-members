import React from 'react'
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomTenckbar = ({snackbarOpen,handlesnackbarClose,snackbarMessage,snackbarSeverity}) => {
  return (
    <div>
        <Stack spacing={2} sx={{ width: '100%' }}>
            
            <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={handlesnackbarClose}>
                <Alert onClose={handlesnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Stack>
    </div>
  )
}

export default CustomTenckbar