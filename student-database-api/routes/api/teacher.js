// API CALLS FUNCTION TO HANDLE REQUEST MADE BY TEACHERS

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
const session = require("../../session").session;
const auth = require("../../session").auth;
const MSG = require("../package/defineMessage").msg;
const thisYear = require("../package/defineSyntax");
const cookies = require("../../session").cookie;


router.use(express.json());

// GET

// POST
router.post("/input-grade", function(req,res, next) {
    if (!auth.ensureTeacher(req)) {
        return res.status(401).send({
            "message" : "You are not a teacher"
        });
    } else {
        var member = req.body.member;
        var id = req.body.id;
        Info.findOne({$and : [
            {id : id},
            {role : "teacher"}
        ]}, (err, info) => {
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

            var subject = info["subject"];

            for (let i = 0; i < member.length; i++) {
                var msg = poster.updateScoreBySubject(subject, nid , member[i].id, member[i].score);
                if (msg == MSG.ERROR_MESSAGE) {
                    return res.status(500).send({
                        "message" : "unexpected error"
                    })
                }
        
                if (msg == MSG.EMPTY_MESSAGE) {
                    return res.status(404).send({
                        "message" : "record not found"
                    })
                }
            }

            return res.status(404).send({
                "message" : "Successful"
            })
        })
    }
})



module.exports = router;