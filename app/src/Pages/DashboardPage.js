import React from 'react';
import {useAuth} from '../Contexts/AuthContext';
import { Route, Redirect, Link } from 'react-router-dom';
import Announcement from '../Components/Announcement';

function DashboardPage() {

  const user = useAuth().currentUser;
  const {sendPasswordResetEmail} = useAuth()

  function handlePasswordReset(){
    try{
      sendPasswordResetEmail(user.email)
      alert('Email Sent');
    }
    catch(e){
      console.log(e);
    }
  }

  function getMostRecentAnnouncement(){
    
  }

  return (
    <div className="DashboardPage">
        <div className="DashboardAccountDiv" style={{
          width: window.innerWidth / 6,
          height: window.innerHeight / 8,
          margin: "2%"
        }}>
          <h1>Your Account</h1>
          <p>Currently Signed in as <b>{user.email}</b></p>
          <Link onClick={handlePasswordReset}>Reset Password</Link>
        </div>

        <div className="DashboardAnnouncementsDiv" style={{
            width: window.innerWidth /4,
            height: window.innerHeight / 4,
            margin: "2%"
        }}>
          <h1>Most Recent Announcement</h1>
          <Announcement title="Example Announcement" message="This is an announcement about nothing" timestamp="1/12/2021"/>
          <p style={{
            float: "right",
            fontWeight: "bold",
            color: "blue"
          }}>More Announcements</p>
        </div>


    </div>
  );
}

export default DashboardPage;
