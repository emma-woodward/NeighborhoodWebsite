import { TextField, Button, Typography, IconButton, InputAdornment } from '@material-ui/core';
import {
    NavLink, Route, Switch,  BrowserRouter as Router, Link
  } from "react-router-dom";

function Announcement(props) {

  return (
    <div>
      <b>{props.title} ({props.timestamp})</b>
      <p>{props.message}</p>
    </div>
  );
}

export default Announcement;
