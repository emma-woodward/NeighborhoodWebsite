import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Announcement from '../Components/Announcement';

function DashboardPage() {
  const[announcement, setAnnouncement] = useState({
    timeStamp: '',
    title: '',
    message: ''
  });

  function convertTimeStamp(ts){
    return new Date(ts).toLocaleString();
  }

  //TODO: Error handling for this function
  function getMostRecentAnnouncement(){
    try{
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
        <div>
          <h1>Most Recent Announcement</h1>
          <Announcement title={announcement.title} message={announcement.message} timestamp={convertTimeStamp(announcement.timeStamp)} />
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
