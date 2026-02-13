import React, { useState } from 'react';

export const Admin: React.FC = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('wedding & love story');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert('Выберите фото');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('photo', file);

    // Достаем токен для сервера, чтобы он разрешил загрузку
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('/api/photos', {
        method: 'POST',
        headers: { 'Authorization': token || '' }, // Отправляем паспорт
        body: formData
      });

      if (response.ok) {
        alert('Фото успешно загружено!');
        setTitle('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="pt-24 max-w-2xl mx-auto p-6">
      <h1 className="font-serif text-3xl mb-8 uppercase">Панель управления</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 shadow-sm">
        <div>
          <label className="block text-xs uppercase tracking-widest mb-2">Название</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border-b py-2 focus:outline-none focus:border-black"
          />
        </div>
        
        <div>
          <label className="block text-xs uppercase tracking-widest mb-2">Категория</label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border-b py-2 bg-transparent"
          >
            <option value="wedding & love story">Свадьба & Love Story</option>
            <option value="individual">Индивидуальная</option>
            <option value="family">Семейная</option>
            <option value="event">Событие</option>
            <option value="children birthday">Детский день рождения</option>
            <option value="street style">Уличный стиль</option>
          </select>
        </div>

        <input 
          type="file" 
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          className="text-sm"
        />

        <button type="submit" className="w-full bg-black text-white py-4 uppercase text-xs tracking-[0.3em]">
          Загрузить на сайт
        </button>
      </form>

      <button 
        onClick={() => { localStorage.removeItem('token'); window.location.reload(); }}
        className="mt-8 text-stone-400 text-xs uppercase tracking-widest hover:text-black transition-colors"
      >
        Выйти из системы
      </button>
    </div>
  );
};
