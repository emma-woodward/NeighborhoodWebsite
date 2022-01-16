import React from 'react';
import LinkIcon from '@mui/icons-material/Link';
import ArticleIcon from '@mui/icons-material/Article'
import { ListItem, ListItemIcon, ListItemButton, ListItemText, Card } from '@mui/material';

/**
 * Document Component
 * 
 * @param {*} props
 * DocumentLink- Link to the document
 * DocumentTitle- Documents name 
 * DocumentDesc- Documents Description
 */
function Document(props) {

  return (
    <Card variant="outlined" className="documents-card">
      <ListItem>
        <ListItemIcon>
          <ArticleIcon />
        </ListItemIcon>
        <ListItemText primary={props.DocumentTitle} secondary={props.DocumentDesc} />
        <a href={props.DocumentLink}>
          <ListItemButton>
            <LinkIcon />
          </ListItemButton>
        </a>
      </ListItem>
    </Card>
  );
}

export default Document;
