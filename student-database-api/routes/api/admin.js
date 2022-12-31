// API CALLS FUNCTION TO HANDLE REQUEST MADE BY ADMINS

const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const Account = require("../../models/account");
const Class = require("../../models/class");
const Grade = require("../../models/grade");
const Info = require("../../models/info");
const Rule = require("../../models/rule");
const Schoolyear = require("../../models/schoolyear");
const teacher_schedule = require("../../models/schedule_teacher");
const poster = require("../package/postFunctions").controller;
const MSG = require("../package/defineMessage").msg;
const session = require("../../session").session;
const auth = require("../../session").auth;
const thisYear = require("../package/defineSyntax").getYear;
const genZero = require("../package/defineSyntax").genZero;
const cookies = require("../../session").cookie;

router.use(express.json());

// GET
router.get("/rule", function(req, res) {
    if (!auth.ensureAdmin(req)) {
        return res.status(401).send({
            "message" : "You are not an admin"
        });
    } else {
        var nid = req.query.nid;
        var nid = req.query.nid;

        Rule.findOne({nid : nid}, (err, rule) => {
            if (err) {
                return res.status(500).send({
                    "message" : "unexpected error"
                })
            }
    
            if (!rule) {
                return res.status(404).send({
                    "message" : "record not found"
                })
            }
    
            return res.status(200).send(
                rule
            )    
        })
    }
})

router.get("/teacher-list", function(req, res) {
    if (!auth.ensureAdmin(req)) {
        return res.status(401).send({
            "message" : "You are not an admin"
        });
    } else {
        const info = mongoose.model("info", Info.schema);
        info.find({role : "teacher"}, (err, data) => {
            if (err) {
                return res.status(500).send({
                    "message" : "Unexpected Error"
                })
            }
            return res.status(200).send(
                data
            )
        })
    }
})

router.get("/about/:id", (req, res) => {
    if (!auth.ensureAdmin(req)) {
        return res.status(401).send({
            "message" : "You are not an admin"
        });
    }
    else {
        var {id} = req.params;
        console.log(id);
        const query = mongoose.model("info", Info.schema);
        query.findOne({id : id}, (err, info) => {
            if (err) {
                return res.status(500).send({
                    "message" : "unexpected error"
                })
            }
            if (!info) {
                return res.status(404).send({
                    "message" : "record not found"
                })
            }    

            return res.status(200).send(info)
        })
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
        console.log(req);
        var query = mongoose.model("account", Account.schema);
        query.countDocuments({}, (err, count) => {
            var role = "student";
            var id = thisYear() + genZero(count + 1, role) + String(count + 1);
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

            if (msg == MSG.SUCCESS_MESSAGE) {
                msg = poster.createProfile(id, role, name, birthday, address, gender, mail, phone, _class, subject, res);
            }

            Class.updateOne({id : _class}, {
                $push : {
                    members : id
                }
            })

        })
        
    }
})

router.post("/input-teacher", function(req, res, next) {
    if (!auth.ensureAdmin(req)) {
        return res.status(401).send({
            "message" : "You are not an admin"
        });
    }
    else {    
        var query = mongoose.model("account", Account.schema);
        query.countDocuments({role : "teacher"}, (err, count) => {
            var role = "teacher";
            var id = "t" + genZero(count + 1, role) + String(count + 1);
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

            msg = poster.createProfile(id, role, name, birthday, address, gender, mail, phone, _class, subject, res);
        })
    }
})

router.post("/rule", function(req, res, next) {
    if (!auth.ensureAdmin(req)) {
        return res.status(401).send({
            "message" : "You are not an admin"
        });
    } else {
        var nid = req.body.nid;
        var numberOfClass = {
            _10 : req.body.numberOfClass10,
            _11 : req.body.numberOfClass11,
            _12 : req.body.numberOfClass12
        }
        var numberOfStudent = {
            min : req.body.numberOfStudent_min,
            max : req.body.numberOfStudent_max,
        }
        var age = {
            min : req.body.age_min,
            max : req.body.age_max,
        }

        var msg = poster.updateRule(nid, numberOfStudent.min, numberOfStudent.max, 
            numberOfClass._10, numberOfClass._11, numberOfClass._12, 
            age.min, age.max)

            if (msg == MSG.SUCCESS_MESSAGE) {
                return res.status(200).send({
                    "message" : "Successful",
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

router.post("/class-list", function(req, res, next) {
    if (!auth.ensureAdmin(req)) {
        return res.status(401).send({
            "message" : "You are not an admin"
        });
    } else {
        // DEFINE FUNCTION HERE
    }
})

router.post("/teacher-schedule", function(req,res) {
    if (!auth.ensureAdmin(req)) {
        return res.status(401).send({
            "message" : "You are not an admin"
        })
    } else {
        // DEFINE FUNCTION HERE
    }
}) 

// DELETE

router.delete("/delete/:id", function(req, res) {
    if (!auth.ensureAdmin(req)) {
        return res.status(401).send({
            "message" : "You are not an admin"
        })
    } else {
        var {id} = req.params;
        Info.findOneAndDelete({id : id}, (err, result) => {
            if (err) {
                return res.status(500).send({
                    "message" : "unexpected error"
                })
            }

            if (!result) {
                return res.status(404).send({
                    "message" : "record not found"
                })
            }

            var _class = result._class;
            Class.updateOne({ id : _class}, {
                $pullAll : {
                    members:[id]
                }
            })

            return res.status(200).send({
                "message" : `${id} successfully deleted`
            })
        })
    }
})




module.exports = router;