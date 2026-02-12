import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Home } from './pages/Home';
import {About} from './pages/About';
import { Contacts } from './pages/Contacts';
import { Services } from './pages/Services';
import { Portfolio } from './pages/Portfolio';
import { Login } from './pages/Login';
import { Admin } from './pages/Admin';


function App() {
  // Создаем состояние, которое проверяет наличие токена при загрузке
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'));

  // Функция для входа: обновляем состояние, чтобы React перерисовал маршруты
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
    <div className="min-h-screen bg-[#FDFCF8] text-stone-800 font-sans">
      <Header />

      <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/about" element={<About />} />

      <Route path="/contacts" element={<Contacts />} />

      <Route path="/services" element={<Services />} />

      <Route path="/portfolio" element={<Portfolio />} />

          {/* Приватный маршрут для админки */}
          <Route 
            path="/admin" 
            element={
              isAuthenticated ? (
                <Admin />
              ) : (
                <Login onLogin={handleLogin} />
              )
            } 
          />

      </Routes>
    </div>
    </Router>
  );
}

export default App;
