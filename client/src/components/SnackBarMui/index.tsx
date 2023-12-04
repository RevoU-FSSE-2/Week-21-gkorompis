import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';



const CustomizedSnackbars=({openSnackBar, setOpenSnackBar, message, severity}:any)=> {
//   const [open, setOpen] = React.useState(false);
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
  const handleClick = () => {
    setOpenSnackBar(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBar(false);
  };

  return (
      <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity || "error"} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
  );
}

export default CustomizedSnackbars;