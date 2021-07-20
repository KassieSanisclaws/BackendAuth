const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
dotenv.config();
const userRoute = require("./Routers/userRouter");

  
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', "Content-Type, Accept, X-Requested-With, Origin");
    next();
  });
    

// Created Api routes. //
app.use('/api/user', userRoute);


// below is the server response on successfuly connection. //
app.get('/', (req, res) => {
    res.send("Server Is Ready");
});

// error message handler. //
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

// below is the server port set-up. //
const port = process.env.PORT || 54441;
app.listen(port, () => {
    console.log(`Server is ready at http://localhost:${port}`);
});

module.exports = app;


