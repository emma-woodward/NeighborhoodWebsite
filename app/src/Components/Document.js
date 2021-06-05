import React, {useState } from 'react';
import styles from '../Styling.css';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FolderIcon from '@material-ui/icons/Folder';
import Folder from '@material-ui/icons/Folder';
import LinkIcon from '@material-ui/icons/Link';

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
      <div className="DocumentDiv">
        <List className="DocumentsList">
          <ListItem button onClick={()=>{setExapndedView(!expandedView);}}>
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
          
            <ListItemText primary={props.DocumentTitle} />
            {expandedView ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={expandedView} timeout="auto" unmountOnExit style={{paddingLeft: '20px'}}>
          <a href={props.DocumentLink}>{props.DocumentTitle}</a>  
          <br />
          {props.DocumentDesc}
        </Collapse>
        </List>
      </div>
  );
}

export default Document;
