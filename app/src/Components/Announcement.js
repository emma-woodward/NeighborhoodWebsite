import { TextField, Button, Typography, IconButton, InputAdornment } from '@material-ui/core';
import {
    NavLink, Route, Switch,  BrowserRouter as Router, Link
  } from "react-router-dom";
import LoginPage from '../Pages/LoginPage';
import HomePage from '../Pages/HomePage';
import DashboardPage from '../Pages/DashboardPage';

function Announcement() {

  return (
    <div>
      This is the announcement component
    </div>
  );
}

export default Announcement;
