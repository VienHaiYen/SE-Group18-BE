// API CALLS FUNCTION TO HANDLE REQUEST MADE BY STUDENTS

const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const info = require("../../models/info");
const poster = require("../package/postFunctions").controller;
const getter = require("../package/getFunctions").controller;

router.use(express.json())
// router.use(ensureAuth.ensureStudent());

module.exports = router;