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
const thisYear = require("../package/defineSyntax").getYear;
const cookies = require("../../session").cookie;


router.use(express.json());

// GET

// POST
router.post("/input-grade", function(req,res, next) {
    var userSession = auth.ensureTeacher(req);
    if (!userSession) {
        return res.status(401).send({
            "message" : "You are not a teacher"
        });
    } else {
        var point = req.body.point;
        var id = userSession.id;
        var nid = req.body.nid;
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
            var subject = info.subject;
            var msg = poster.updateScoreBySubject(subject, nid , point.id, point.result, res);
        })
    }
})



module.exports = router;