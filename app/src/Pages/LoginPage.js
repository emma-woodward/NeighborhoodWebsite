import React, {useState, useEffect} from 'react';
import { TextField, Button, Typography, IconButton, InputAdornment } from '@material-ui/core';
import fire from '../fire';

function LoginPage() {
    const[email, setEmail] = useState('');
    const[pass, setPass] = useState('');
    
    const handleLogin = () => {
        fire.auth().signInWithEmailAndPassword(email, pass)
        .catch(e => {
            alert("login was NOT successful");
        })
    }

  return (
    <div>
        <h1>Login</h1>
        <TextField onChange={e=>{setEmail(e.target.value)}} label="Email" style={{
                width: window.innerWidth / 4
                }}></TextField> <br />
        <TextField onChange={e=>{setPass(e.target.value)}} label="Password" style={{
                width: window.innerWidth / 4
                }}></TextField> <br /> <br />
        <Button size="large" variant="outlined" onClick={handleLogin}>Log in</Button>
    </div>
  );
}

export default LoginPage;
