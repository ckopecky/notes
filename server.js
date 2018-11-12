const express = require("express");
require("dotenv").config();
const server = express();
const router = express.Router();

const port = process.env.PORT || 8000;

const noteController = require("./NoteController");
const authController = require("./AuthController");

const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const database = "notesdb";
const users = process.env.USERS;
const password = process.env.PASSWORD;


//database connection
mongoose.set('useCreateIndex', true)
const mongoOptions = {useNewUrlParser: true};
//mongodb://<dbuser>:<dbpassword>@ds063439.mlab.com:63439/notesdb
mongoose.connect(`mongodb://cmvnk:T3mp1234!@ds063439.mlab.com:63439/notesdb`, mongoOptions)
    .then(()=> {
        console.log(`Connected to ${database} on MongoDB`);
    })
    .catch(()=> {
        console.log({Error: err.message, message: "Did you start an instance of MongoDB?"})
    });

//middleware

//local

const restricted = (req, res, next) => {
    const token = req.headers.authorization;
    const secret = "You're a wizard, Harry."

    if(token){
        jwt.verify(token, secret, (err, decodedToken) => {
            if(err) {
                return res.status(401).json({Message: "Token was not decoded", err});
            }
            next();
        });
    }
    else {
        res.send({Message: "Error in retrieving token"});
    }
};

//global


const corsOptions = {
    origin: true,
    credentials: true,
};

server.options('*', cors(corsOptions))
server.use(express.json());
server.use(cors(corsOptions));
server.use(helmet());

server.get("/", (req, res) => {
    res.send({Success: "api is working..."});
});

server.use("/api/notes/", restricted, noteController);
server.use("/auth/", authController);



server.listen(port, ()=> {
    console.log(`Server is listening on ${port}`)
});

module.exports = router;
