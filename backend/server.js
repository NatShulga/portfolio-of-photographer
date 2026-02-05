import express from 'express';
import pg from 'pg';
const { Pool } = pg;
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import AWS from 'aws-sdk';

// Эмуляция __dirname для ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Настройка связи с Яндекс.Облаком
const s3 = new AWS.S3({
    endpoint: 'https://storage.yandexcloud.net',
    accessKeyId: process.env.YANDEX_ACCESS_KEY_ID, 
    secretAccessKey: process.env.YANDEX_SECRET_ACCESS_KEY, 
    region: 'ru-central1',
    s3ForcePathStyle: true
});

// Настройка базы данных
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

app.use(cors());
app.use(express.json());

// Пути (dist в корне)
const distPath = path.join(__dirname, '..', 'dist');
const frontendFolderPath = path.join(__dirname, '..', 'frontend');

app.use(express.static(distPath));
app.use(express.static(frontendFolderPath));

const upload = multer({ storage: multer.memoryStorage() });

// --- API МАРШРУТЫ ---
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

app.get('/api/photos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM photos ORDER BY id DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/photos/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // 1. Сначала ищем фото, чтобы получить URL для удаления из S3
        const photoResult = await pool.query('SELECT image_url FROM photos WHERE id = $1', [id]);
        
        if (photoResult.rows.length === 0) {
            return res.status(404).json({ error: 'Фото не найдено' });
        }

        const imageUrl = photoResult.rows[0].image_url;
        const bucketName = process.env.YANDEX_BUCKET_NAME;
        
        // Извлекаем ключ файла (Key) из URL
        const fileKey = imageUrl.split(`${bucketName}/`)[1];

        // 2. Удаляем из Яндекс.Облака
        if (fileKey) {
            await s3.deleteObject({
                Bucket: bucketName,
                Key: fileKey
            }).promise();
        }

        // 3. Удаляем из базы данных
        await pool.query('DELETE FROM photos WHERE id = $1', [id]);

        res.json({ message: 'Фото успешно удалено' });
    } catch (err) {
        console.error('Ошибка при удалении:', err);
        res.status(500).json({ error: 'Ошибка сервера при удалении' });
    }
});


// --- СТРАНИЦЫ ---
app.get('/admin', (req, res) => {
    res.sendFile(path.join(frontendFolderPath, 'admin.html'));
});

app.get('/*splat', (req, res) => {
    if (!req.url.startsWith('/api')) {
        res.sendFile(path.join(distPath, 'index.html'));
    }
});

app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
