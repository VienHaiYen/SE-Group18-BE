// API INDEX FILE

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

router.use(require("./admin"));
router.use(require("./teacher"));
router.use(require("./student"));

router.get("/grade", (req, res) => {

}) 

router.get("/about", (req, res) => {

})

router.get("/teacher-schedule", (req, res) => {

})

router.get("/class-list", (req, res) => {
    
})

module.exports = router;