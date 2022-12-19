// API CALLS FUNCTION TO HANDLE REQUEST MADE BY STUDENTS

const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const admin = require("../../models/admin");
const student = require("../../models/student");
const teacher = require("../../models/teacher");

router.use(express.json())

module.exports = router;