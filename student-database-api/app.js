const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");

// Custom-made modules
const param = require("./params/params");
const setuppassport = require("./setuppasssport");


// Temporary port
const Port = 55000;


// Connect to the database that store user's account info mation
var app = express();
mongoose.connect(param.DATABASE);
// setuppassport();

app.set("port", process.env.PORT || Port); // localhost:Port, use the 'express' module
app.use(bodyparser.urlencoded({extended:false})); // To access the information in the body of a POST request
app.use(cookieParser()); // Not yet used
app.use(session({
    secret:"NMCNPM_ramdomBullshitHere",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// app.use("/", require("./routes/web"));
app.use("/api", require("./routes/api"));



// Start the server
app.listen(app.get("port"), function() {
    console.log("Server started on port " + app.get("port"));
});
