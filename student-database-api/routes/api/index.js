// API INDEX FILE

const e = require("connect-flash");
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
const Teacher_schedule = require("../../models/schedule_teacher");
const poster = require("../package/postFunctions").controller;
const session = require("../../session").session;
const auth = require("../../session").auth;
const MSG = require("../package/defineMessage").msg;
const thisYear = require("../package/defineSyntax");
const cookies = require("../../session").cookie;

router.use(express.json());
// Link to other routers here

router.use(require("./admin"));
router.use(require("./teacher"));
router.use(require("./student"));

// GET
router.get("/viewDev", function(req, res) {
    userSession = auth.ensureAuthenticated(req);
    if(userSession) {    
        res.status(200).send({
            "Vien Hai Hien" : "20120633",
            "Trinh Le Nguyen Vu": "20120630",
            "Tran Thi Phuong Linh":"20120521",
            "Le Minh Tri":"20120634",
            "Thinh Ngo":"20120586",
        })
    }
    else {
        res.status(401).send({
            "message" : "You are not logged in"
        })
    }
})



router.get("/grade", (req, res) => {
    userSession = auth.ensureAuthenticated(req);
    if(!userSession) {    
        res.status(401).send({
            "message" : "You are not logged in"
        })
    }
    else {
        // DEFINE FUNCTION HERE
        var id = req.body.id;
        var subject = req.body.subject;
        var nid = req.body.nid;

        if (subject == null) { // Grade by student

            Grade.findOne({ $and : [
                {"nid" : nid},
                {"point.id" : id}
            ]}, (err, grade) => {
                if (err) {
                    return res.status(500).send({
                        "message" : "unexpected error"
                    })
                }

                if (!grade) {
                    return res.status(404).send({
                        "message" : "record not found"
                    })
                }

                Info.findOne({id : "id"}, "name _class", (err, info) => {
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

                    return res.status(200).send({
                        "nid" : nid,
                        "name" : info.name,
                        "class" : info._class,
                        "result" : grade
                    })
                    
                })

            })
        }
        else if (subject != null) { // Grade by class
            Grade.findOne({ $and : [
                {"nid" : nid},
                {"point.id" : id}
            ]}, "result" , (err, grade) => {
                if (err) {
                    return res.status(500).send({
                        "message" : "unexpected error"
                    })
                }

                if (!grade) {
                    return res.status(404).send({
                        "message" : "record not found"
                    })
                }

                result = JSON.parse(grade.result)[`${subject}`];

                Class.findOne({id : "id"}, "headteacher", (err, _class) => {
                    if (err) {
                        return res.status(500).send({
                            "message" : "unexpected error"
                        })
                    }
    
                    if (!_class) {
                        return res.status(404).send({
                            "message" : "record not found"
                        })
                    }

                    return res.status(200).send({
                        "grade" : result,
                        "headteacher" : _class.headteacher
                    })
                    
                })

            })

        }
    }
}) 

// REDACTED
// router.get("/schedule", (req, res) => {
//     if(!auth.ensureAuthenticated(req)) {    
//         res.status(401).send({
//             "message" : "You are not logged in"
//         })
//     }
//     else {
//    
//     }
// })

router.get("/about", (req, res) => {
    userSession = auth.ensureAuthenticated(req);
    if(!userSession) {    
        res.status(401).send({
            "message" : "You are not logged in"
        })
    }
    else {
        var id = cookies[userSession];
        Info.findOne({id : id}, (err, info) => {
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
            return res.status(200).send(
                info
            )
        })

        
    }
})

router.get("/teacher-schedule", function(req,res) {
    if (!auth.ensureTeacher(req) && !auth.ensureAdmin(req)) {
        res.status(401).send({
            "message" : "You are not a teacher or an admin"
        })
    } else {
        var id = req.body.id;
        var nid = req.body.nid;
        const ts = mongoose.model("teacher-schedule", Teacher_schedule.schema);
        ts.findOne({$and: [
            {nid : nid},
            {id : id}
        ]}, "_class",(err, ts) => {
            if (err) {
                return res.status(500).send({
                    "message" : "unexpected error"
                })
            }

            if (!ts) {
                return res.status(404).send({
                    "message" : "record not found"
                })
            }

            Info.findOne({id : id} , "name subject" , (err, info) => {
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
                return res.status(404).send({
                    _classes,
                    "name" : info.name,
                    "subject" : info.subject
                })

            })
        })
        
    }
}) 

router.get("/class-list", (req, res) => {
    if (!auth.ensureTeacher(req) && !auth.ensureAdmin(req)) {
        return res.status(401).send({
            "message" : "You are not a teacher or an admin"
        })
    } else if (auth.ensureAdmin(req)) {// Admin
        var id = req.body.id;
        if (id != null) {
            var nid = req.body.nid;

            Class.find({ $and : [
                {nid : nid}
            ]}, "headteacher member", (err, _class) => {

                if (err) {
                    return res.status(500).send({
                        "message" : "Unexpected Error"
                    })
                }

                if (!_class) {
                    return res.status(404).send({
                        "message" : "Record not found"
                    })
                }

                return res.status(200).send(
                    _class
                )
            })


        } else { // Teacher

            const _class = mongoose.model("_class", Class.schema);
            _class.find({ $and : [
                {nid : nid},
                {id : id}
            ]}, "classname headteacher", (err, _class) => {
                if (err) {
                    return res.status(500).send({
                        "message" : "Unexpected Error"
                    })
                }
    
                if (!_class) {
                    return res.status(404).send({
                        "message" : "Record not found"
                    })
                }
    
                return res.status(200).send({
                    "classname" : _class.classname,
                    "headteacher" : _class.headteacher
                })
            });
        }
    } else {
        var id = req.body.id;
        var nid = req.body.nid;

        const _class = mongoose.model("_class", Class.schema);
        _class.find({ $and : [
            {nid : nid},
            {id : id}
        ]}, "member", (err, _class) => {
            if (err) {
                return res.status(500).send({
                    "message" : "Unexpected Error"
                })
            }

            if (!_class) {
                return res.status(404).send({
                    "message" : "Record not found"
                })
            }

            return res.status(200).send(
                _class.member
            )
        });
    }
})

// POST

router.post("/about", (req, res) => {
    if(!auth.ensureAuthenticated(req)) {    
        res.status(401).send({
            "message" : "You are not logged in"
        })
    }
    else {
        // DEFINE FUNCTION HERE
    }
})

module.exports = router;