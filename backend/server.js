const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const AWS = require('aws-sdk');

const app = express();
const PORT = process.env.PORT || 3000;

//Настройка связи с Яндекс.Облаком
const s3 = new AWS.S3({
    endpoint: 'https://storage.yandexcloud.net',
    accessKeyId: process.env.YANDEX_ACCESS_KEY_ID, // Берем из настроек Render
    secretAccessKey: process.env.YANDEX_SECRET_ACCESS_KEY, // Берем из настроек Render
    region: 'ru-central1',
    s3ForcePathStyle: true
});

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

// 1. Путь к корню проекта (где лежит index.html)
const rootPath = path.join(__dirname, '..');

// 2. Путь к папке frontend (где лежит admin.html и, возможно, скрипты)
const frontendFolderPath = path.join(__dirname, '..', 'frontend');

// Разрешаем серверу отдавать файлы из обеих папок
app.use(express.static(rootPath));
app.use(express.static(frontendFolderPath));


app.use(express.static(rootPath));
app.use(express.static(frontendPath));

const upload = multer({ storage: multer.memoryStorage() });

app.get('/', (req, res) => {
    res.sendFile(path.join(rootPath, 'index.html'));
});

// Админка (берем из папки FRONTEND)
app.get('/admin', (req, res) => {
    res.sendFile(path.join(frontendFolderPath, 'admin.html'));
});


//ГЛАВНЫЙ МАРШРУТ: Загрузка фото
app.post('/api/photos', upload.single('photo'), async (req, res) => {
    try {
        const { title, category } = req.body;
        const file = req.file;

        if (!file) return res.status(400).json({ error: 'Файл не выбран' });

        // Создаем уникальное имя файла, чтобы не было совпадений
        const fileName = `portfolio/${Date.now()}-${file.originalname}`;

        // ОТПРАВКА В ЯНДЕКС
        await s3.putObject({
            Bucket: process.env.YANDEX_BUCKET_NAME,
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype
        }).promise();

        // Ссылка, по которой фото будет доступно в интернете
        const imageUrl = `https://storage.yandexcloud.net/${process.env.YANDEX_BUCKET_NAME}/${fileName}`;

        // СОХРАНЕНИЕ В БАЗУ
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

app.get('/api/photos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM photos ORDER BY id DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => console.log(`Сервер на порту ${PORT}`));
