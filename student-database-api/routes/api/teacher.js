// API CALLS FUNCTION TO HANDLE REQUEST MADE BY TEACHERS

const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const user = require("../../models/info");
const ensureAuth = require("../../auth/auth").ensureAuthenticated;
const grade = require("../../models/grade");


router.use(express.json());
// router.use(ensureAuth.ensureTeacher());

router.get("/about", function(req, res) {

})

router.get("/grade", function(req,res) {
    })

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