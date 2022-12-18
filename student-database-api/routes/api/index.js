const express = require("express");
const { get } = require("mongoose");
var router = express.Router();

router.get("/viewMoreInfo", function(req, res) {
    res.json({
                "Vien Hai Hien" : "MSSV",
                "Trinh Le Nguyen Vu": "MSSV",
                "Phuong Linh":"MSSV",
                "Le Minh Tri":"MSSV",
                "Thinh Ngo":"MSSV",
    })
})


// Link to other routers here

module.exports = router;