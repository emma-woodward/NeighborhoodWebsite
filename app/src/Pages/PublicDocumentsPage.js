import React from 'react';
import { useState } from 'react';
import { TextField, Button, Typography, IconButton, InputAdornment } from '@material-ui/core';
import Document from '../Components/Document';

function PublicDocuments() {

  return (
    <div className="PublicDocumentsPage">
        <h1 style={{textAlign: "center"}}>Public Documents</h1>
        <Document DocumentTitle="Example Doc" DocumentLink="https://www.dropbox.com/s/5q6wz81y83jofj7/document.pdf?dl=0" DocumentDesc="This is an example description" />
        <Document DocumentTitle="Example Doc" DocumentLink="https://www.dropbox.com/s/5q6wz81y83jofj7/document.pdf?dl=0" DocumentDesc="This is an example description" />
        <Document DocumentTitle="Example Doc" DocumentLink="https://www.dropbox.com/s/5q6wz81y83jofj7/document.pdf?dl=0" DocumentDesc="This is an example description" />
        <Document DocumentTitle="Example Doc" DocumentLink="https://www.dropbox.com/s/5q6wz81y83jofj7/document.pdf?dl=0" DocumentDesc="This is an example description" />
        <Document DocumentTitle="Example Doc" DocumentLink="https://www.dropbox.com/s/5q6wz81y83jofj7/document.pdf?dl=0" DocumentDesc="This is an example description" />
        <Document DocumentTitle="Example Doc" DocumentLink="https://www.dropbox.com/s/5q6wz81y83jofj7/document.pdf?dl=0" DocumentDesc="This is an example description" />
    </div>
  );
}

export default PublicDocuments;
