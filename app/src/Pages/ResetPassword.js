import React, {useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';

function ResetPassword() {
    const[oldPass, setOldPass] = useState('');
    const[newPass, setNewPass] = useState('');
    const[confirmNewPass, setConfirmNewPass] = useState('');
    const [error, setError] = useState("");
    const {currentUser, resetPassword} = useAuth();

    function handlePasswordReset(){
        setError('');

        if(newPass === confirmNewPass){
            try{
                const retVal = resetPassword(oldPass, newPass);

                if(retVal){
                  setError(retVal);
                  setOldPass('');
                }
            }
            catch(e){
                setError('Old password is not correct');
                console.log(e);
            }
        }
    }

  return (
    <div className="textCenter">
      {!currentUser && <Redirect to="/login" />}
        <h1>Reset Password</h1>
        <p style={{color: "red"}}>{error}</p>
        <TextField onChange={e=>{setOldPass(e.target.value)}} label="Old Password" style={{
                width: window.innerWidth / 4
                }}></TextField> <br /> <br />
        <TextField onChange={e=>{setNewPass(e.target.value)}} label="New Password" style={{
                width: window.innerWidth / 4
                }}></TextField> <br /> <br />
        <TextField onChange={e=>{setConfirmNewPass(e.target.value)}} label="Confirm New Password" style={{
                width: window.innerWidth / 4
                }}></TextField> <br /> <br />
        <Button size="large" variant="outlined" onClick={handlePasswordReset}>Reset Password</Button>
    </div>
  );
}

export default ResetPassword;
