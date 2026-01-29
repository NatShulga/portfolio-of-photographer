import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Home } from './pages/Home';
import {About} from './pages/About';
import { Contacts } from './pages/Contacts';
import { Services } from './pages/Services';
import { Portfolio } from './pages/Portfolio';


function App() {
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

      </Routes>
    </div>
    </Router>
  );
}

export default App;
