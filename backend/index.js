const express = require("express");
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const app = express();

//TODO: Stop using crypto library
//TODO: Move the port over to a .env file
const PORT = 5000;

//Middleware
app.use(cors());
app.use(express.json());

async function isValidUser(sessionId){
    await pool.query("UPDATE users SET sessionId = null, expires = null WHERE expires::date < current_date::date");
    const user = await pool.query("SELECT * FROM users WHERE sessionId = $1", [sessionId]);

    if(user){
        return true;
    }

    return false;
}

async function isValidAdmin(sessionId){
    await pool.query("UPDATE users SET sessionId = null, expires = null WHERE expires::date < current_date::date");
    const user = await pool.query("SELECT * FROM users WHERE sessionId = $1 AND role = '0'", [sessionId]);

    if(user){
        return true;
    }

    return false;
}

//Routes
//Create a new user
app.post("/create_user", async(req, res)=>{
    const user = await pool.query("SELECT * FROM users WHERE sessionId = $1", [req.body.sessionId]);

    if(isValidAdmin(req.body.sessionId)){
        try{
            const hashedPassword = await bcrypt.hash(req.body.password, 10, (err, hash)=>{
            
            if(err){
                throw err;
            }
    
            const result = pool.query("INSERT INTO users(email, hash, role) VALUES($1, $2, $3)", 
            [req.body.email, hash, req.body.role]);
            });
    
            res.send({"success": "user created"});
        }
        catch(e){
            res.send({"error": "User was not created"});
            console.log(e);
        }
    }
    else{
        res.send({"error": "Could not create user..."});
    }
})

//Login
app.post("/login", async(req, res)=>{
    try{
        const selectedUser = await pool.query("SELECT * FROM users WHERE email = $1", [req.body.email]);
        await bcrypt.compare(req.body.password, selectedUser.rows[0].hash, (err, result)=>{   
            if(err){
                throw err;
            }
            
            if(result){
                const id = crypto.randomBytes(50).toString("hex");
                pool.query("UPDATE users SET sessionId = $1, expires = (current_date + 1) WHERE email = $2", [id, req.body.email]);
                res.json({
                    sessionId: id
                })

                res.send({"success":"Logged in"});
            }
            else{
                res.send({"error": "Email or password is invalid"});
            }
        });
    }
    catch(e){
        res.send({"error": "Email or password is invalid"});
    }
})

//Log out
app.post("/logout", async(req, res)=>{
    try{

        if(isValidUser(req.body.sessionId)){
            await pool.query("UPDATE users SET expires = null, sessionId = null WHERE sessionId = $1", [req.body.sessionId]);
            res.send({"success":"Logged Out"});
        }
        else{
            res.send({"error": "Could not log out..."});
        }
    }
    catch(e){
        res.send({"error": "Could not log out..."});
        console.log(e);
    }
})

//TODO:
//Delete a user
app.post("/delete_user", async(req, res)=>{
    try{
        if(isValidAdmin(req.sessionId)){

        }
    }
    catch(e){
        console.log(e);
    }
})

//Modify a users password
app.post("/reset_password", async(req, res)=>{
    try{
        if(isValidUser(req.sessionId)){
            const hashedPassword = await bcrypt.hash(req.body.newPassword, 10, (err, hash)=>{
                if(err){
                    throw err;
                }
        
                const result = pool.query("UPDATE users SET hash = $1 WHERE sessionId = $2", 
                [hash, req.body.sessionId]);
                });
        }

        res.send({"success": "Password has changed"});
    }
    catch(e){
        res.send({"error": "Could not change password"});
        console.log(e);
    }
})

//Get the most recent announcement
app.post("/most_recent_announcement", async(req, res)=>{
    try{
        if(isValidUser(req.sessionId)){
            const mostRecent = await pool.query("select * from announcements where aid = (select max(aid) from announcements)");
            res.json(mostRecent.rows[0]);
        }
    }
    catch(e){
        console.log(e);
    }
})

//Get all announcements
app.post("/announcements", async(req, res)=>{
    try{
        if(isValidUser(req.sessionId)){
            const allAnnouncements = await pool.query("SELECT * FROM announcements");
            res.json(allAnnouncements.rows);
        }
    }
    catch(e){
        console.log(e);
    }
})
 
//Create an announcement
app.post("/create_announcement", async(req, res)=>{
    try{
        if(isValidAdmin(req.sessionId)){

        }
    }
    catch(e){
        console.log(e);
    }
})

app.post("/yes", async(req, res)=>{
    const hashedPassword = await bcrypt.hash("password", 10, (err, hash)=>{
        if(err){
            throw err;
        }
        res.send(hash);
        }
    );
});

app.listen(PORT, ()=>{
    console.log("Server has started on port " + PORT);
});

