// API INDEX FILE

const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const admin = require("../../models/admin");
const student = require("../../models/student");
const teacher = require("../../models/teacher");
const ensureAuth = require("../../auth/auth").ensureAuthenticated;

router.use(express.json());
router.use(ensureAuth.ensureAuth());

// Link to other routers here

router.get("/viewMoreInfo", function(req, res) {
    res.status(200).send({
                "Vien Hai Hien" : "MSSV",
                "Trinh Le Nguyen Vu": "MSSV",
                "Phuong Linh":"MSSV",
                "Le Minh Tri":"MSSV",
                "Thinh Ngo":"MSSV",
    })
})

router.use("/admin", require("./admin"));
router.use("/teacher", require("./teacher"));
router.use("/student", require("./student"));


// get student info. the "/studentInfo" url part is just an example, can be changed anytime
router.get("/studentInfo", function(req,res) {
    var studentID = req.body.id;
    if (studentID) {
        var result = mongoose.model('result', student.schema);

        // get Student Info from database function here
        // example:

        // var student = result.findOne({'studentID':`${studentID}`}, 
        // 'id role name birthday address gender mail phone subject');

        result.findOne({'id':`${studentID}`}, 
            'id role name birthday address gender mail phone subject', 
            function(err, result, next) {
                // if error, fuck off
                if (err) {
                    res.status(500).send({
                        "message":"unexpected error"
                    })
                    return next(err);
                }

                // record not found
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
            }
        )      
    }
    else {
        res.status(418).send({
            "message":"invalid ID"
        })
    }
})

module.exports = router;