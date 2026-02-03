const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Настройка подключения к базе
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// ФУНКЦИЯ АВТОМАТИЧЕСКОГО СОЗДАНИЯ ТАБЛИЦЫ
const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS photos (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT,
        image_url TEXT NOT NULL,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Таблица photos проверена/создана');
  } catch (err) {
    console.error('Ошибка при инициализации таблицы:', err);
  }
};

// Запускаем проверку таблицы
initDB();

// МАРШРУТЫ
app.get('/api/photos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM photos ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/photos', async (req, res) => {
  const { title, category, imageUrl } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO photos (title, category, image_url) VALUES ($1, $2, $3) RETURNING *',
      [title, category, imageUrl]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Сервер запущен и готов к работе на порту ${PORT}`);
});
