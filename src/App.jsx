import { useState, useEffect} from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import NavBar from './components/NavBar';
import Home from './pages/HomePage';  
import Fishes from './pages/FishesPage';
import Galery from './pages/GaleryPage';

function App() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const lastAnimationTime = localStorage.getItem('lastAnimationTime');
    const now = new Date().getTime();

    if (!lastAnimationTime || now - lastAnimationTime > 10 * 60 * 1000) {
      setAnimate(true);
      localStorage.setItem('lastAnimationTime', now);
    }
  }, []);

  return (
    <>
      <div id="layout" className={`relative z-10 flex justify-center flex-col h-[95%] w-[75%] bg-blue-500 bg-opacity-50 rounded-lg shadow-lg text-gray-900 ${animate ? 'animate' : ''}`}>
        <NavBar />
        <Routes>
          <Route path='/' element={<Fishes />} />
          <Route path='/fishes' element={<Fishes />} />
          <Route path='/galery' element={<Galery />} />
        </Routes>
      </div>
      
      
    </>
  );
};

export default App
