CREATE DATABASE neighborhood;

CREATE TABLE announcements(
    aid SERIAL PRIMARY KEY, 
    ts TIMESTAMP, 
    title VARCHAR(60), 
    message VARCHAR(2000)
);

INSERT INTO announcements(ts, title, message) 
VALUES('2004-10-19 10:23:54', 'example title', 
'this is a message that will go out to people');

/**
For class 0 is private and 1 is public
*/
CREATE TABLE documents(
    did SERIAL PRIMARY KEY, 
    class BOOLEAN,
    title VARCHAR(60), 
    summary VARCHAR(2000),
    link TEXT
);

INSERT INTO documents(class, title, summary, link)
VALUES('0', 'Database Document Test', 'This is a cool test', 'https://google.com');

/**
The admin role is 0 and the normal user role is 1
*/
CREATE TABLE users(
    email VARCHAR(50) NOT NULL,
    hash VARCHAR(500) NOT NULL,
    role BOOLEAN NOT NULL,
    sessionId VARCHAR(500),
    expires VARCHAR(20)
);

/*Creating the first user which is the admin user that will be allowed to
create the rest of the users*/
INSERT INTO users(email, hash, role) 
VALUES('admin','', '0');