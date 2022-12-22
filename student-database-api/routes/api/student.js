// API CALLS FUNCTION TO HANDLE REQUEST MADE BY STUDENTS

const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const user = require("../../models/info");
const ensureAuth = require("../../auth/auth").ensureAuthenticated;

router.use(express.json())
// router.use(ensureAuth.ensureStudent());

module.exports = router;