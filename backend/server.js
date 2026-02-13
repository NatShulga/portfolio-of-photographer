import express from 'express';
import pg from 'pg';
const { Pool } = pg;
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import AWS from 'aws-sdk';
import helmet from 'helmet';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

//HELMET
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "default-src": ["'self'"],
        // Разрешаем картинки из Яндекс.Облака и data:links
        "img-src": ["'self'", "data:", "https://storage.yandexcloud.net"],
        // Разрешаем скрипты (важно для работы React)
        "script-src": ["'self'", "'unsafe-inline'"],
        // Разрешаем коннект к API (локально и на Render)
        "connect-src": ["'self'", "http://localhost:3000", "https://*.onrender.com"],
        "style-src": ["'self'", "'unsafe-inline'"],
        "font-src": ["'self'", "https:", "data:"],
      },
    },
    // Отключаем заголовок, который может мешать загрузке в некоторых браузерах при работе с S3
    crossOriginResourcePolicy: { policy: "cross-origin" }
  })
);


//НАСТРОЙКИ БЕЗОПАСНОСТИ
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "12345"; // Пароль для входа
const AUTH_TOKEN = "super-secret-admin-key-2026"; // Токен-паспорт

// Настройка связи с Яндекс.Облаком
const s3 = new AWS.S3({
    endpoint: 'https://storage.yandexcloud.net',
    accessKeyId: process.env.YANDEX_ACCESS_KEY_ID, 
    secretAccessKey: process.env.YANDEX_SECRET_ACCESS_KEY, 
    region: 'ru-central1',
    s3ForcePathStyle: true
});

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

app.use(cors());
app.use(express.json());

//MIDDLEWARE ДЛЯ ПРОВЕРКИ АВТОРИЗАЦИИ 
const checkAuth = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token === AUTH_TOKEN) {
        next(); // Паспорт верный, пропускаем
    } else {
        res.status(403).json({ error: 'Доступ запрещен' });
    }
};

const distPath = path.resolve(__dirname, '..', 'dist');

console.log('Server looking for static files in:', distPath);//для отладки
app.use(express.static(distPath));

const upload = multer({ storage: multer.memoryStorage() });

// --- API МАРШРУТЫ ---

// Маршрут для ЛОГИНА
app.post('/api/login', (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
        res.json({ success: true, token: AUTH_TOKEN });
    } else {
        res.status(401).json({ success: false, message: 'Неверный пароль' });
    }
});

// ЗАГРУЗКА (Добавлен checkAuth)
app.post('/api/photos', checkAuth, upload.single('photo'), async (req, res) => {
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
        console.error("ОШИБКА БАЗЫ ДАННЫХ:", err);
        res.status(500).json({ error: err.message });
    }
});

//УДАЛЕНИЕ (Добавлен checkAuth)
app.delete('/api/photos/:id',checkAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const photoResult = await pool.query('SELECT image_url FROM photos WHERE id = $1', [id]);
        
        if (photoResult.rows.length === 0) {
            return res.status(404).json({ error: 'Фото не найдено' });
        }

        const imageUrl = photoResult.rows[0].image_url;
        const bucketName = process.env.YANDEX_BUCKET_NAME;
        const fileKey = imageUrl.split(`${bucketName}/`)[1];

        if (fileKey) {
            await s3.deleteObject({
                Bucket: bucketName,
                Key: fileKey
            }).promise();
        }

        await pool.query('DELETE FROM photos WHERE id = $1', [id]);
        res.json({ message: 'Фото успешно удалено' });
    } catch (err) {
        console.error('Ошибка при удалении:', err);
        res.status(500).json({ error: 'Ошибка сервера при удалении' });
    }
});

// странички
// удалены app.get('/admin'), так как React Router сам обработает /admin

app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
