// API CALLS FUNCTION TO HANDLE REQUEST MADE BY TEACHERS

const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const admin = require("../../models/admin");
const student = require("../../models/student");
const teacher = require("../../models/teacher");
const ensureAuth = require("../../auth/auth").ensureAuthenticated;

router.use(express.json());
router.use(ensureAuth.ensureTeacher());

router.get("/about", function(req, res) {
    var teacherID = req.body.id;
    if (teacherID) {
        var result = mongoose.model('result', teacher.schema)
        result.findOne({'teacherID':`${teacherID}`}, 
            function(err, result) {
                if (err) {
                    res.status(500).send({
                        "message":"unexpected error"
                    })
                }
                if (!result) {
                    res.status(404).send({
                        "message":"record not found"
                    })
                    return null;
                }

                // found record
                res.status(200).send({
                    "info": {
                        "id": `${result.id}`,
                        "role": `${result.role}`,
                        "name": `${result.name}`,
                        "birthday": `${result.birthday}`,
                        "address": `${result.address}`,
                        "gender": `${result.gender}`,
                        "mail": `${result.mail}`,
                        "phone": `${result.phone}`,
                        "subject": `${result.subject}`
                    }
                })

        })
    }
    else {
        res.status(418).send({
            "message":"invalid id"
        })
    }
})

router.get("/grade", function(req,res) {
    var teacherID = req.body.id;
    if (teacherID) {
        var result = mongoose.model('result', teacher.schema)
        result.findOne({'id':`${teacherID}`}, 
            function(err, result) {
                if (err) {
                    res.status(500).send({
                        "message":"unexpected error"
                    })
                }
                if (!result) {
                    res.status(404).send({
                        "message":"record not found"
                    })
                    return null;
                }

                // found record
                res.status(200).send({
                    "info": {
                        "id": `${result.id}`,
                        "role": `${result.role}`,
                        "name": `${result.name}`,
                        "birthday": `${result.birthday}`,
                        "address": `${result.address}`,
                        "gender": `${result.gender}`,
                        "mail": `${result.mail}`,
                        "phone": `${result.phone}`,
                        "subject": `${result.subject}`
                    }
                })

        })
    }
    else {
        res.status(418).send({
            "message":"invalid id"
        })
    }
})

router.post("input-grade", function(req,res, next) {

})

router.get("class-list", function(req,res) {

}) 

router.get("teacher-schedule", function(req,res) {

}) 

module.exports = router;