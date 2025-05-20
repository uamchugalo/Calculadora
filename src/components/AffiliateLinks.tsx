import React from 'react';
import { ShoppingCart, ThumbsUp, Star } from 'lucide-react';

interface AffiliateLinkProps {
  btuSize: number;
}

// This would be replaced with real products and affiliate links
const AC_PRODUCTS = {
  7000: [
    {
      id: 1,
      name: 'Ar Condicionado Portátil 7.000 BTUs Frio',
      brand: 'Elgin',
      price: 1899.00,
      rating: 4.5,
      image: 'https://images.pexels.com/photos/4472169/pexels-photo-4472169.jpeg?auto=compress&cs=tinysrgb&w=300',
      link: '#affiliate-link-7000-1'
    },
    {
      id: 2,
      name: 'Ar Condicionado Split Hi Wall 7.000 BTUs Frio',
      brand: 'Consul',
      price: 1399.00,
      rating: 4.7,
      image: 'https://images.pexels.com/photos/4472169/pexels-photo-4472169.jpeg?auto=compress&cs=tinysrgb&w=300',
      link: '#affiliate-link-7000-2'
    }
  ],
  9000: [
    {
      id: 3,
      name: 'Ar Condicionado Split 9.000 BTUs Quente/Frio',
      brand: 'Electrolux',
      price: 1699.00,
      rating: 4.6,
      image: 'https://images.pexels.com/photos/4472169/pexels-photo-4472169.jpeg?auto=compress&cs=tinysrgb&w=300',
      link: '#affiliate-link-9000-1'
    },
    {
      id: 4,
      name: 'Ar Condicionado Split Inverter 9.000 BTUs Frio',
      brand: 'Samsung',
      price: 2099.00,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/4472169/pexels-photo-4472169.jpeg?auto=compress&cs=tinysrgb&w=300',
      link: '#affiliate-link-9000-2'
    }
  ],
  12000: [
    {
      id: 5,
      name: 'Ar Condicionado Split 12.000 BTUs Frio',
      brand: 'LG',
      price: 1899.00,
      rating: 4.7,
      image: 'https://images.pexels.com/photos/4472169/pexels-photo-4472169.jpeg?auto=compress&cs=tinysrgb&w=300',
      link: '#affiliate-link-12000-1'
    },
    {
      id: 6,
      name: 'Ar Condicionado Split Inverter 12.000 BTUs Quente/Frio',
      brand: 'Midea',
      price: 2399.00,
      rating: 4.6,
      image: 'https://images.pexels.com/photos/4472169/pexels-photo-4472169.jpeg?auto=compress&cs=tinysrgb&w=300',
      link: '#affiliate-link-12000-2'
    }
  ],
  18000: [
    {
      id: 7,
      name: 'Ar Condicionado Split 18.000 BTUs Frio',
      brand: 'Philco',
      price: 2599.00,
      rating: 4.5,
      image: 'https://images.pexels.com/photos/4472169/pexels-photo-4472169.jpeg?auto=compress&cs=tinysrgb&w=300',
      link: '#affiliate-link-18000-1'
    },
    {
      id: 8,
      name: 'Ar Condicionado Split Inverter 18.000 BTUs Quente/Frio',
      brand: 'Daikin',
      price: 3299.00,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/4472169/pexels-photo-4472169.jpeg?auto=compress&cs=tinysrgb&w=300',
      link: '#affiliate-link-18000-2'
    }
  ],
  24000: [
    {
      id: 9,
      name: 'Ar Condicionado Split 24.000 BTUs Frio',
      brand: 'Gree',
      price: 3499.00,
      rating: 4.6,
      image: 'https://images.pexels.com/photos/4472169/pexels-photo-4472169.jpeg?auto=compress&cs=tinysrgb&w=300',
      link: '#affiliate-link-24000-1'
    },
    {
      id: 10,
      name: 'Ar Condicionado Split Inverter 24.000 BTUs Quente/Frio',
      brand: 'Fujitsu',
      price: 3999.00,
      rating: 4.9,
      image: 'https://images.pexels.com/photos/4472169/pexels-photo-4472169.jpeg?auto=compress&cs=tinysrgb&w=300',
      link: '#affiliate-link-24000-2'
    }
  ],
  30000: [
    {
      id: 11,
      name: 'Ar Condicionado Split 30.000 BTUs Frio',
      brand: 'Carrier',
      price: 4299.00,
      rating: 4.7,
      image: 'https://images.pexels.com/photos/4472169/pexels-photo-4472169.jpeg?auto=compress&cs=tinysrgb&w=300',
      link: '#affiliate-link-30000-1'
    },
    {
      id: 12,
      name: 'Ar Condicionado Split Inverter 30.000 BTUs Quente/Frio',
      brand: 'Hitachi',
      price: 4899.00,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/4472169/pexels-photo-4472169.jpeg?auto=compress&cs=tinysrgb&w=300',
      link: '#affiliate-link-30000-2'
    }
  ]
};

const AffiliateLinks: React.FC<AffiliateLinkProps> = ({ btuSize }) => {
  const products = AC_PRODUCTS[btuSize as keyof typeof AC_PRODUCTS] || [];
  
  // Also show products from the closest size if exact size not available
  const allSizes = Object.keys(AC_PRODUCTS).map(Number);
  const closestSize = allSizes.reduce((prev, curr) => 
    Math.abs(curr - btuSize) < Math.abs(prev - btuSize) ? curr : prev
  );
  
  const closestProducts = btuSize !== closestSize 
    ? AC_PRODUCTS[closestSize as keyof typeof AC_PRODUCTS] 
    : [];
  
  const allProducts = [...products, ...closestProducts].slice(0, 4);

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {allProducts.map((product) => (
        <div 
          key={product.id} 
          className="bg-white border border-blue-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="relative">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-48 object-cover"
            />
            {product.btuSize === btuSize && (
              <div className="absolute top-2 right-2 bg-green-500 text-white py-1 px-2 rounded-full text-xs font-bold flex items-center">
                <ThumbsUp className="w-3 h-3 mr-1" />
                Recomendado
              </div>
            )}
          </div>
          
          <div className="p-4">
            <p className="text-sm text-blue-600 font-medium">{product.brand}</p>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">{product.name}</h3>
            
            <div className="flex items-center mb-3">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-4 h-4" 
                    fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                    strokeWidth={i < Math.floor(product.rating) ? 0 : 2}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <p className="text-xl font-bold text-blue-700">
                R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <a 
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center transition-colors"
              >
                <ShoppingCart className="w-4 h-4 mr-1" />
                Comprar
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AffiliateLinks;