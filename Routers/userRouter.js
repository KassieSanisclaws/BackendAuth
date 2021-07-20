const express = require('express');
const userRoute = express.Router();

const userController = require("../Controllers/user");

// getUsersList controller //
userRoute.get('/', userController.getUsersList);

// getUserByID controller (working)//
userRoute.get('/:id', userController.getUserByID);

// user credential login controller. //
userRoute.post('/login', userController.loginUser);

// createNewUser in Database. //
userRoute.post('/register', userController.createNewUser);

//

module.exports = userRoute;