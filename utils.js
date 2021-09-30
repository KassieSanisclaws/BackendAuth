const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {
    return jwt.sign({
                      _id: user.id,
                      email: user.email,
    }, 
    process.env.JWT_SECRET || 'secretpasscodehere', 
      {
          expiresIn: '30d',
      }     
    );
};

exports.isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if(authorization) {
    const token = authorization.slice(10, authorization.length); // Bearer XXXXX gets rid of the bearer part and only returns the token part//
   jwt.verify(
     token, 
     process.env.JWT_SECRET || 'secretpasscodehere', 
     (err, decode) => {
     if (err) {
       res.status(401).send({ message: 'Invalid Token' });
     } else {
       req.user = decode;
       next();
     }
    }
   );
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};
   

