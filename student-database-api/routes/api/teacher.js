// API CALLS FUNCTION TO HANDLE REQUEST MADE BY TEACHERS

const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const info = require("../../models/info");
const grade = require("../../models/grade");
const poster = require("../package/postFunctions").controller;
const getter = require("../package/getFunctions").controller;


router.use(express.json());
// router.use(ensureAuth.ensureTeacher());

router.post("/input-grade", function(req,res, next) {

})

router.get("/class-list", function(req,res) {
    var classId = req.body.id;
    if (id) {
        
    }
    else {

    }
}) 

router.get("/teacher-schedule", function(req,res) {

}) 

module.exports = router;