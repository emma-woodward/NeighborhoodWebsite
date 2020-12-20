import { TextField, Button, Typography, IconButton, InputAdornment } from '@material-ui/core';
import {
    NavLink, Route, Switch,  BrowserRouter as Router, Link
  } from "react-router-dom";
import LoginPage from '../Pages/LoginPage';
import HomePage from '../Pages/HomePage';
import DashboardPage from '../Pages/DashboardPage';
import PrivateRoute from './PrivateRoute';

function Navbar() {

  return (
    <div>
      <Router>
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </nav>

          <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>

              <Route path="/login">
                <LoginPage />
              </Route>

              <PrivateRoute>
                  <DashboardPage />
              </PrivateRoute>
          </Switch>
      </Router>
    </div>
  );
}

export default Navbar;
