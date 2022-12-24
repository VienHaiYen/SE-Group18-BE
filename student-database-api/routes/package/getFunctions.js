const express = require("express");
const mongoose = require("mongoose");
const param = require("../../params/params");
const Account = require("../../models/account");
const Class = require("../../models/class");
const Grade = require("../../models/grade");
const Info = require("../../models/info");
const Rule = require("../../models/rule");
const Schoolyear = require("../../models/schoolyear");
const teacher_schedule = require("../../models/schedule_teacher");

function getInfo(id, role) {
    const info = mongoose.model("info", Info.schema);
    var result = info.findOne({$and : [
        {
            "id" : id
        },
        {
            "role" : role
        }
    ]}, (err, result) => {
        if (err) return err;
        if (!result) return null;
        return result;
    })
    return result;
}
// NEED FIXING (DONE)
function getTeacherSchedule(nid, id) {
    const teacherShedule = mongoose.model("teacher-schedule", teacher_schedule.schema);

    var result = teacherShedule.findOne({$and :[
        {"nid" : nid},
        {"schedule.id" : id}
    ]}, (err, result) => {
        if (err) return err;
        if (!result) return null;
        return result;
    })

    return result;
}
// NEED FIXING (PENDING)
function getClass(id) {
    const _class = mongoose.model("class", Class.schema);
    var result = _class.findOne({$and : [
        // {"nid" : nid},
        {"classlist.id" : id}
    ]}, (err, result) => {
        if (err) return err;
        if (!result) return null;
        return result;
    })
    return result;
}
// NEED FIXING (DONE)
function getGrade(nid, id) {
    const grade = mongoose.model("grade", Grade.schema);
    var result = grade.findOne({$and : [
        {"nid" : nid},
        {"point.id" : id}
    ]}, (err, result) => {
        if (err) return err;
        if (!result) return null;
        return result;
    })
    return result;
}

function getRule(nid) {
    const rule = mongoose.model("rule", Rule.schema);
    var result = rule.find({"nid" : nid} , (err, result) => {
        if (err) return err;
        if (!result) return null;
        return result;
    })
    return result;
}

function getSchoolYear(nid) {
    const year = mongoose.model("Schoolyear", Schoolyear.schema);
    var result = year.findOne({"nid" : nid} , (err, result) => {
        if (err) return err;
        if (!result) return null;
        return result;
    })
    return result;
}

function getAccount(id) {
    const acc = mongoose.model("account", Account.schema);
    var result = acc.findOne({"id" : id}, (err, result) => {
        if (err) return err;
        if (!result) return null;
        return result;
    })
    return result;
}

module.exports = {
    controller: {getInfo, getTeacherSchedule, getClass, getAccount, getGrade, getRule, getSchoolYear}
}
