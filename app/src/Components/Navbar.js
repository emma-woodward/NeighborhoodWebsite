import { TextField, Button, Typography, IconButton, InputAdornment } from '@material-ui/core';
import {
    NavLink, Route, Switch,  BrowserRouter as Router, Link
  } from "react-router-dom";
import LoginPage from '../Pages/LoginPage';
import HomePage from '../Pages/HomePage';
import DashboardPage from '../Pages/DashboardPage';
import PrivateRoute from './PrivateRoute';
import styles from '../Styling.css';

function Navbar() {

  return (
    <div style={styles}>
      <Router>
        <div className="TheNavBar">
          <nav>
            <ul>
                <li><Link to="/" className="IndividualLinks"><div>Home</div></Link></li>
                <li><Link to="/dashboard" className="IndividualLinks"><div>Dashboard</div></Link></li>
            </ul>
          </nav>

        </div>
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
