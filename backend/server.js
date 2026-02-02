const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Миддлвары
app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio';

// Подключение к базе
mongoose
  .connect(mongoURI)
  .then(() => console.log('Ура! Мы подключились к MongoDB в Docker!'))
  .catch((err) => console.error('Ошибка подключения к базе:', err));



const photoSchema = new mongoose.Schema({
  title: String,
  category: String,
  imageUrl: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Сервер запущен и слушает порт ${PORT}`);
});

// Модель (Инструмент для работы с базой)
const Photo = mongoose.model('Photo', photoSchema);

// Маршрут для получения всех фото
app.get('/api/photos', async (req, res) => {
  try {
    const photos = await Photo.find();
    res.json(photos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Маршрут для добавления фото
app.post('/api/photos', async (req, res) => {
  try {
    const newPhoto = new Photo({
      title: req.body.title,
      category: req.body.category,
      imageUrl: req.body.imageUrl,
    });
    const savedPhoto = await newPhoto.save();
    res.status(201).json(savedPhoto);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/photos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Photo.findByIdAndDelete(id); //findByIdAndDelete встроеная команда библиоеки MongoDB
    res.status(200).json({ message: 'фото успешно удалено' });
  } catch (err) {
    res.status(500).json({ message: 'ошибка сервера при удалении' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Сервер стартовал на http://localhost:${PORT}`);
});
