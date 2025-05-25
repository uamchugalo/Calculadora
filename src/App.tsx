import React from 'react';
import BtuCalculator from './components/BtuCalculator';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main className="container mx-auto">
        <BtuCalculator />
      </main>
      
      <footer className="bg-blue-800 text-white py-4 mt-16">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>© {new Date().getFullYear()} Calculadora de BTUs - Encontre o ar-condicionado ideal para seu ambiente</p>
        </div>
      </footer>
    </div>
  );
}

export default App;