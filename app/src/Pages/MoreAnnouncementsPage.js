import React, {useEffect, useState} from 'react';
import Announcement from '../Components/Announcement';

function MoreAnnouncementsPage() {
    const[announcements, setAnnouncements] = useState([]);

  function getAnnouncements(){
    try{
      fetch("http://localhost:5000/announcements",{
        method: "GET",
        headers:{
          Accept: 'application/json',
          'Content-Type':'application/json',
        },
      }).then((res)=> res.json()).then((json)=>{
        setAnnouncements(json);
        console.log("YES" + json);
      });

    }
    catch(e){
      console.log(e);
    }
  }

  useEffect(()=>{
    getAnnouncements();
  }, []);

  const output = announcements.map((a)=>{
    return <Announcement title={a.title} message={a.message} timestamp={a.ts} />;
});

  return (
    <>
    <h1 style={{marginLeft: "5%"}}>Announcements</h1>
    <div className="MoreAnnouncementsPageDiv">
      <div className="MoreAnnouncementsPageAnnouncementsDiv">
        {output}
      </div>
    </div>
    </>
  );
}

export default MoreAnnouncementsPage;
