import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

// Corrigindo o header duplicado e adicionando comparação de marcas
const Blog: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { btuSize } = useParams<{ btuSize: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  
  // Usar useEffect para processar os parâmetros de consulta quando o componente montar
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const brandsParam = queryParams.get('brands');
    
    if (brandsParam) {
      const brands = brandsParam.split(',');
      setSelectedBrands(brands.slice(0, 2)); // Limitar a 2 marcas
    }
  }, [location.search]);
  
  // Resto do código permanece igual
  const btuSizes = [
    { value: "9000", label: "9.000 BTUs" },
    { value: "12000", label: "12.000 BTUs" },
    { value: "18000", label: "18.000 BTUs" },
    { value: "24000", label: "24.000 BTUs" },
    { value: "30000", label: "30.000 BTUs" }
  ];
  
  // Marcas disponíveis para comparação
  const brands = [
    { id: "samsung", name: "Samsung", recommended: true },
    { id: "lg", name: "LG", recommended: true },
    { id: "electrolux", name: "Electrolux", recommended: false },
    { id: "midea", name: "Midea", recommended: false },
    { id: "philco", name: "Philco", recommended: false },
    { id: "consul", name: "Consul", recommended: false },
    { id: "daikin", name: "Daikin", recommended: true },
  ];
  
  const toggleBrand = (brandId: string) => {
    if (selectedBrands.includes(brandId)) {
      setSelectedBrands(selectedBrands.filter(id => id !== brandId));
    } else {
      // Limitar a 2 marcas para comparação
      if (selectedBrands.length < 2) {
        setSelectedBrands([...selectedBrands, brandId]);
      }
    }
  };
  
  // Links de afiliados para cada marca com BTUs
  const getAffiliateLink = (brand: string, btuSize?: string) => {
    const baseLink = `https://www.amazon.com.br/s?k=ar+condicionado+${brand}`;
    const btuParam = btuSize ? `+${btuSize}+btus` : '';
    return `${baseLink}${btuParam}&tag=fb02d7-20`;
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
              <a href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50">
                Calculadora
              </a>
            </div>
          </div>
        )}
      </header>

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-800 mb-4">Blog - Comparações de Ar Condicionado</h1>
          <p className="text-gray-600 mb-6">Encontre o melhor ar condicionado para suas necessidades com nossas análises detalhadas e comparações.</p>
          
          {/* Seleção de tamanho */}
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
          </div>
          
          {/* Seleção de marcas para comparação */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">Compare marcas (selecione até 2)</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {brands.map((brand) => (
                <div 
                  key={brand.id}
                  onClick={() => toggleBrand(brand.id)}
                  className={`p-3 border rounded-lg cursor-pointer transition-all text-center ${
                    selectedBrands.includes(brand.id) 
                      ? 'bg-blue-100 border-blue-500 shadow-sm' 
                      : 'hover:bg-gray-50 border-gray-200'
                  }`}
                >
                  <div>{brand.name}</div>
                  {brand.recommended && (
                    <div className="text-xs text-blue-400 mt-1 opacity-70">Recomendado</div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Exibir comparação quando pelo menos uma marca está selecionada */}
          {selectedBrands.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-2xl font-bold text-blue-700 mb-6">
                {selectedBrands.length === 1 
                  ? `Informações sobre ${brands.find(b => b.id === selectedBrands[0])?.name}`
                  : `Comparação: ${brands.find(b => b.id === selectedBrands[0])?.name} vs ${brands.find(b => b.id === selectedBrands[1])?.name}`
                }
              </h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Característica</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {brands.find(b => b.id === selectedBrands[0])?.name}
                        {brands.find(b => b.id === selectedBrands[0])?.recommended && (
                          <span className="block text-blue-400 opacity-70 normal-case">Recomendado</span>
                        )}
                      </th>
                      {selectedBrands.length > 1 && (
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {brands.find(b => b.id === selectedBrands[1])?.name}
                          {brands.find(b => b.id === selectedBrands[1])?.recommended && (
                            <span className="block text-blue-400 opacity-70 normal-case">Recomendado</span>
                          )}
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Eficiência Energética</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {selectedBrands[0] === 'samsung' || selectedBrands[0] === 'lg' || selectedBrands[0] === 'daikin' ? 'A+++' : 'A'}
                      </td>
                      {selectedBrands.length > 1 && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {selectedBrands[1] === 'samsung' || selectedBrands[1] === 'lg' || selectedBrands[1] === 'daikin' ? 'A+++' : 'A'}
                        </td>
                      )}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Tecnologia Inverter</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {selectedBrands[0] === 'samsung' || selectedBrands[0] === 'lg' || selectedBrands[0] === 'daikin' || selectedBrands[0] === 'midea' ? 'Sim' : 'Modelos selecionados'}
                      </td>
                      {selectedBrands.length > 1 && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {selectedBrands[1] === 'samsung' || selectedBrands[1] === 'lg' || selectedBrands[1] === 'daikin' || selectedBrands[1] === 'midea' ? 'Sim' : 'Modelos selecionados'}
                        </td>
                      )}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Nível de Ruído</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {selectedBrands[0] === 'samsung' ? 'Muito Baixo (19dB)' : 
                         selectedBrands[0] === 'lg' ? 'Muito Baixo (19dB)' : 
                         selectedBrands[0] === 'daikin' ? 'Muito Baixo (19dB)' : 'Baixo (22-26dB)'}
                      </td>
                      {selectedBrands.length > 1 && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {selectedBrands[1] === 'samsung' ? 'Muito Baixo (19dB)' : 
                           selectedBrands[1] === 'lg' ? 'Muito Baixo (19dB)' : 
                           selectedBrands[1] === 'daikin' ? 'Muito Baixo (19dB)' : 'Baixo (22-26dB)'}
                        </td>
                      )}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Conectividade</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {selectedBrands[0] === 'samsung' || selectedBrands[0] === 'lg' ? 'Wi-Fi integrado' : 
                         selectedBrands[0] === 'midea' || selectedBrands[0] === 'daikin' ? 'Wi-Fi opcional' : 'Não disponível'}
                      </td>
                      {selectedBrands.length > 1 && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {selectedBrands[1] === 'samsung' || selectedBrands[1] === 'lg' ? 'Wi-Fi integrado' : 
                           selectedBrands[1] === 'midea' || selectedBrands[1] === 'daikin' ? 'Wi-Fi opcional' : 'Não disponível'}
                        </td>
                      )}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Garantia</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {selectedBrands[0] === 'samsung' || selectedBrands[0] === 'lg' ? '10 anos (compressor)' : '5 anos (compressor)'}
                      </td>
                      {selectedBrands.length > 1 && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {selectedBrands[1] === 'samsung' || selectedBrands[1] === 'lg' ? '10 anos (compressor)' : '5 anos (compressor)'}
                        </td>
                      )}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Preço Médio</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {selectedBrands[0] === 'samsung' || selectedBrands[0] === 'lg' || selectedBrands[0] === 'daikin' ? 'Premium' : 
                         selectedBrands[0] === 'midea' || selectedBrands[0] === 'electrolux' ? 'Intermediário' : 'Econômico'}
                      </td>
                      {selectedBrands.length > 1 && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {selectedBrands[1] === 'samsung' || selectedBrands[1] === 'lg' || selectedBrands[1] === 'daikin' ? 'Premium' : 
                           selectedBrands[1] === 'midea' || selectedBrands[1] === 'electrolux' ? 'Intermediário' : 'Econômico'}
                        </td>
                      )}
                    </tr>
                  </tbody>
                </table>
              </div>
              
              {/* Links de afiliados */}
              <div className="mt-8">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                  <p className="text-blue-800 font-medium">
                    <strong>Recomendação:</strong> Sempre recomendamos dispositivos com tecnologia Inverter! 
                    Eles economizam até 60% de energia e proporcionam maior conforto térmico com temperatura constante.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedBrands.map((brand) => (
                    <a 
                      key={brand}
                      href={getAffiliateLink(brand, btuSize)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-center"
                    >
                      <h3 className="text-lg font-semibold text-blue-700 mb-2">
                        Ver ofertas de {brands.find(b => b.id === brand)?.name}
                        {btuSize && ` ${btuSize} BTUs`}
                        {brands.find(b => b.id === brand)?.recommended && (
                          <span className="block text-sm text-blue-400 opacity-70">Recomendado</span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-600">Encontre os melhores preços na Amazon</p>
                      <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                        Ver ofertas
                      </button>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;