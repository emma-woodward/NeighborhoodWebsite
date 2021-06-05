import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';

function ResetPassword() {
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [error, setError] = useState("");
    const { currentUser, resetPassword } = useAuth();

    function isPasswordValid() {
        setError("");
        const specialCharacters = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/);
        const containsSpecialCharacters =  specialCharacters.test(confirmPass);
        const has8Chars = (confirmPass.length >= 8);
        const hasLowerCase = (confirmPass.toUpperCase() != confirmPass);
        const hasUpperCase = (confirmPass.toLowerCase() != confirmPass);

        if (containsSpecialCharacters && has8Chars && hasLowerCase && hasUpperCase) {
            return true;
        }
        
        return false;
    }

    function handlePasswordReset() {
        //TODO: Check if passwords match and meet password specs
        setError("");
        if(pass === confirmPass){
        if (isPasswordValid()){
            try {
                resetPassword(confirmPass);
            }
            catch (e) {
                console.log(e);
            }
        }
        else{
            setError("Passwords must be 8 characters long, contain a lowercase and uppercase letter, and a special character");
        }
    }
    else {
        setError("Passwords do not match");
    }
}

return (
    <div className="textCenter">
        {!currentUser && <Redirect to="/login" />}
        <h1>Reset Password</h1>
        <p style={{ color: "red" }}>{error}</p>
        <TextField type="" onChange={e => { setPass(e.target.value) }} label="New Password" style={{
            width: window.innerWidth / 4
        }}></TextField> <br /> <br />
        <TextField type="" onChange={e => { setConfirmPass(e.target.value) }} label="Confirm Password" style={{
            width: window.innerWidth / 4
        }}></TextField> <br /> <br />
        <Button size="large" variant="outlined" onClick={handlePasswordReset}>Reset Password</Button>
    </div>
);
}

export default ResetPassword;
