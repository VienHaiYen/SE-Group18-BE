// Admin
const admin_layout = {
    home : {
        "to" : "/home",
        "label" : "/Thông tin"
    },
    grade : {
        "to" : "/grade",
        "label" : "/Điểm số"
    },
    // schedule : {
    //     "to" : "/schedule",
    //     "label" : "/Thời khoá biểu"
    // },
    input_grade : {
        "to" : "/input-grade",
        "label" : "/Nhập điểm cho học sinh"
    },
    input_student : {
        "to" : "/input-student",
        "label" : "/Thêm học sinh"
    },
    class_list : {
        "to" : "/class-list",
        "label" : "/Danh sách lớp"
    },
    teacher_schedule : {
        "to" : "/teacher-schedule",
        "label" : "/Lịch dạy"
    },
    rule : {
        "to" : "/rule",
        "label" : "/Quy định"
    }
}


// Teacher

const teacher_layout = {
    about : {
        "to" : "/about",
        "label" : "/Thông tin"
    },
    grade : {
        "to" : "/grade",
        "label" : "/Điểm số"
    },
    input_grade : {
        "to" : "/input-grade",
        "label" : "/Nhập điểm cho học sinh"
    },
    class_list : {
        "to" : "/class-list",
        "label" : "/Danh sách lớp"
    },
    teacher_schedule : {
        "to" : "/teacher-schedule",
        "label" : "/Lịch dạy"
    },
}


// Student

const student_layout = {
    about : {
        "to" : "/about",
        "label" : "/Thông tin"
    },
    grade : {
        "to" : "/grade",
        "label" : "/Điểm số"
    },
    // schedule : {
    //     "to" : "/schedule",
    //     "label" : "/Thời khoá biểu"
    // },
}

LAYOUT = {}
LAYOUT["admin"] = admin_layout;
LAYOUT["teacher"] = teacher_layout;
LAYOUT["student"] = student_layout;

function layout(user) {
    return LAYOUT[user];
}

module.exports = layout;