var currentTime = new Date();
var year = currentTime.getFullYear() % 100;

const CURRENT_YEAR = {first : year, second : year + 1};
const STUDENTID_LENGTH = 8;
const TEACHERID_LENGTH = 4;
const ADMINID_LENGTH = 4;


function getYear() {
    return String(CURRENT_YEAR.first).concat(String(CURRENT_YEAR.second));
}

function genZero(number, role) {
    if (role == "student") {
        result = ""
        if (number < 10) {
            result = "000";
        }
        if (number < 100) {
            result = "00"
        }
        else {
            result = "0"
        }
        return result;
    }
    if (role == "teacher") {
        result = ""
        if (number < 10) {
            result = "00";
        }
        else {
            result = "0"
        }
        return result;

    }
    if (role == "admin") {
        result = ""
        if (number < 10) {
            result = "00";
        }
        else {
            result = "0"
        }
        return result;

    }
}

module.exports = {
    getYear, genZero
} 