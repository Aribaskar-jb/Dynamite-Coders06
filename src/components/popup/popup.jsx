/* eslint-disable */
import { useState, useEffect ,forwardRef} from 'react';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function PositionedSnackbar(props) {
  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ ...newState, open: true });
    setTimeout(() => {
      setState({ ...newState, open: false });
    }, 5000);
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  useEffect(() => {
    if (props.msg && props.msg.length > 0 && props.msg !== state.message) {
      handleClick({ vertical: 'top', horizontal: 'center' })();
    }
  }, [props.msg, state.message]);

  const snackbarStyle = {
    background: 'transparent', // Transparent red color
  };

  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        // severity="error"
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={props.msg}
        key={vertical + horizontal}
        style={snackbarStyle}
      >
        <Alert severity="error">{props.msg}</Alert>
      </Snackbar>
    </Box>
  );
}
