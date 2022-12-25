// API CALLS FUNCTION TO HANDLE REQUEST MADE BY STUDENTS

const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const info = require("../../models/info");
const poster = require("../package/postFunctions").controller;
const getter = require("../package/getFunctions").controller;
const session = require("../../session").session;
const auth = require("../../session").auth;
const MSG = require("../package/defineMessage").msg;

router.use(express.json())

// GET

// POST

module.exports = router;