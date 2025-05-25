import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BtuCalculator from './components/BtuCalculator';
import Blog from './components/Blog';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Router>
        <Routes>
          <Route path="/" element={<BtuCalculator />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:btuSize" element={<Blog />} />
        </Routes>
      </Router>
      
      <footer className="bg-blue-800 text-white py-4 mt-16">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>© {new Date().getFullYear()} Calculadora de BTUs - Encontre o ar-condicionado ideal para seu ambiente</p>
        </div>
      </footer>
    </div>
  );
}

export default App;