const User = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils");
const jwt = require("jsonwebtoken");
const dbconnect = require('../Config/config.db');

////////////////////////////////////////////////////////////////////////////////////////
// getUsersList. (api-working)//
exports.getUsersList = (req, res)=> {
    //console.log('here all users in sql db');
    User.getUsersList((err, users) =>{
        console.log("Displaying List Of:");
        if(err)
        res.send(err);
        console.log('Users', users);
        res.send(users)
    })
};

///////////////////////////////////////////////////////////////////////////////////////
// geat user by ID. (api-working)//
exports.getUserByID = (req, res)=>{
    //console.log('get emp by id');
    User.getUserByID(req.params.id, (err, user)=>{
        if(err)
        res.send(err);
        console.log('single user data',user);
        res.send(user);
    })
}

///////////////////////////////////////////////////////////////////////////////////////
// 
/*exports.createNewUser = async(req, res) => {
    const {user, email, password} = new User(req.body);
    console.log('user', user);
 // check if the user has both email and passwords fields filled. (if-statement)//
     if(req.body.constructor === Object && Object.keys(req.body).length === 0){
         res.send(400).json({ success: false, message: "Please Fill All Fields"});
 //  second test case for createNewUser goes below here. //
     }else{
         const hash = await bcrypt.hash(password, 10, (e,token) => {
          if(e){
         res.status(500).send("An Error Occurred Creating User");   
         }if(token){
       res.status(200).send({ success: true, generateToken: generateToken()});
        }else {   
            dbconnect.query('INSERT INTO authentication.users SET = ? ', req.body.email, (err)=>{
                if(err){
                    console.log("Error inserting data");
                }else{
                    console.log("User profile created successfully");
                }
            }
         )}}  
                   
         )}
    }*/
///////////////////////////////////////////////////////////////////////////////////////
//
exports.loginUser = async(req, res) => {
    const { email, password } = req.body;
  
    // Checks the email and password fields for null. //
       if(req.body.email && req.body.password === 0){
           res.send(400).json({ success: false, message: "Please Complete All Fields!"});
        } else{
          const user = await dbconnect.promise().query('SELECT * FROM users WHERE user_email = ', req.body.email, (err, reqData) => {
            if(err){
              res.status(500).send("An Error Occurred While Verifying The user");
          }else{
            // if user does not exit in the database. //
            if(reqData.length === 0){
              res.status(401).json({ success: false, message: "The User Does Not Exist! " });
            }else{
                     (req.body.password, data[0].user_password, (e,match) => {
                if(e){
                  res.status(500).send("An Error Occured While Verifying The User");
                }
                if(match){
                  // return the user token. //
                  res.send({ 
                           _id: user._id,
                           email: user.email,
                           token: generateToken(user)
                  });
                }else{
                  // incorrect password. //
                  return res.status(401).send("The Password Is Incorrect");
                }}
              )}
           }
       })
     }
  
     
    
  }
  


