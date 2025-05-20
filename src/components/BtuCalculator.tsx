import React, { useState } from 'react';
import CalculatorForm from './CalculatorForm';
import ResultsDisplay from './ResultsDisplay';
import AffiliateLinks from './AffiliateLinks';
import AdSpace from './AdSpace';
import { calculateBTU, recommendedACSize } from '../utils/calculations';
import { FormData, CalculationResult } from '../types';

const BtuCalculator: React.FC = () => {
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);

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
    setFormData(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <section className="mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-blue-700 mb-2">Calcule os BTUs necessários para seu ambiente</h2>
            <p className="text-gray-600 mb-6">
              Dimensione corretamente seu ar-condicionado para garantir eficiência energética e conforto térmico ideal.
            </p>
            
            <CalculatorForm onCalculate={handleCalculate} initialData={formData} />
          </div>
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
    </div>
  );
};

export default BtuCalculator;