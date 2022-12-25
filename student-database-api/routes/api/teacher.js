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
        // DEFINE FUNCTION HERE
    }
})



module.exports = router;