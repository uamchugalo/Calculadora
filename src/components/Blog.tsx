import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

const Blog: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { btuSize } = useParams<{ btuSize: string }>();
  const navigate = useNavigate();
  
  // Opções de tamanho de BTU disponíveis
  const btuSizes = [
    { value: "9000", label: "9.000 BTUs" },
    { value: "12000", label: "12.000 BTUs" },
    { value: "18000", label: "18.000 BTUs" },
    { value: "24000", label: "24.000 BTUs" },
    { value: "30000", label: "30.000 BTUs" }
  ];
  
  const handleBtuSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const size = e.target.value;
    if (size === "all") {
      navigate('/blog');
    } else {
      navigate(`/blog/${size}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <header className="bg-blue-600 text-white py-6 relative">
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
                <a href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50">
                  Calculadora
                </a>
              </div>
            </div>
          )}
        </header>
      </header>

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-800 mb-4">Blog - Comparações de Ar Condicionado</h1>
          <p className="text-gray-600 mb-6">Encontre o melhor ar condicionado para suas necessidades com nossas análises detalhadas e comparações.</p>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">Escolha o tamanho do ar condicionado</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {btuSizes.map((size) => (
                <div 
                  key={size.value}
                  onClick={() => navigate(`/blog/${size.value}`)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    btuSize === size.value 
                      ? 'bg-blue-100 border-blue-500 shadow-sm' 
                      : 'hover:bg-gray-50 border-gray-200'
                  }`}
                >
                  <h3 className="text-lg font-medium text-center">{size.label}</h3>
                  <p className="text-sm text-gray-500 text-center mt-2">
                    {size.value === "9000" && "Ideal para ambientes até 15m²"}
                    {size.value === "12000" && "Ideal para ambientes até 20m²"}
                    {size.value === "18000" && "Ideal para ambientes até 30m²"}
                    {size.value === "24000" && "Ideal para ambientes até 40m²"}
                    {size.value === "30000" && "Ideal para ambientes acima de 40m²"}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <button 
                onClick={() => navigate('/blog')}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Ver todas as comparações
              </button>
            </div>
          </div>
        </div>

        {/* Conteúdo das comparações filtradas pelo tamanho selecionado */}
        {/* ... */}
      </div>
    </div>
  );
};

export default Blog;