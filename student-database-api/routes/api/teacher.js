// API CALLS FUNCTION TO HANDLE REQUEST MADE BY TEACHERS

const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const info = require("../../models/info");
const grade = require("../../models/grade");
const poster = require("../package/postFunctions").controller;
const getter = require("../package/getFunctions").controller;
const session = require("../../session").session;
const auth = require("../../session").auth;
const MSG = require("../package/defineMessage").msg;


router.use(express.json());

// GET

// POST
router.post("/input-grade", function(req,res, next) {
    if (!auth.ensureTeacher(req)) {
        res.status(401).send({
            "message" : "You are not a teacher"
        });
    } else {
        var member = req.body.member;
        var id = req.body.id;
        var data = getter.getInfo(id, "teacher");
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

        var subject = JSON.parse(data)["subject"];

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
    }
})



module.exports = router;