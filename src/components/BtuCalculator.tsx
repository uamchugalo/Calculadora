import React, { useState } from 'react';
import CalculatorForm from './CalculatorForm';
import ResultsDisplay from './ResultsDisplay';
import AffiliateLinks from './AffiliateLinks';
import AdSpace from './AdSpace';
import { Menu, X } from 'lucide-react';
import { calculateBTU, recommendedACSize } from '../utils/calculations';
import { FormData, CalculationResult } from '../types';

const BtuCalculator: React.FC = () => {
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [calculationType, setCalculationType] = useState<'dimensions' | 'area'>('dimensions');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCalculate = (data: FormData) => {
    const btuRequired = calculateBTU(data);
    const recommended = recommendedACSize(btuRequired);
    
    setResult({
      btuRequired,
      recommendedSize: recommended,
      formData: data
    });
    
    setFormData(data);
    
    // Scroll to results
    setTimeout(() => {
      const resultsElement = document.getElementById('results');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleReset = () => {
    setResult(null);
    setFormData({
      width: '',
      length: '',
      height: '',
      area: '',
      peopleCount: 1,
      sunExposure: 'none',
      customerName: ''
    });
    setCalculationType('dimensions');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <header className="bg-blue-600 text-white py-6 relative">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img src="/snow.webp" alt="Logo" className="h-8 w-8 mr-2" />
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Calculadora de BTUs</h1>
            </div>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-blue-100 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
          
        </div>
        
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg z-50">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="/blog" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50">
                Blog
              </a>
              <a href="/comparacoes" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50">
                Comparações
              </a>
              <a href="/guia-compra" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50">
                Guia de Compra
              </a>
            </div>
          </div>
        )}
      </header>

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Removido o header duplicado aqui */}
        <section className="mb-8 bg-white rounded-lg shadow-lg p-6">
          <div className="prose max-w-none mb-8">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">Como calcular BTUs para ar condicionado?</h2>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-blue-600 mb-3">Escolha como deseja calcular:</h3>
              <div className="flex gap-4">
                <button
                  onClick={() => setCalculationType('dimensions')}
                  className={`px-4 py-2 rounded-lg ${
                    calculationType === 'dimensions' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Por dimensões (largura x comprimento)
                </button>
                <button
                  onClick={() => setCalculationType('area')}
                  className={`px-4 py-2 rounded-lg ${
                    calculationType === 'area' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Por área total (m²)
                </button>
              </div>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-blue-700 mb-4">Calcule agora os BTUs necessários</h3>
            <CalculatorForm 
              onCalculate={handleCalculate} 
              initialData={formData} 
              calculationType={calculationType}
            />
          </div>
        </section>

        {result && (
          <>
            <div id="results">
              <ResultsDisplay result={result} onReset={handleReset} />
            </div>
            
            <AdSpace />
            
            {/* Temporarily commented out - pending configuration
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-blue-700 mb-4">Opções recomendadas para compra</h2>
              <p className="text-gray-600 mb-6">
                Confira os modelos de ar-condicionado que atendem às necessidades do seu ambiente:
              </p>
              <AffiliateLinks btuSize={result.recommendedSize} />
            </div>
            */}
          </>
        )}

        <section className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Dicas para escolher seu ar condicionado</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-blue-600 mb-3">Fatores importantes</h3>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Verifique a capacidade em BTUs recomendada</li>
                <li>Compare o consumo de energia entre modelos</li>
                <li>Considere tecnologias como Inverter</li>
                <li>Avalie o nível de ruído do equipamento</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-600 mb-3">Economia de energia</h3>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Escolha a potência adequada ao ambiente</li>
                <li>Prefira modelos com selo Procel A</li>
                <li>Mantenha a manutenção em dia</li>
                <li>Configure a temperatura adequadamente</li>
              </ul>
            </div>
          </div>
        </section>

        <AdSpace />
      </div>
    </div>
  );
};

export default BtuCalculator;