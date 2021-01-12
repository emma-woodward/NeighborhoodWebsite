import React from 'react';
import { TextField, Button, Typography, IconButton, InputAdornment } from '@material-ui/core';
import {useAuth} from '../Contexts/AuthContext';

function HomePage() {

  return (
    <div>
        <h1 className="textCenter">Welcome!</h1>
    </div>
  );
}

export default HomePage;
