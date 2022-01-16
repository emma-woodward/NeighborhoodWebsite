import { Button } from '@material-ui/core';
import { Route, Switch,  BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { useAuth } from '../Contexts/AuthContext';
import * as Pages from '../Pages';
import styles from '../Styling.css';

function Navbar() {

  const {currentUser, logout} = useAuth();
  const redirectToReset = (<Redirect to="/reset_password"/>);

  const myAccountDropDown = (
    <Dropdown className="navBarDropDownMenu" style={{float: "right"}}>
      <Dropdown.Toggle variant="default" className="navBarDropDownMenuToggle">
        My Account
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={redirectToReset}>Reset Password</Dropdown.Item>
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
                <Pages.HomePage />
              </Route>

              <Route path="/login">
                <Pages.LoginPage />
              </Route>

              <Route path="/public_documents">
                <Pages.PublicDocumentsPage />
              </Route>

              <PrivateRoute path="/reset_password" component={Pages.ResetPage} />
              <PrivateRoute path="/dashboard" component={Pages.DashboardPage} />
              <PrivateRoute path="/more_announcements" component={Pages.MoreAnnouncementsPage} />
          </Switch>
      </Router>
    </div>
  );
}

export default Navbar;
