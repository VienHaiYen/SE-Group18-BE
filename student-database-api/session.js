const express = require("express");
const router = express();
const uuidv4 = require("uuid").v4;
const mongoose = require("mongoose");
const Account = require("./models/account");
const Info = require("./models/info");
const layout = require("./userLayout");

router.use(express.json());

var sessions = [];

router.post("/login", (req,res) => {

    var {id, password, role} = req.body;
    var result = mongoose.model("account", Account.schema);

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
                console.log(`${id} logged in as ${sessions[sessionId].userId}`);

                const info = mongoose.model("info", Info.schema);
                var displayName; 
                info.findOne({"id" : id}, "name", (err, result) => {
                    displayName = result["name"];
                    displayLayout = layout(role);
                    return res.status(200).send({
                        "name" : displayName,
                        "display" : [
                            displayLayout
                        ]
                    })
                });         
            }
            else {
                return res.status(418).send({
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

function ensureAdmin(req, res, next) {
    var sessionId = req.headers.cookie?.split('=')[1];
    const userSession = sessions[sessionId];
    if (!userSession || !(userSession.userId == "admin")) {
        return false;
    }
    else {
        return true;
    }
}

function ensureTeacher(req, res, next) {
    var sessionId = req.headers.cookie?.split('=')[1];
    const userSession = sessions[sessionId];
    if (!userSession || !(userSession.userId == "teacher")) {
        return false;
    }
    else {
        return true;
    }
}

function ensureStudent(req, res, next) {
    var sessionId = req.headers.cookie?.split('=')[1];
    const userSession = sessions[sessionId];
    if (!userSession || !(userSession.userId == "student")) {
        return false;
    }
    else {
        return true;
    }
}

module.exports = {
    session : router,
    auth : {ensureAuthenticated, ensureAdmin, ensureTeacher, ensureStudent}
};