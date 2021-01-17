import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Announcement from '../Components/Announcement';

function DashboardPage() {
  const[announcement, setAnnouncement] = useState({
    timeStamp: '',
    title: '',
    message: ''
  });

  function handlePasswordReset(){
    try{
      alert('Email Sent');
    }
    catch(e){
      console.log(e);
    }
  }

  function getMostRecentAnnouncement(){
    try{
      //FIXME:
      fetch("/most_recent_announcement",{
        method: "POST",
        headers:{
          Accept: 'application/json',
          'Content-Type':'application/json',
        },
      }).then((res)=> res.json()).then((json)=>{
        setAnnouncement({
          title: json.title,
          timeStamp: json.ts,
          message: json.message
        });
      });

    }
    catch(e){
      console.log(e);
    }
  }

  useEffect(()=>{
    getMostRecentAnnouncement();
  }, [])

  return (
    <div className="DashboardPage">
        <div className="DashboardAccountDiv" style={{
          width: window.innerWidth / 6,
          height: window.innerHeight / 8,
          margin: "2%"
        }}>
          <h1>Your Account</h1>
          <p>Currently Signed in as <b></b></p>
          <Link onClick={handlePasswordReset}>Reset Password</Link>
        </div>

        <div className="DashboardAnnouncementsDiv" style={{
            width: window.innerWidth /4,
            height: window.innerHeight / 4,
            margin: "2%"
        }}>
          <h1>Most Recent Announcement</h1>
          <Announcement title={announcement.title} message={announcement.message} timestamp={announcement.timeStamp} />
          <p style={{
            float: "right",
            fontWeight: "bold",
            color: "blue"
          }}><Link to="/more_announcements">More Announcements</Link></p>
        </div>
    </div>
  );
}

export default DashboardPage;
