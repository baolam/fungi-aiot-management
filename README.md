# 🍄 Fungi AIoT Management System

> **Hệ thống AIoT giám sát môi trường và tự động hoá quản lý trang trại nấm thông minh.**

## 📖 Giới thiệu
Dự án tích hợp công nghệ Internet vạn vật (IoT) và trí tuệ nhân tạo nhằm tối ưu hoá quy trình trồng nấm. Hệ thống tự động thu thập các chỉ số vi khí hậu (nhiệt độ, độ ẩm không khí, độ ẩm cơ chất), điều khiển tự động các thiết bị vi khí hậu và cung cấp giao diện trực quan cho người nông dân.

## ✨ Tính năng nổi bật
- **Giám sát thời gian thực**: Cập nhật liên tục các thông số nhiệt độ, độ ẩm nhà nấm từ cảm biến.
- **Tự động kích hoạt cơ cấu chấp hành**: Tự động bật/tắt máy phun sương, quạt thông gió khi các chỉ số vượt ngưỡng lý tưởng.
- **Lưu trữ & Truy xuất dữ liệu**: Lưu trữ toàn bộ lịch sử đo đạc vào cơ sở dữ liệu SQLite để phân tích năng suất.
- **Dashboard trực quan**: Giao diện web hiển thị biểu đồ chỉ số môi trường theo thời gian.

## 🛠️ Ngăn xếp công nghệ
- **Backend**: Node.js (Express), Python (xử lý dữ liệu & phân tích)
- **Frontend**: HTML5, CSS3, JavaScript
- **Database**: SQLite3 (`project.sqlite3`)
- **Hardware & IoT**: ESP32 / ESP8266, Cảm biến nhiệt ẩm DHT, Rơ-le điều khiển thiết bị

## 📁 Cấu trúc thư mục
```
├── config.env           # File cấu hình môi trường
├── package.json         # Danh sách thư viện Node.js
├── requirements.txt     # Danh sách thư viện Python
├── project.sqlite3      # Cơ sở dữ liệu SQLite
├── server.js            # Node.js backend server
├── main.py              # Xử lý phân tích dữ liệu Python
├── js/                  # Client-side scripts
└── python/              # Các module xử lý logic cảm biến
```

## 🚀 Hướng dẫn cài đặt & Chạy

### 1. Yêu cầu hệ thống
- [Node.js](https://nodejs.org/) (phiên bản 16 trở lên)
- [Python 3.8+](https://www.python.org/)

### 2. Cài đặt các gói phụ thuộc
```bash
# Cài đặt Node dependencies
npm install

# Cài đặt Python packages
pip install -r requirements.txt
```

### 3. Khởi chạy hệ thống
```bash
# Khởi chạy server backend
node server.js

# Khởi chạy module xử lý
python main.py
```
Truy cập giao diện dashboard tại: `http://localhost:3000` (hoặc cổng được định nghĩa trong `config.env`).

## 📄 Bản quyền
Dự án được xây dựng và phát triển bởi [@baolam](https://github.com/baolam).
