import { Button } from '@material-ui/core';
import { Route, Switch,  BrowserRouter as Router, Link } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import styles from '../Styling.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useAuth } from '../Contexts/AuthContext';
import Dropdown from 'react-bootstrap/Dropdown';

//Page Imports
import LoginPage from '../Pages/LoginPage';
import HomePage from '../Pages/HomePage';
import DashboardPage from '../Pages/DashboardPage';
import PublicDocumentsPage from '../Pages/PublicDocumentsPage';
import MoreAnnouncementsPage from '../Pages/MoreAnnouncementsPage';

function Navbar() {

  const {currentUser, logout} = useAuth();

  const myAccountDropDown = (
    <Dropdown className="navBarDropDownMenu" style={{float: "right"}}>
      <Dropdown.Toggle variant="default" className="navBarDropDownMenuToggle">
        My Account
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item >Reset Password</Dropdown.Item>
        <Dropdown.Item onClick={logout}>Log Out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  return (
    <div style={styles}>
      <Router>
        <div className="TheNavBar">
          <nav>
          {currentUser ? myAccountDropDown : <a href="/login"><Button className="LogButton" size="large" variant="outlined">Login</Button></a>}
            <ul>
                <li><Link to="/" className="IndividualLinks"><div>Home</div></Link></li>
                {currentUser && <li><Link to="/dashboard" className="IndividualLinks"><div>Dashboard</div></Link></li>}
                <li><Link to="/public_documents" className="IndividualLinks"><div>Public Documents</div></Link></li>
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

              <Route path="/public_documents">
                <PublicDocumentsPage />
              </Route>

              <PrivateRoute path="/dashboard" component={DashboardPage} />
              <PrivateRoute path="/more_announcements" component={MoreAnnouncementsPage} />
          </Switch>
      </Router>
    </div>
  );
}

export default Navbar;
