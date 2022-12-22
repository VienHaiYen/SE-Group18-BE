// API CALLS FUNCTION TO HANDLE REQUEST MADE BY ADMINS

const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const admin = require("../../models/admin");
const student = require("../../models/student");
const teacher = require("../../models/teacher");
const ensureAuth = require("../../auth/auth").ensureAuthenticated;

router.use(express.json());
router.use(ensureAuth.ensureAdmin());

router.post("/addStudent", function(req, res, next) {
    var studentID = req.body.studentID;
    var email = req.body.email;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var birthday = req.body.birthday;
    var gender = req.body.gender;
    var phoneNumber = req.body.phoneNumber;
    var password = req.body.password;
    var repassword = req.body.repassword;
    var role = "student";
    
    if (!studentID) {
        req.flash("error", "Please fill in an ID");
        return res.redirect("/addStudent");
    }
    if (!email) {
        req.flash("error", "Please fill in an email");
        return res.redirect("/addStudent");
    }
    if (!firstname || !lastname) {
        req.flash("error", "Please fill in your full name");
        return res.redirect("/addStudent");
    }
    if(!birthday) {
        req.flash("error", "Please fill in your birthday");
        return res.redirect("/addStudent");
    }
    if (!phoneNumber ) {
        req.flash("error", "Please fill in a phone number");
        return res.redirect("/addStudent");
    }
    if (!password) {
        req.flash("error", "Please fill in a password");
        return res.redirect("/addStudent");
    }
    if (password != repassword) {
        req.flash("error", "Password does not match");
        return res.redirect("/addStudent")
    }

    student.findOne({studentID:studentID}, function(err, user) {
        if (err) {return next(err);}
        if (user) {
            req.flash("error", "ID's already existed");
            return res.redirect("/addStudent");
        }

        student.findOne({email:email}, function(err, user) {
            if (err) {return next(err);}
            if (user) {
                req.flash("error", "There's already an account with this email");
                return res.redirect("/addStudent");
            }

            student.findOne({phoneNumber:phoneNumber}, function(err, user) {
                if (err) {return next(err);}
                if (user) {
                    req.flash("error", "There's already an account with this phone number");
                    return res.redirect("/addStudent");
                }
                var newStudent = new student({
                    username:studentID,
                    adminID:studentID,
                    role:role,
                    password:password,
                    email:email,
                    fullname:{
                        firstname:firstname,
                        lastname:lastname
                    },
                    birthday:birthday,
                    gender:gender,
                    phoneNumber:phoneNumber
            })
    

            newStudent.save(next);
            });
    
    
        });
    }
)
})
module.exports = router;