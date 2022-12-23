const express = require("express");
const router = express();
const uuidv4 = require("uuid").v4;
const mongoose = require("mongoose");
const account = require("./models/account");

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
        }, 
        {
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
    if (!ensureAuthenticated(req, res)) {
        return res.status(401).send({
            "message" : "You are not logged in"
        })
    };
    var sessionId = req.headers.cookie?.split('=')[1];
    delete sessions[sessionId];
    res.set('Set-Cookie', 'session=; expires=Thu, 01 Jan 1970 00:00:00 GMT');
    return res.status(200).send({
        "message" : "Logged out"
    })
})

// middleware to check user type

function ensureAuthenticated(req, res, next) {
    var sessionId = req.headers.cookie?.split('=')[1];
    const userSession = sessions[sessionId];
    if (!userSession) {
        return false
    }
    else {
        return true;
    }
}

function enSureAdmin(req, res, next) {
    var sessionId = req.headers.cookie?.split('=')[1];
    const userSession = sessions[sessionId];
    if (!(userSession.userId == "Admin")) {
        return false;
    }
    else {
        return true;
    }
}

function ensureTeacher(req, res, next) {
    var sessionId = req.headers.cookie?.split('=')[1];
    const userSession = sessions[sessionId];
    if (!(userSession.userId == "Teacher")) {
        return false;
    }
    else {
        return true;
    }
}

function ensureStudent(req, res, next) {
    var sessionId = req.headers.cookie?.split('=')[1];
    const userSession = sessions[sessionId];
    if (!(userSession.userId == "Student")) {
        return false;
    }
    else {
        return true;
    }
}

module.exports = {
    session : router,
    auth : {ensureAuthenticated, enSureAdmin, ensureTeacher, ensureStudent}
};