// API INDEX FILE

const e = require("connect-flash");
const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const info = require("../../models/info");
const poster = require("../package/postFunctions").controller;
const getter = require("../package/getFunctions").controller;
const session = require("../../session").session;
const auth = require("../../session").auth;

router.use(express.json());
// Link to other routers here

router.use(require("./admin"));
router.use(require("./teacher"));
router.use(require("./student"));

// GET
router.get("/viewMoreInfo", function(req, res) {
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
        
    }
}) 

// router.get("/schedule", (req, res) => {
//     if(!auth.ensureAuthenticated(req)) {    
//         res.status(401).send({
//             "message" : "You are not logged in"
//         })
//     }
//     else {
        
//     }
// })

router.get("/about", (req, res) => {
    if(!auth.ensureAuthenticated(req)) {    
        res.status(401).send({
            "message" : "You are not logged in"
        })
    }
    else {
        
    }
})

router.get("/teacher-schedule", function(req,res) {
    if (!auth.ensureTeacher(req) && !auth.ensureAdmin(req)) {
        res.status(401).send({
            "message" : "You are not a teacher or an admin"
        })
    } else {

    }
}) 

router.get("/class-list", (req, res) => {
    if (!auth.ensureTeacher(req) && !auth.ensureAdmin(req)) {
        res.status(401).send({
            "message" : "You are not a teacher or an admin"
        })
    } else {

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
        
    }
})

module.exports = router;