// Admin
const admin_layout = {
    home : "/home",
    grade : "/grade",
    schedule : "/schedule",
    input_grade : "/input-grade",
    input_student : "/input-student",
    class_list : "/class-list",
    teacher_schedule : "/teacher-schedule",
    rule : "/rule"
}


// Teacher

const teacher_layout = {
    about : "/about",
    grade : "/grade",
    input_grade : "/input-grade",
    class_list : "/class-list",
    teacher_schedule : "/teacher-schedule",
}


// Student

const student_layout = {
    about : "/about",
    grade : "/grade",
    schedule : "/schedule",
}

LAYOUT = {}
LAYOUT["admin"] = admin_layout;
LAYOUT["teacher"] = teacher_layout;
LAYOUT["student"] = student_layout;

function layout(user) {
    return LAYOUT[user];
}

module.exports = layout;