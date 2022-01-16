import "./Styling.css";
import React from "react";
import { Button } from '@material-ui/core';
import { Route, Link, useNavigate, Routes } from "react-router-dom";
import PrivateRoute from './Components/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { useAuth } from './Contexts/AuthContext';
import * as Pages from './Pages';
import styles from './Styling.css';

function App() {
  const {currentUser, logout} = useAuth();
  const nav = useNavigate();

  const myAccountDropDown = (
    <Dropdown className="navBarDropDownMenu" style={{float: "right"}}>
      <Dropdown.Toggle variant="default" className="navBarDropDownMenuToggle">
        My Account
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={()=>{
          nav("/reset_password");
        }}>Reset Password</Dropdown.Item>
        <Dropdown.Item onClick={logout}>Log Out</Dropdown.Item>
      </Dropdown.Menu>
      </Dropdown>
  );

  return (
    <div style={styles}>
      <div className="TheNavBar">
        <nav>
          {currentUser ? (
            myAccountDropDown
          ) : (
            <a href="/login">
              <Button className="LogButton" size="large" variant="outlined">
                Login
              </Button>
            </a>
          )}
          <ul>
            <li>
              <Link to="/" className="IndividualLinks">
                <div>Home</div>
              </Link>
            </li>
            {currentUser && (
              <li>
                <Link to="/dashboard" className="IndividualLinks">
                  <div>Dashboard</div>
                </Link>
              </li>
            )}
            <li>
              <Link to="/public_documents" className="IndividualLinks">
                <div>Public Documents</div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <Routes>
        <Route exact path="/" element={<Pages.HomePage />} />

        <Route path="/login" element={<Pages.LoginPage />} />

        <Route path="/public_documents" element={<Pages.PublicDocumentsPage />} />

        {/* Private Routes */}
        <Route path="/dashboard" element={<PrivateRoute/>}>
          <Route path="/dashboard" element={<Pages.DashboardPage />} />
        </Route>

        <Route path="/dashboard" element={<PrivateRoute/>}>
          <Route path="/dashboard" element={<Pages.DashboardPage />} />
        </Route>

        <Route path="/reset_password" element={<PrivateRoute/>}>
          <Route path="/reset_password" element={<Pages.ResetPasswordPage />} />
        </Route>

        <Route path="/more_announcements" element={<PrivateRoute/>}>
          <Route path="/more_announcements" element={<Pages.MoreAnnouncementsPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
