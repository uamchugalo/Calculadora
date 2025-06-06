import React from 'react';
import { CalculationResult } from '../types';
import { Download, RefreshCw, Thermometer } from 'lucide-react';
import { generatePDF } from '../utils/pdfGenerator';

interface ResultsDisplayProps {
  result: CalculationResult;
  onReset: () => void;
  onViewOptions: () => void;
}

// Modificando a constante AC_SIZES para remover a opção de 7000 BTUs
const AC_SIZES = [9000, 12000, 18000, 24000, 30000];

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, onReset, onViewOptions }) => {
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

  // Remover esta função duplicada que não é usada
  // const handleDownloadPDF = () => {
  //   // PDF download logic
  //   console.log('Downloading PDF...');
  // };

  return (
    <div className="bg-gradient-to-b from-blue-100 to-white rounded-lg shadow-lg p-6 mb-8 transform transition-all duration-500 animate-fade-in">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center bg-blue-600 text-white rounded-full w-16 h-16 mb-4">
          <Thermometer className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Resultado do Cálculo</h2>
      </div>
      
      {/* Botão Ver opções de compra - ADICIONADO AQUI */}
      <div className="text-center mb-6">
        <button
          onClick={onViewOptions}
          className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium text-lg shadow-md"
        >
          Ver opções de compra
        </button>
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
        
        {/* Alerta sobre equipamentos */}
        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-sm text-yellow-700">
            <strong>Atenção:</strong> Este cálculo considera um ambiente padrão. Se houver equipamentos que emitem calor 
            (Fogão, eletrodomésticos) ou outras fontes de calor significativas, a potência necessária pode ser maior. 
            Para um dimensionamento mais preciso, consulte um profissional.
          </p>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Opções de ar-condicionado disponíveis:</h3>
        <div className="grid grid-cols-3 gap-3">
          {AC_SIZES.slice(0, 3).map((size) => {
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
        
        {/* Segunda linha com 24.000 e 30.000 BTUs centralizada */}
        <div className="grid grid-cols-2 gap-3 mt-3 max-w-md mx-auto">
          {AC_SIZES.slice(3).map((size) => {
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
            {result.formData.area ? (
              <>
                <p className="font-medium text-blue-800">
                  {result.formData.area} m²
                </p>
                <p className="text-sm text-gray-600 mt-2">Altura:</p>
                <p className="font-medium text-blue-800">
                  {result.formData.height || '2.7'}m
                </p>
              </>
            ) : (
              <>
                <p className="font-medium text-blue-800">
                  {result.formData.width}m × {result.formData.length}m × {result.formData.height || '2.7'}m
                </p>
                <p className="text-sm text-gray-600 mt-2">Área:</p>
                <p className="font-medium text-blue-800">
                  {(Number(result.formData.width) * Number(result.formData.length)).toFixed(2)} m²
                </p>
              </>
            )}
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
        
        {/* Botão de Ver opções de compra adicionado na área circulada */}
        <div className="mt-4 text-center">
          <button
            onClick={onViewOptions}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium shadow-md"
          >
            Ver opções de compra
          </button>
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

      {/* Disclaimer */}
      <div className="mt-8 text-center text-xs text-gray-500">
        <p>Esta calculadora fornece apenas uma estimativa. Não nos responsabilizamos por escolhas inadequadas de equipamentos.</p>
        <p>Para garantir a escolha correta, recomendamos consultar um profissional qualificado.</p>
      </div>
    </div>
  );
};

export default ResultsDisplay;