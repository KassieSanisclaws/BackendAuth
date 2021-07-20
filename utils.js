const jwt = require("jsonwebtoken");

module.exports= generateToken = (user) => {
    return jwt.sign({
                      id: user.id,
                      email: user.email,
    }, 
    process.env.JWT_SECRET || process.env.JWT_SECRET, 
      {
          expiresIn: '30d',
      }     
    );
};

   

