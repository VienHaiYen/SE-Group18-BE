const express = require("express");
const mongoose = require("mongoose");
const param = require("../../params/params");
const Account = require("../../models/account");
const Class = require("../../models/class");
const ClassList = require("../../models/classList");
const Grade = require("../../models/grade");
const Info = require("../../models/info");
const Rule = require("../../models/rule");
const Schoolyear = require("../../models/schoolyear");


function createAccount(ID, PASSWORD, ROLE) {
    const acc = mongoose.model("account", Account.schema);

    var newAcc = new acc({
        id : ID,
        password : PASSWORD,
        role:ROLE
    });

    newAcc.save();
}

function createProfile(id, role, name, birthday, address, gender, mail, phone, subject) {

    if (!id) {
        // req.flash("error", "Please fill in an ID");
        msg = "Please fill in an ID";
        return msg;
    }
    if (!mail) {
        // req.flash("error", "Please fill in an email");
        msg = "Please fill in an email";
        return msg;
    }
    if (!name) {
        // req.flash("error", "Please fill in a name");
        msg = "Please fill in a name";
        return msg;
    }
    if(!birthday) {
        // req.flash("error", "Please fill in a birthday");
        msg = "Please fill in a birthday";
        return msg;
    }
    if (!phone ) {
        // req.flash("error", "Please fill in a phone number");
        msg = "Please fill in a phone number";
        return msg;
    }
    if (!gender) {
        // req.flash("error", "Please fill in a gender");
        msg = "Please fill in a gender";
        return msg;
    }

    var info = mongoose.model("info", Info.schema);

    info.findOne({"id":id}, function(err, user) {
        if (err) {return next(err);}
        if (user) {
            // req.flash("error", "ID's already existed");
            msg = "ID's already existed";
            return msg;
        }

        info.findOne({"mail":mail}, function(err, user) {
            if (err) {return next(err);}
            if (user) {
                // req.flash("error", "There's already an account with this email");
                msg = "There's already an account with this email";
                return msg;
            }

            info.findOne({"phone":phone}, function(err, user) {
                if (err) {return next(err);}
                if (user) {
                    // req.flash("error", "There's already an account with this phone number");
                    msg = "There's already an account with this phone number";
                    return msg;
                }
            });
    
    
        });
    })

    const profile = mongoose.model("info", Info.schema);
    var newProfile = new profile({
        id:id,
        role:role,
        name: name,
        birthday:birthday,
        address:address,
        gender:gender,
        mail:mail,
        phone:phone,
        subject:subject
    })
    newProfile.save();
    msg = "success";
    return msg;
}

module.exports = {
    controller: {createAccount, createProfile}
}
