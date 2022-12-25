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
        // DEFINE FUNCTION HERE
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
        var id;
        var query = mongoose.model("account", Account.schema);
        query.countDocuments({role : "student"}, (err, count) => {
            id = count + 1;
        })
        var role = "student";
        var name = req.body.name;
        var birthday = req.body.birthday;
        var address = req.body.address;
        var gender = req.body.gender;
        var mail = req.body.mail;
        var phone = req.body.phone;
        var _class = req.body._class;
        var subject = null;

        var msg;
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
        if (msg == MSG.ERROR_MESSAGE) {
            return res.status(500).send({
                "message" : "Unexpected Error"
            })
        }

        msg = poster.createProfile(id, role, name, birthday, address, gender, mail, phone, _class, subject);
        if (msg == MSG.SUCCESS_MESSAGE) {
            return res.status(200).send({
                "message" : "Successful"
            });
        } else if (msg == MSG.ERROR_MESSAGE) {
            return res.status(500).send({
                "message" : "Unexpected Error"
            })
        } else {
            return res.status(418).send({
                "message" : "Dupplicate unique infomation"
            });
        }
    }
})

router.post("/input-teacher", function(req, res, next) {
    if (!auth.ensureAdmin(req)) {
        return res.status(401).send({
            "message" : "You are not an admin"
        });
    }
    else {    
        var id;
        var query = mongoose.model("account", Account.schema);
        query.countDocuments({role : "teacher"}, (err, count) => {
            id = count + 1;
        })
        var role = "teacher";
        var name = req.body.name;
        var birthday = req.body.birthday;
        var address = req.body.address;
        var gender = req.body.gender;
        var mail = req.body.mail;
        var phone = req.body.phone;
        var _class = null;
        var subject = req.body.subject;

        var msg;
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
        if (msg == MSG.ERROR_MESSAGE) {
            return res.status(500).send({
                "message" : "Unexpected Error"
            })
        }

        msg = poster.createProfile(id, role, name, birthday, address, gender, mail, phone, _class, subject);
        if (msg == MSG.SUCCESS_MESSAGE) {
            return res.status(200).send({
                "message" : "Successful"
            });
        } else if (msg == MSG.ERROR_MESSAGE) {
            return res.status(500).send({
                "message" : "Unexpected Error"
            })
        } else {
            return res.status(418).send({
                "message" : "Dupplicate unique infomation"
            });
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