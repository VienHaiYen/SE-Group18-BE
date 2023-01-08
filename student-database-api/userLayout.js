// Admin
const admin_layout = [
  {
    to: "/home",
    label: "Trang chủ",
  },
  {
    to: "/grade",
    label: "Điểm số",
  },
  {
    to: "/input-student",
    label: "Thêm học sinh",
  },
  {
    to: "/class-list",
    label: "Danh sách lớp",
  },
  {
    to: "/teacher-list",
    label: "Danh sách giáo viên",
  },
  // {
  //   to: "/teacher-schedule",
  //   label: "Lịch dạy",
  // },
  {
    to: "/rule",
    label: "Quy định",
  },
];

// Teacher

const teacher_layout = [
  {
    to: "/about",
    label: "Thông tin",
  },
  // {
  //   to: "/grade",
  //   label: "Điểm số",
  // },
  {
    to: "/input-grade",
    label: "Nhập điểm cho học sinh",
  },
  {
    to: "/class-list",
    label: "Danh sách lớp",
  },
  // {
  //   to: "/teacher-schedule",
  //   label: "Lịch dạy",
  // },
];

// Student

const student_layout = [
  {
    to: "/about",
    label: "Thông tin ",
  },
  {
    to: "/grade",
    label: "Điểm số",
  },
];

LAYOUT = {};
LAYOUT["admin"] = admin_layout;
LAYOUT["teacher"] = teacher_layout;
LAYOUT["student"] = student_layout;

function layout(user) {
  return LAYOUT[user];
}

module.exports = layout;
