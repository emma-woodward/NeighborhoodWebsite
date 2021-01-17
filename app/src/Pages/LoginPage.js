import React, {useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';

function LoginPage() {
    const[email, setEmail] = useState('');
    const[pass, setPass] = useState('');
    const [error, setError] = useState("");
    const history = useHistory();
    const {currentUser, login} = useAuth();

    if(currentUser){
      history.push("/");
    }

    function handleLoginSubmit(){
      try{
        login(email, pass);
      }
      catch(e){
        console.log(e);
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
