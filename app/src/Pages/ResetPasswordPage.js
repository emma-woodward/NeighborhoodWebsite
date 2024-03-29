import React, { useState } from 'react';
import { TextField, Button, Snackbar, Alert, Card } from '@mui/material'
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import Slide from '@material-ui/core/Slide';

function ResetPassword() {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const [error, setError] = useState("");
  const [passwordResetSuccessful, setPasswordResetSuccessful] = useState(false);

  const { currentUser, resetPassword } = useAuth();
  var errorOccurred = false;

  function TransitionDown(props) {
    return <Slide {...props} direction="down" />;
  }

  const successScreen = (
    <div className="textCenter">
      <h1>Password Successfully Reset</h1>
      <Button variant="outlined">
        <Link to="/">Go back to home!</Link>
      </Button>
    </div>
  );

  const resetScreen = (
    <div>
      <h1>Reset Password</h1>
      <p style={{ color: "red" }}>{error}</p>
      <TextField
        onChange={(e) => {
          setOldPass(e.target.value);
        }}
        label="Old Password"
        style={{
          width: window.innerWidth / 4,
        }}
      ></TextField>{" "}
      <br /> <br />
      <TextField
        onChange={(e) => {
          setNewPass(e.target.value);
        }}
        label="New Password"
        style={{
          width: window.innerWidth / 4,
        }}
      ></TextField>{" "}
      <br /> <br />
      <TextField
        onChange={(e) => {
          setConfirmNewPass(e.target.value);
        }}
        label="Confirm New Password"
        style={{
          width: window.innerWidth / 4,
        }}
      ></TextField>{" "}
      <br /> <br />
      <Button variant="contained" style={{width: window.innerWidth / 4,}} onClick={()=>{
            setError('');
            errorOccurred = false;
    
            if (newPass === confirmNewPass) {
              resetPassword(oldPass, newPass)
                .catch((e) => {
                  setError("Old password is not correct");
                  errorOccurred = true;
                })
                .finally(() => {
                  if(!errorOccurred){
                    setPasswordResetSuccessful(true);
                  }
                });
            } else {
              setError("New password does not match confirmed password");
              errorOccurred = true;
            }
      }}>
        Reset Password
      </Button>
      <Snackbar anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }} 
      TransitionComponent={TransitionDown} open={errorOccurred} autoHideDuration={6000}>
        <Alert severity="error" >{error}</Alert>
      </Snackbar>
    </div>
  );

  return (
    <Card className="reset-password-card">
      {!currentUser && <Navigate to="/login" />}
      {passwordResetSuccessful ? successScreen : resetScreen}
    </Card>
  );
}

export default ResetPassword;
