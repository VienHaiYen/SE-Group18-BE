const express = require("express");
var router = express.Router();


// Link to other routers here

router.get("/viewMoreInfo", function(req, res) {
    res.json({
                "Vien Hai Hien" : "MSSV",
                "Trinh Le Nguyen Vu": "MSSV",
                "Phuong Linh":"MSSV",
                "Le Minh Tri":"MSSV",
                "Thinh Ngo":"MSSV",
    })
})

module.exports = router;