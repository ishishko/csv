import { useEffect, useState } from 'react';
import './layout.css';
import NavBar from './NavBar/NavBar';

const Layout = () => {
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
    <div id="layout" className={`relative z-10 flex justify-center h-[95%] w-[75%] bg-blue-500 bg-opacity-50 rounded-lg shadow-lg text-gray-900 ${animate ? 'animate' : ''}`}>
      <NavBar />
    </div>
  );
};

export default Layout;