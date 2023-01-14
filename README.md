# GIỚI THIỆU ĐỒ ÁN NHÓM 18
## Giới thiệu thành viên
- 20120633: Viên Hải Yến
- 20120634: Lê Minh Trí
- 20120630: Trịnh Lê Nguyên Vũ
- 20120521: Trần Thị Phương Linh
## Giới thiệu về sản phẩm
- Tên: PHẦN MỀM QUẢN LÍ HỌC SINH
- Mục tiêu:
  - Quản lí thông tin học sinh
  - Lưu trữ điểm số
  - Cho phép thao tác với dữ liệu
- Người dùng:
  - Quản trị viên: thực hiện các thao tác với thông tin người dùng (thêm, xóa, sửa) thông tin
  - Giáo viên: nhập điểm và xem danh sách lớp
  - Học sinh: xem điểm
# MÔI TRƯỜNG THỰC THI
- Ngôn ngữ sử dụng: Javascript (các thư viện như express, react,...)
- Môi trường code: Visual studio code
- Môi trường lưu trữ dữ liệu: MongoDB
# HƯỚNG DẪN CẤU HÌNH PROJECT CHẠY TRÊN LOCALHOST
**BƯỚC 1:** Thực thi server
Vào SE-Group18-BE > student-database-api > npm run dev
*Kết quả:* Môi trường server được chạy trên localhost:55000
**BƯỚC 2:** Chạy môi trường Client
Vào SE-Group18-FE > student-mangement > npm start
*Kết quả:* Môi trường giao diện hiển thị được chạy trên localhost:3000
**Cách chạy các vai trò với login khác nhau**
- admin: Tài khoản a001-a005, mật khẩu: 123
- giáo viên: Tài khoản t001-t020, mật khẩu: trùng với username
- học sinh: Tài khoản: 22230002, 22230004,22230006,.... (có thể xem với vai trò của admin, cẩn thận với những mã hs không tồn tại), mật khẩu tương tự tài khoản
# LINK GOOGLE DRIVE VIDEO DEMO
https://drive.google.com/drive/folders/1nG4ZOr9bOxANz51Yr65ZHdJmv6Ntaq0c?usp=sharing
# CURRENT STATUS
- Hoàn thành ứng dụng cho học sinh, gv, quản trị viên tương tác điểm số
- Hoàn thành việc kết nối ứng dụng với database, kết nối giao diện với server
- Hiển thị các chức năng:
  - Xem thông tin
  - Xem danh sách lớp
  - Xem danh sách giáo viên
  - Nhập điểm, sửa điểm
  - Phân công lớp
  - Thành lập bảng điểm tổng kết
  - Xem quy định