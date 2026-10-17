const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
// ใช้ Port จาก Environment Variable ของ Hosting หรือใช้ 3000 สำหรับรันบนเครื่องตัวเอง
const PORT = process.env.PORT || 3000;

app.use(cors());

// กำหนด Path สำหรับโฟลเดอร์ frontend (ย้อนกลับ 1 โฟลเดอร์จาก backend ไปที่ frontend)
const frontendPath = path.join(__dirname, '../frontend');
app.use(express.static(frontendPath));

// API สำหรับดึงข้อมูลเส้นทางรถ (ดึงจากโฟลเดอร์ data)
app.get('/api/routes', (req, res) => {
  try {
    const route1 = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'route1.json')));
    const route2 = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'route2.json')));
    const route3 = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'route3.json')));
    res.json([route1, route2, route3]);
  } catch (error) {
    console.error("Error reading data:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route หลักสำหรับเปิดหน้าค้นหา
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'main.html'));
});

// Route สำหรับเปิดหน้าแผนที่
app.get('/map', (req, res) => {
  res.sendFile(path.join(frontendPath, 'map.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});