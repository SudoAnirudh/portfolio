import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Home from './components/Home';



import KonamiCode from './components/KonamiCode';
import Spotlight from './components/Spotlight';
import SmoothScroll from './components/SmoothScroll';
import NoiseOverlay from './components/NoiseOverlay';

function App() {
  return (
    <Router>
      <SmoothScroll />
      <NoiseOverlay />
      <Spotlight />
      <KonamiCode />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Analytics />
    </Router>
  );
}

export default App;
