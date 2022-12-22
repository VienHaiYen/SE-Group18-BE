// API CALLS FUNCTION TO HANDLE REQUEST MADE BY ADMINS

const express = require("express");
const { default: mongoose } = require("mongoose");
const Account = require("../../models/account");
const router = express.Router();
const info = require("../../models/info");
const poster = require("../package/postFunctions").controller;
const getter = require("../package/getFunctions").controller;

router.use(express.json());
// router.use(ensureAuth.ensureAdmin());

router.post("/input-student", function(req, res, next) {
    var id = req.user.id;
    var role = "student";
    var name = req.user.name;
    var birthday = req.user.birthday;
    var address = req.user.address;
    var gender = req.user.gender;
    var mail = req.user.mail;
    var phone = req.user.phone;
    
    poster.createProfile(id, role, name, birthday, address, gender, mail, phone, null);
    poster.createAccount(id, id, role);
})

router.get("/rule", function(req, res) {

})

router.post("/rule", function(req, res, next) {
    
})
module.exports = router;