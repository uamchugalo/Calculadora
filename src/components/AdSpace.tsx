import React from 'react';

const AdSpace: React.FC = () => {
  return (
    <div className="ad-container my-8 bg-gray-100 border-2 border-dashed border-gray-300 p-4 text-center">
      <p className="text-gray-500">Espaço reservado para anúncio</p>
      <p className="text-sm text-gray-400">Dimensões: 728x90</p>
    </div>
  );
};

export default AdSpace;