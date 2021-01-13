const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

const PORT = 5000;

//Middleware
app.use(cors());
app.use(express.json());

//Routes
//Get the most recent announcement
app.get("/most_recent_announcement", async(req, res)=>{
    try{
        const mostRecent = await pool.query("select * from announcements where aid = (select max(aid) from announcements)");
        res.json(mostRecent.rows[0]);
    }
    catch(e){
        console.log(e.message);
    }
})

//Get all announcements
app.get("/announcements", async(req, res)=>{
    try{
        const allAnnouncements = await pool.query("SELECT * FROM announcements");
        console.log("ROWS: " + allAnnouncements);
        res.json(allAnnouncements.rows);
    }
    catch(e){
        console.log(e.message);
    }
})
 
//Create an announcement

app.listen(PORT, ()=>{
    console.log("Server has started on port " + PORT);
});

