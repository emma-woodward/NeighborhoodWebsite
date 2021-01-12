import React, {useState, useEffect} from 'react';
import { TextField, Button, Typography, IconButton, InputAdornment } from '@material-ui/core';

/**
 * Document Component
 * 
 * @param {*} props
 * DocumentLink- Link to the document
 * DocumentTitle- Documents name 
 * DocumentDesc- Documents Description
 */
function Document(props) {

const[expandedView, setExapndedView] = useState(false);

  return (
      <div>
        <div className="DocumentDiv">
            <a href={props.DocumentLink}>
            <div>
                {props.DocumentTitle}
            </div>
            </a>
        {expandedView ? <div className="DocumentExpandDiv" onClick={()=>{setExapndedView(!expandedView);}}>  -  </div> : 
        <div className="DocumentExpandDiv" onClick={()=>{setExapndedView(!expandedView);}}>  +  </div>}

    </div>
    <div className="DocumentDescriptionDiv">
            {expandedView && <p>{props.DocumentDesc}</p>}
        </div>
      </div>
  );
}

export default Document;
