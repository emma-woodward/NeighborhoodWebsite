import React from 'react';
import Document from '../Components/Document';

function PublicDocuments() {

  return (
    <div className="PublicDocumentsPage">
        <h1 style={{textAlign: "center", marginBottom: '2%', marginTop: '2%'}}>Public Documents</h1>
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
