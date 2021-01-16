import React from 'react';

function Announcement(props) {

  return (
    <div>
      <b>{props.title} ({props.timestamp})</b>
      <p>{props.message}</p>
    </div>
  );
}

export default Announcement;
