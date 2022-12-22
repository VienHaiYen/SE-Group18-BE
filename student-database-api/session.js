const express = require("express");
const router = express();
const uuidv4 = require("uuid").v4;
const mongoose = require("mongoose");
const account = require("./models/account");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

router.use(express.json());

var sessions = [];

router.post("/login", (req,res) => {

    var {id, password, role} = req.body;
    var result = mongoose.model("account", account.schema);

    if (!id || !password || !role) {
        return res.status(418).send({
            "message" : "missing credentials"
        })
    }

    result.findOne({$and: [
        {
            'id': id
        }, {
            'role': role
        }
        ]}, function(err, user) {
        if (err) {
            return res.status(500).send({
                "message" : "unexpected error"
            })
        }

        if (!user) {
            return res.status(401).send({
                "message" : "Invalid credentials"
            })  
        }
        user.checkPassword(password, (err, isMatch) => {
            if (err) {
                return res.status(500).send({
                    "message" : "unexpected error"
                })
            }

            if (isMatch) {

                const sessionId = uuidv4();
                sessions[sessionId] = {id, userId: role};

                res.set("Set-Cookie", `session=${sessionId}`);
                console.log(`${id} logged in`);
                return res.status(200).send({
                    "message" : "Logged in"
                })
            }
            else {
                return res.status(200).send({
                    "message" : "Invalid credentials"
                })
            }
        })
    })
})  

router.post("/logout", (req, res) => {
    console.log(sessions)
    var sessionId = req.header.cookie?.split('=')[1];

    const userSession = sessions[sessionId];
    if (!userSession) {
        return res.status(401).send({
            "message" : "Invalid sessions"
        })
    }

    delete sessions[sessionId];
    res.set('Set-Cookie', 'session=; expires=Thu, 01 Jan 1970 00:00:00 GMT');
    return res.status(200).send({
        "message" : "Logged out"
    })
})

module.exports = router;