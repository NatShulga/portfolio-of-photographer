const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');
// Библиотека для обработки файлов, приходящих из формы
const multer = require('multer'); 
const upload = multer({ storage: multer.memoryStorage() });

const app = express();
const PORT = process.env.PORT || 3000;

//Настройки базы данных
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

//Middlewares (прослойки)
app.use(cors());
app.use(express.json());

// Раздаем статические файлы из папки frontend (чтобы работал admin.html)
app.use(express.static(path.join(__dirname, '../frontend')));

//Маршруты для страниц (Frontend)
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/admin.html'));
});

//API Маршруты
//Получить все фото
app.get('/api/photos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM photos ORDER BY id DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка сервера при получении фото' });
    }
});

// Добавить новое фото (сейчас подготовим место под Яндекс)
app.post('/api/photos', upload.single('photo'), async (req, res) => {
    try {
        const { title, category } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: 'Файл не выбран' });
        }

        // ВРЕМЕННАЯ ЗАГЛУШКА: Пока не подключили Яндекс, 
        // сервер просто "сделает вид", что сохранил.
        console.log('Файл получен:', file.originalname);
        
        // Когда пришлешь ключи Яндекса, мы вставим сюда код загрузки!
        const imageUrl = "https://via.placeholder.com/400"; // Временная картинка

        const result = await pool.query(
            'INSERT INTO photos (title, category, image_url) VALUES ($1, $2, $3) RETURNING *',
            [title, category, imageUrl]
        );

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка при сохранении фото' });
    }
});

//Проверка базы и запуск
const initDB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS photos (
                id SERIAL PRIMARY KEY,
                title TEXT NOT NULL,
                category TEXT,
                image_url TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('Таблица photos готова');
    } catch (err) {
        console.error('Ошибка БД:', err);
    }
};

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Сервер запущен на порту ${PORT}`);
    });
});
