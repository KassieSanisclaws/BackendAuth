const User = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const util = require("../utils");
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
exports.createNewUser = (req, res) => {
         const email = req.body.email;
         const password = req.body.password;   
// check if the input fields all have been filled by user. //        
            if(email && password === 0){
                 res.status(400).json({ success: false, message: "Please Have All Fields Completed Before Submission!"});
          }else{
// check for user in database. performming a query. // 
       dbconnect.query('SELECT * FROM users WHERE user_email = ?', [req.body.email], (e, result) => { 
            if(e){
                res.status(500).json({ success: false, message: "An Error Occurred While Creating User!"});
              }else{
// check to see if there is a user already with the email in database, if there is an error response is sent back. //                
                if(result.length === 1){
                   res.status(401).json({ success: false, message: "User Already In Use!" });
                }else{
                  if(result.length === 0){
// call bcrypt to generate the hash of the password and the number of salting rounds.  //
        bcrypt.hash(req.body.password, 10, (e,hash) => {
// checking for errors and if errors send back response message. //
         if(e){
           res.status(500).json({ success: false, message: "And Error Occured Creating User!"});
         }else{
// this line now brings in the stored hash password within the variable hash which now can run the dql query to place the registered user into the database.//
           if(hash){
      dbconnect.query('INSERT INTO users (user_email, user_password) VALUES (?,?)', [req.body.email, hash],(e,result) => { 
        if(e){
          res.status(500).json({ success: false, message: "And Error Occured Creating User!"});
        }else{
          if(result){
            return res.status(201).json({ success: true, message: "User created Successfully!"});
              }
        }
       }
          )}}})}}
       
          }
       })}
          }
                          
///////////////////////////////////////////////////////////////////////////////////////
exports.loginUser = (req, res) => {
    const { email, password } = req.body;
    // Checks the email and password fields for null. //
       if(email && password === 0){
           res.send(400).json({ success: false, message: "Please Complete All Fields!"});
        } else{
// performs sql query check for user in database. //
          dbconnect.query('SELECT * FROM users WHERE user_email = ? ', [req.body.email], (err,result) => {
            if(err){
              res.status(500).send("An Error Occurred While Verifying The user");
          }else{
// if user does not exit in the database. //
            if(result.length === 0){
              res.status(401).json({ success: false, message: "The User Does Not Exist! " });
            }else{
// if user exist call bcrypt to compare password with the user_pssword stored in database. //
           bcrypt.compare(req.body.password, result[0].user_password, (e, result) => {
             if(e){
              res.status(500).send("An Error Occurred While Verifying The user");
             }else{
// if comparison is made generate a result.//
                if(result){
               return res.status(200).send({ success:true, authToken: util.generateToken({user:req.body.email}),
              })  
              } else{
                  // incorrect password. //
                  return res.status(401).send("The Password Is Incorrect");
                }

             }

           })
              
             
              }
           }
       })
     }
  
     
    
  }
  
                

