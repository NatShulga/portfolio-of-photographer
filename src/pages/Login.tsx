import React, { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Отправляем запрос на сервер для проверки пароля
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('token', data.token); // Сохраняем "ключ"
        onLogin(); // Переключаем состояние в родителе
      } else {
        setError('Неверный пароль');
      }
    } catch (err) {
      setError('Ошибка сервера');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFCF8] px-4">
      <div className="max-w-md w-full space-y-8 p-10 bg-white shadow-sm border border-stone-100">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-serif uppercase tracking-widest text-stone-800">
            Вход в систему
          </h2>
          <p className="mt-2 text-sm text-stone-500">Только для администратора</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="password"
              required
              className="appearance-none relative block w-full px-3 py-4 border-b border-stone-300 placeholder-stone-400 text-stone-900 focus:outline-none focus:border-stone-800 transition-colors sm:text-sm bg-transparent"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-xs tracking-tight">{error}</p>}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-light uppercase tracking-[0.3em] text-white bg-stone-800 hover:bg-stone-700 transition-colors"
            >
              Войти
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
