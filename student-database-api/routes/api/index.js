// API INDEX FILE

const e = require("connect-flash");
const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const info = require("../../models/info");
const Class = require("../../models/class");
const poster = require("../package/postFunctions").controller;
const getter = require("../package/getFunctions").controller;
const session = require("../../session").session;
const auth = require("../../session").auth;
const MSG = require("../package/defineMessage").msg;

router.use(express.json());
// Link to other routers here

router.use(require("./admin"));
router.use(require("./teacher"));
router.use(require("./student"));

// GET
router.get("/viewDev", function(req, res) {
    if(auth.ensureAuthenticated(req)) {    
        res.status(200).send({
            "Vien Hai Hien" : "MSSV",
            "Trinh Le Nguyen Vu": "MSSV",
            "Phuong Linh":"MSSV",
            "Le Minh Tri":"MSSV",
            "Thinh Ngo":"MSSV",
        })
    }
    else {
        res.status(401).send({
            "message" : "You are not logged in"
        })
    }
})



router.get("/grade", (req, res) => {
    if(!auth.ensureAuthenticated(req)) {    
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
            var result = getter.getGrade(nid, id)
            var profile = JSON.parse(getter.getInfo(id, "student"));
            var studentName = profile["name"];
            var _class = profile["class"];
            
            if (result == MSG.ERROR_MESSAGE) {
                return res.status(500).send({
                    "message" : "unexpected error"
                })
            }

            if (result == MSG.EMPTY_MESSAGE) {
                return res.status(404).send({
                    "message" : "record not found"
                })
            }

            return res.status(200).send({
                "nid" : nid,
                "name" : studentName,
                "class" : _class,
                "result" : result
            })
        }
        else if (subject != null) { // Grade by class
            var data = JSON.parse(getter.getGrade(nid, id))["result"];
            var result = JSON.parse(data)[`${subject}`]
            var headTeacher = JSON.parse(getter.getClass(id))["headteacher"];
            

            if (data == MSG.ERROR_MESSAGE) {
                return res.status(500).send({
                    "message" : "unexpected error"
                })
            }

            if (data == MSG.EMPTY_MESSAGE) {
                return res.status(404).send({
                    "message" : "record not found"
                })
            }

            return res.status(200).send({
                "grade" : result,
                "headteacher" : headTeacher                
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
    if(!auth.ensureAuthenticated(req)) {    
        res.status(401).send({
            "message" : "You are not logged in"
        })
    }
    else {
        var id = req.body.id;
        var result = getter.getInfo(id, "student");

        if (result == MSG.ERROR_MESSAGE) {
            return res.status(500).send({
                "message" : "unexpected error"
            })
        }

        if (result == MSG.EMPTY_MESSAGE) {
            result = getter.getInfo(id, "teacher");
            if (result == MSG.ERROR_MESSAGE) {
                return res.status(500).send({
                    "message" : "unexpected error"
                })
            }

            if (result == MSG.EMPTY_MESSAGE) {
                return res.status(404).send({
                    "message" : "record not found"
                })
            }
        }

        return res.status(200).send({
            result
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

        var data = getter.getTeacherSchedule(nid, id);
        var _classes = JSON.parse(data)["_class"];
        var info = getter.getInfo(nid, id);
        var teacherName = JSON.parse(info)["name"];
        var subject = JSON.parse(info)["subject"];
        
        if (data == MSG.ERROR_MESSAGE || info == MSG.ERROR_MESSAGE) {
            return res.status(500).send({
                "message" : "unexpected error"
            })
        }

        if (data == MSG.EMPTY_MESSAGE || info == MSG.EMPTY_MESSAGE) {
            return res.status(404).send({
                "message" : "record not found"
            })
        }

        return res.status(404).send({
            _classes,
            "name" : teacherName,
            "subject" : subject
        })
        
    }
}) 

router.get("/class-list", (req, res) => {
    if (!auth.ensureTeacher(req) && !auth.ensureAdmin(req)) {
        return res.status(401).send({
            "message" : "You are not a teacher or an admin"
        })
    } else if (auth.ensureAdmin(req)) {
        var id = req.body.id;
        if (id != null) {
            var nid = req.body.nid;
            var result = getter.getClass(nid, id);
            var headTeacher = JSON.parse(result)["headteacher"];
            var member = JSON.parse(result)["member"];

            if (result == MSG.ERROR_MESSAGE) {
                return res.status(500).send({
                    "message" : "Unexpected Error"
                })
            }

            if (result == MSG.EMPTY_MESSAGE) {
                return res.status(404).send({
                    "message" : "Record not found"
                })
            }

            return res.status(200).send({
                "headteacher" : headTeacher,
                "member" : member
            })
        } else {

            const _class = mongoose.model("_class", Class.schema);
            var result = _class.find({"nid" : nid}, "classname headteacher");

            if (result == MSG.ERROR_MESSAGE) {
                return res.status(500).send({
                    "message" : "Unexpected Error"
                })
            }

            if (result == MSG.EMPTY_MESSAGE) {
                return res.status(404).send({
                    "message" : "Record not found"
                })
            }

            return res.status(200).send({
                result
            })
        }
    } else {
        var id = req.body.id;
        var nid = req.body.nid;
        var result = getter.getClass(nid, id);
        var member = JSON.parse(result)["member"];

        if (result == MSG.ERROR_MESSAGE) {
            return res.status(500).send({
                "message" : "Unexpected Error"
            })
        }

        if (result == MSG.EMPTY_MESSAGE) {
            return res.status(404).send({
                "message" : "Record not found"
            })
        }

        return res.status(200).send({
            "member" : member
        })
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