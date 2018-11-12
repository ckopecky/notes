const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Auths = require("./AuthSchema");
require("dotenv")
const tokenGenerator = auth => {
    const options = {
        expiresIn: "24h"
    };

    const payload = {
        name: auth.username
    };
    const secret = "You're a wizard, Harry.";



    return jwt.sign(payload, secret, options);
};

const login = (req, res) => {
    const { username, password } = req.body;
    Auths.findOne({username})
        .then(auth => {
            if(!auth) {
                res.status(404).json({ Error: "User not found"});
            }
            else {
                console.log(auth);
                auth
                    .validatePassword(password)
                    .then(match => {
                        if(match) {
                            const token = tokenGenerator(auth);
                            res.status(200).json({ Message: `Welcome, ${auth.firstName}, have a token`, token})
                        }
                        else {
                            res.status(400).json({ Error: "username/password combination not found" });
                        }
                    })
                    .catch(err => {
                        res.status(500).json({ Error: err.message });
                    });
            }
        });
};

const register = (req, res) => {
    const { username, password, confirmedPassword, firstName, lastName } = req.body;
    if(password !== confirmedPassword) {
        res.status(400).json( { Error: "passwords do not match!" });
    }
    else if(!username, !password, !confirmedPassword, !firstName, !lastName) {
        res.status(400).json( { Error: "must include username, password, confirmedPassword, firstName, lastName"});
    }
    else {
        Auths.create(req.body)
            .then(auth => {
                const token = tokenGenerator(auth);
                res.status(201).json({username: auth.username, firstName: auth.firstName, lastName: auth.lastName, password: auth.password,headers: { Authentication: token }});
            })
            .catch(err => {
                res.status(500).json({ "Error from register catch" : err.message });
            });
    }
};

router.post("/login", login);
router.post("/register", register);

module.exports = router;