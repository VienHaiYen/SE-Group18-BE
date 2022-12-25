// API CALLS FUNCTION TO HANDLE REQUEST MADE BY ADMINS

const express = require("express");
const { default: mongoose } = require("mongoose");
const Account = require("../../models/account");
const router = express.Router();
const info = require("../../models/info");
const poster = require("../package/postFunctions").controller;
const getter = require("../package/getFunctions").controller;
const MSG = require("../package/defineMessage").msg;
const session = require("../../session").session;
const auth = require("../../session").auth;


router.use(express.json());

// GET
router.get("/rule", function(req, res) {
    if (!auth.ensureAdmin(req)) {
        res.status(401).send({
            "message" : "You are not an admin"
        });
    } else {
        var nid = req.body.nid;

    }
})

// POST
router.post("/input-student", function(req, res, next) {
    if (!auth.ensureAdmin(req)) {
        return res.status(401).send({
            "message" : "You are not an admin"
        });
    }
    else {    
        var id = req.body.id;
        var role = "student";
        var name = req.body.name;
        var birthday = req.body.birthday;
        var address = req.body.address;
        var gender = req.body.gender;
        var mail = req.body.mail;
        var phone = req.body.phone;
        

        if (!id) {
            var msg;
            // req.flash("error", "Please fill in an ID");
            msg = "Please fill in an ID";
            return res.status(418).send({
                "message" : msg
            });;
        }
        if (!mail) {
            // req.flash("error", "Please fill in an email");
            msg = "Please fill in an email";
            return res.status(418).send({
                "message" : msg
            });;
        }
        if (!name) {
            // req.flash("error", "Please fill in a name");
            msg = "Please fill in a name";
            return res.status(418).send({
                "message" : msg
            });;
        }
        if(!birthday) {
            // req.flash("error", "Please fill in a birthday");
            msg = "Please fill in a birthday";
            return res.status(418).send({
                "message" : msg
            });;
        }
        if (!phone ) {
            // req.flash("error", "Please fill in a phone number");
            msg = "Please fill in a phone number";
            return res.status(418).send({
                "message" : msg
            });;
        }
        if (!gender) {
            // req.flash("error", "Please fill in a gender");
            msg = "Please fill in a gender";
            return res.status(418).send({
                "message" : msg
            });;
        }

        msg = poster.createAccount(id, id, role);
        if (msg == "error") {
            return res.status(500).send({
                "message" : "Unexpected Error"
            })
        }

        msg = poster.createProfile(id, role, name, birthday, address, gender, mail, phone, null);
        if (msg == 'success') {
            return res.status(200).send(msg);
        } else if (msg instanceof Error) {
            return res.status(500).send({
                "message" : "Unexpected Error"
            })
        } else {
            return res.status(418).send(msg);
        }
    }
})

router.post("/rule", function(req, res, next) {
    if (!auth.ensureAdmin(req)) {
        res.status(401).send({
            "message" : "You are not an admin"
        });
    } else {
        // DEFINE FUNCTION HERE
    }
})

router.post("/class-list", function(req, res, next) {
    if (!auth.ensureAdmin(req)) {
        res.status(401).send({
            "message" : "You are not an admin"
        });
    } else {
        // DEFINE FUNCTION HERE
    }
})

router.post("/teacher-schedule", function(req,res) {
    if (!auth.ensureAdmin(req)) {
        res.status(401).send({
            "message" : "You are not an admin"
        })
    } else {
        // DEFINE FUNCTION HERE
    }
}) 

router.post("/class-list", (req, res) => {
    if (!auth.ensureAdmin(req)) {
        res.status(401).send({
            "message" : "You are not an admin"
        })
    } else {
        // DEFINE FUNCTION HERE
    }
})



module.exports = router;