import React, {useState, useEffect} from 'react';
import { TextField, Button, Typography, IconButton, InputAdornment } from '@material-ui/core';
import { useAuth } from '../Contexts/AuthContext';
import { useHistory } from 'react-router-dom';


function LoginPage() {
    const[email, setEmail] = useState('');
    const[pass, setPass] = useState('');
    const { login, currentUser } = useAuth();
    const [error, setError] = useState("");
    const history = useHistory();

    if(currentUser){
      history.push("/");
    }

    async function handleLoginSubmit(){
      try{
        setError("");
        await login(email, pass);
        history.push("/");
      }
      catch{
        setError("Failed to Login...");
      }
    }

  return (
    <div className="textCenter">
        <h1>Login</h1>
        <p style={{color: "red"}}>{error}</p>
        <TextField onChange={e=>{setEmail(e.target.value)}} label="Email" style={{
                width: window.innerWidth / 4
                }}></TextField> <br />
        <TextField type="password" onChange={e=>{setPass(e.target.value)}} label="Password" style={{
                width: window.innerWidth / 4
                }}></TextField> <br /> <br />
        <Button size="large" variant="outlined" onClick={handleLoginSubmit}>Log in</Button>
    </div>
  );
}

export default LoginPage;
