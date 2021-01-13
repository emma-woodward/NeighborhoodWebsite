CREATE DATABASE neighborhood;

create table announcements(
    aid SERIAL PRIMARY KEY, 
    ts TIMESTAMP, 
    title VARCHAR(60), 
    message VARCHAR(2000)
);

INSERT INTO announcements(ts, title, message) 
VALUES('2004-10-19 10:23:54', 'example title', 
'this is a message that will go out to people');