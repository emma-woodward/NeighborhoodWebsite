const bcrypt = require("bcrypt");
const password = "6969";

bcrypt.hash(password, 10, (err, hash)=>{
        
    if(err){
        throw err;
    }

    console.log(hash);
});