exports.loginUser = (req,res) => {
if(req.body.email && req.body.password){
conn.query(sql.getUser,req.body.email,(err,data) => {
if(err){
// Error occurred
res.status(500).send(new Response(false,"An error occurred while verifying the user"));
}else{
if(data.length === 0){
// User does not exist
res.status(401).send(new Response(false,"The User does not exist"));
}else{
bcrypt.compare(req.body.password, data[0].user_password,(e,match) => {
if(e){
res.status(500).send(new Response(false,"An error occurred while verifying the user"));
}
if(match){
// return token
return res.status(200).send({success:true,authToken:auth.generateToken({user:req.body.email}),
});
}else{
// incorrect password
return res.status(401).send(new Response(false,"The Password is incorrect"));
}
});
}
}
})
}else{
// Enter credentials
res.status(401).send(new Response(false,"Please enter credentials"));
}
}