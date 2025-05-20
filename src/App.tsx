import React from 'react';
import BtuCalculator from './components/BtuCalculator';
import { Snowflake } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex items-center">
          <Snowflake className="h-8 w-8 mr-3" />
          <h1 className="text-2xl md:text-3xl font-bold">BTU Calculator</h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <BtuCalculator />
      </main>
      
      <footer className="bg-blue-800 text-white py-4 mt-16">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>© {new Date().getFullYear()} BTU Calculator - Encontre o ar-condicionado ideal para seu ambiente</p>
        </div>
      </footer>
    </div>
  );
}

export default App;