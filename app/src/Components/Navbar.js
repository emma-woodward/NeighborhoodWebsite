import { TextField, Button, Typography, IconButton, InputAdornment } from '@material-ui/core';
import {
    NavLink, Route, Switch,  BrowserRouter as Router, Link
  } from "react-router-dom";
import LoginPage from '../Pages/LoginPage';
import HomePage from '../Pages/HomePage';
import DashboardPage from '../Pages/DashboardPage';
import PrivateRoute from './PrivateRoute';
import styles from '../Styling.css';
import { AuthProvider } from '../Contexts/AuthContext';
import {useAuth} from '../Contexts/AuthContext';

function Navbar() {
  const {logout} = useAuth();
  const {currentUser} = useAuth()

  return (
    <div style={styles}>
      <Router>
        <div className="TheNavBar">
          <nav>
          {currentUser ? <Button style={{color: "white", float: "right", height: "50%"}}size="large" variant="outlined" onClick={logout}>Log Out</Button> : 
          <a href="/login"><Button style={{color: "white", float: "right", height: "50%"}}size="large" variant="outlined">Login</Button></a>}
            <ul>
                <li><Link to="/" className="IndividualLinks"><div>Home</div></Link></li>
                <li><Link to="/dashboard" className="IndividualLinks"><div>Dashboard</div></Link></li>
            </ul>
          </nav>
        </div>
        <AuthProvider>
          <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>

              <Route path="/login">
                <LoginPage />
              </Route>

              <PrivateRoute path="/dashboard" component={DashboardPage} />
          </Switch>
          </AuthProvider>
      </Router>
    </div>
  );
}

export default Navbar;
