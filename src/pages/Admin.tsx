import React, { useState } from 'react';
import axios from 'axios';

export const Admin: React.FC = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('wedding & love story');
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert('Пожалуйста, выберите фото');

    setIsUploading(true);
    
    // Подготовка данных для отправки (FormData умеет передавать файлы)
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('photo', file);

    const token = localStorage.getItem('token');
    const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:3000' : '';

    try {
      const response = await axios.post(`${API_URL}/api/photos`, formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': token || ''
        }
      });

      if (response.status === 200 || response.status === 201) {
        alert('Фото успешно загружено!');
        setTitle('');
        setFile(null);
      }
    } catch (err: any) {
      console.error('Ошибка при загрузке:', err);
      const errorMessage = err.response?.data?.error || 'Ошибка сервера';
      alert(`Ошибка: ${errorMessage}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] pt-32 pb-20 px-4">
      <div className="max-w-xl mx-auto">
        <h1 className="font-serif text-3xl mb-12 text-center tracking-[0.2em] uppercase text-stone-800">
          Панель управления
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-10 bg-white p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] rounded-sm">
          
          {/*Название */}
          <div className="group">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-1 transition-colors group-focus-within:text-stone-800">
              Название фотографии
            </label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введите название..."
              className="w-full border-b border-stone-200 py-2 focus:outline-none focus:border-stone-800 transition-colors bg-transparent text-sm"
            />
          </div>
          
          {/*Категория */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-2">
              Категория
            </label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border-b border-stone-200 py-2 bg-transparent text-sm focus:outline-none focus:border-stone-800 cursor-pointer transition-colors"
            >
              <option value="wedding & love story">Свадьба & Love Story</option>
              <option value="individual">Индивидуальная</option>
              <option value="family">Семейная</option>
              <option value="event">Событие</option>
              <option value="children birthday">Детский день рождения</option>
              <option value="street style">Уличный стиль</option>
            </select>
          </div>

          {/* Поле для файла */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-3">
              Загрузить файл
            </label>
            <label className={`
              relative flex flex-col items-center justify-center w-full h-32 
              border-2 border-dashed rounded-sm transition-all cursor-pointer
              ${file ? 'border-stone-800 bg-stone-50' : 'border-stone-200 hover:border-stone-400 bg-stone-50/50'}
            `}>
              <input 
                type="file" 
                className="hidden"
                accept="image/*"
                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
              />
              <div className="text-center px-4">
                <span className="text-[11px] uppercase tracking-widest text-stone-600">
                  {file ? `✓ ${file.name}` : 'Выберите файл или перетащите'}
                </span>
              </div>
            </label>
          </div>

          {/* Кнопка с эффектом нажатия */}
          <button 
            type="submit" 
            disabled={isUploading}
            className={`
              w-full py-5 uppercase text-[10px] tracking-[0.4em] transition-all duration-300
              active:scale-[0.98] active:brightness-90
              ${isUploading 
                ? 'bg-stone-200 text-stone-400 cursor-not-allowed' 
                : 'bg-stone-900 text-white hover:bg-stone-800 shadow-sm hover:shadow-lg'}
            `}
          >
            {isUploading ? 'Загрузка...' : 'Добавить в портфолио'}
          </button>
        </form>

        <div className="text-center mt-12">
          <button 
            onClick={() => { localStorage.removeItem('token'); window.location.reload(); }}
            className="text-stone-400 text-[10px] uppercase tracking-[0.2em] hover:text-red-500 transition-colors py-2"
          >
            — Выйти из системы —
          </button>
        </div>
      </div>
    </div>
  );
};
