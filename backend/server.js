const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const AWS = require('aws-sdk');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Настройка связи с Яндекс.Облаком
const s3 = new AWS.S3({
    endpoint: 'https://storage.yandexcloud.net',
    accessKeyId: process.env.YANDEX_ACCESS_KEY_ID, 
    secretAccessKey: process.env.YANDEX_SECRET_ACCESS_KEY, 
    region: 'ru-central1',
    s3ForcePathStyle: true
});

// 2. Настройка базы данных PostgreSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

// 3. Middleware
app.use(cors());
app.use(express.json());

// 4. ОПРЕДЕЛЕНИЕ ПУТЕЙ (Исправлено под React-сборку)
// Путь к папке dist, которую создаст Vite внутри fronten
const distPath = path.join(__dirname, '..', 'dist');
// Путь к самой папке frontend (для доступа к admin.html)
const frontendFolderPath = path.join(__dirname, '..', 'frontend');

// Раздаем статические файлы
app.use(express.static(distPath));
app.use(express.static(frontendFolderPath));

const upload = multer({ storage: multer.memoryStorage() });

// --- МАРШРУТЫ API ---

// Загрузка фото в облако и запись в БД
app.post('/api/photos', upload.single('photo'), async (req, res) => {
    try {
        const { title, category } = req.body;
        const file = req.file;

        if (!file) return res.status(400).json({ error: 'Файл не выбран' });

        const fileName = `portfolio/${Date.now()}-${file.originalname}`;

        await s3.putObject({
            Bucket: process.env.YANDEX_BUCKET_NAME,
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype
        }).promise();

        const imageUrl = `https://storage.yandexcloud.net/${process.env.YANDEX_BUCKET_NAME}/${fileName}`;

        const result = await pool.query(
            'INSERT INTO photos (title, category, image_url) VALUES ($1, $2, $3) RETURNING *',
            [title, category, imageUrl]
        );

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Ошибка:', err);
        res.status(500).json({ error: 'Ошибка при загрузке в облако' });
    }
});

// Получение списка всех фото
app.get('/api/photos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM photos ORDER BY id DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- МАРШРУТЫ ДЛЯ СТРАНИЦ ---

// Админка (конкретный путь)
app.get('/admin', (req, res) => {
    res.sendFile(path.join(frontendFolderPath, 'admin.html'));
});

// Главная страница React (Любой другой путь отправляет в index.html из dist)
app.get('*', (req, res) => {
    if (!req.url.startsWith('/api')) {
        res.sendFile(path.join(distPath, 'index.html'));
    }
});

app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
