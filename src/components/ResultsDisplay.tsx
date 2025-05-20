import React from 'react';
import { CalculationResult } from '../types';
import { Download, RefreshCw, Thermometer } from 'lucide-react';
import { generatePDF } from '../utils/pdfGenerator';

interface ResultsDisplayProps {
  result: CalculationResult;
  onReset: () => void;
}

const AC_SIZES = [7000, 9000, 12000, 18000, 24000, 30000];

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, onReset }) => {
  const handleDownload = async () => {
    await generatePDF(result);
  };

  const formattedBTU = Math.round(result.btuRequired).toLocaleString('pt-BR');
  
  // Calculate how close each AC size is to the required BTU
  const getSizeProximity = (size: number) => {
    const diff = Math.abs(result.btuRequired - size);
    const percentage = (diff / result.btuRequired) * 100;
    return { diff, percentage };
  };

  return (
    <div className="bg-gradient-to-b from-blue-100 to-white rounded-lg shadow-lg p-6 mb-8 transform transition-all duration-500 animate-fade-in">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center bg-blue-600 text-white rounded-full w-16 h-16 mb-4">
          <Thermometer className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Resultado do Cálculo</h2>
      </div>
      
      <div className="bg-white rounded-lg border border-blue-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <p className="text-gray-600 mb-1">BTUs necessários:</p>
            <p className="text-3xl font-bold text-blue-700">{formattedBTU} BTUs</p>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-gray-600 mb-1">Recomendamos:</p>
            <p className="text-3xl font-bold text-green-600">{result.recommendedSize.toLocaleString('pt-BR')} BTUs</p>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Opções de ar-condicionado disponíveis:</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {AC_SIZES.map((size) => {
            const isRecommended = size === result.recommendedSize;
            const { percentage } = getSizeProximity(size);
            const isClose = percentage < 20 && !isRecommended;
            
            return (
              <div 
                key={size}
                className={`border ${isRecommended 
                  ? 'bg-green-50 border-green-500' 
                  : isClose 
                    ? 'bg-blue-50 border-blue-300' 
                    : 'bg-white border-gray-200'
                } rounded-md p-3 text-center transition-all hover:shadow-md ${
                  isRecommended ? 'transform scale-105 shadow-md' : ''
                }`}
              >
                <p className={`font-bold ${isRecommended ? 'text-green-600' : 'text-gray-700'}`}>
                  {size.toLocaleString('pt-BR')} BTUs
                </p>
                {isRecommended && (
                  <p className="text-xs font-medium text-green-600 mt-1">Recomendado</p>
                )}
                {isClose && !isRecommended && (
                  <p className="text-xs font-medium text-blue-600 mt-1">Opção viável</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Informações do ambiente:</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Dimensões:</p>
            <p className="font-medium text-blue-800">
              {result.formData.width}m × {result.formData.length}m × {result.formData.height}m
            </p>
            <p className="text-sm text-gray-600 mt-2">Área:</p>
            <p className="font-medium text-blue-800">
              {(Number(result.formData.width) * Number(result.formData.length)).toFixed(2)} m²
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Pessoas no ambiente:</p>
            <p className="font-medium text-blue-800">{result.formData.peopleCount}</p>
            <p className="text-sm text-gray-600 mt-2">Incidência de sol:</p>
            <p className="font-medium text-blue-800">
              {result.formData.sunExposure === 'none' && 'Sem sol direto'}
              {result.formData.sunExposure === 'morning' && 'Pela manhã'}
              {result.formData.sunExposure === 'afternoon' && 'Pela tarde'}
              {result.formData.sunExposure === 'allday' && 'O dia todo'}
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
        <button
          onClick={handleDownload}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center transition-all shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Download className="h-5 w-5 mr-2" />
          Download PDF
        </button>
        <button
          onClick={onReset}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg flex items-center justify-center transition-all shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <RefreshCw className="h-5 w-5 mr-2" />
          Novo Cálculo
        </button>
      </div>
    </div>
  );
};

export default ResultsDisplay;