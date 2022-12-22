// middleware to check user type

var ensureAuth = function ensureAuthenticated(req, res, next) {
    if (req.user.isAuthenticated()) {
        next();
    } else {
        req.flash("info", "You are not logged in");
    }
}

var ensureTeacher = function ensureAuthenticated(req, res, next) {
    if (req.user.role == "teacher") {
        next();
    } else {
        req.flash("info", "You are not logged in as a teacher");
    }
}

var ensureStudent = function ensureAuthenticated(req, res, next) {
    if (req.user.role == "student") {
        next();
    } else {
        req.flash("info", "You are not logged in as a student");
    }
}
var ensureAdmin = function ensureAuthenticated(req, res, next) {
    if (req.user.role == "admin") {
        next();
    } else {
        req.flash("info", "You are not logged in as an admin");
        console.log(req.user);
    }
}

module.exports = {ensureAuthenticated: {ensureAuth, ensureTeacher, ensureStudent, ensureAdmin}};