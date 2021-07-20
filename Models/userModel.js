const dbconnect = require('../Config/config.db');

const User = function(user){
    this.user_email     = user.user_email;
    this. user_password = user.user_password;
}

////////////////////////////////////////////////////////////////////////////////////////
// getUsersList MySQL query string to retreive from database. //
User.getUsersList = (result) =>{
    dbconnect.query('SELECT * FROM authentication.users', (err, res)=>{
        if(err){
            console.log("Error fetching users", err);
            result(null,err);
        }else{
            console.log("Users fetched successfully");
            result(null,res);
        }
    });
};

// get user by ID from data base. (working)//
User.getUserByID = (id, result)=>{
    dbconnect.query('SELECT * FROM users WHERE user_id=?', id, (err, res)=>{
        if(err){
            console.log("Error fetching users by id", err);
            result(null, err);
        }else{
            result(null, res);
        }
    })
}

// createNewUser MySQL query to creating a new user.// 
/*User.createUser = (user, result) =>{
    dbconnect.query('INSERT INTO users SET ? ', user, (err, res)=>{
        if(err){
            console.log("Error inserting data");
            result(null, err);
        }else{
            console.log("User profile created successfully");
            result(null, res)
        }
    })
}*/

module.exports = User;

