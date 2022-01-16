import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

function ResetPassword() {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const [error, setError] = useState("");
  const [passwordResetSuccessful, setPasswordResetSuccessful] = useState(false);
  const { currentUser, resetPassword } = useAuth();

  const successScreen = (
    <div className="textCenter">
      <h1>Password Successfully Reset</h1>
      <Button size="large" variant="outlined">
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
      <Button size="large" variant="outlined" onClick={()=>{
            setError('');
    
            if (newPass === confirmNewPass) {
              resetPassword(oldPass, newPass)
                .catch((e) => {
                  setError("Old password is not correct");
                  console.log(e);
                })
                .finally(() => {
                  setPasswordResetSuccessful(true);
                });
            } else {
              setError("New password does not match confirmed password");
            }
      }}>
        Reset Password
      </Button>
    </div>
  );

  return (
    <div className="textCenter">
      {!currentUser && <Navigate to="/login" />}
      {passwordResetSuccessful ? successScreen : resetScreen}
    </div>
  );
}

export default ResetPassword;
