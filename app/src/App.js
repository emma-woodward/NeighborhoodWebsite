import logo from './logo.svg';
import './Styling.css';
import LoginPage from './Pages/LoginPage';
import fire from './fire';
import { TextField, Button, Typography, IconButton, InputAdornment } from '@material-ui/core';
import Navbar from './Components/Navbar'
import React, {useState, useEffect} from 'react';

function App() {
  const[user, setUser] = useState("");
  const[l, setL] = useState("Not Logged in");

  const handleLogOut =()=>{
    fire.auth().signOut();
    alert("LOGGED OUT");
  }

  const listenAuth =()=>{
    fire.auth().onAuthStateChanged((user) =>{
      if(user){
        setUser(user);
        setL("Logged In");
      }
      else{
        setUser("");
        setL("Not Logged in");
      }
    })
  }

  useEffect(()=>{
    listenAuth();
  })

  return (
    <div className="Styling">
      <Button onClick={handleLogOut} style={{
        float: 'right',
        color: 'white',
        }}>{l}</Button>
      <Navbar />
    </div>
  );
}

export default App;
