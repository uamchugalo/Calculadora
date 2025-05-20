import React, { useState, useEffect } from 'react';
import { FormData, SunExposure } from '../types';
import { Sun, Users, Ruler, Home } from 'lucide-react';

interface CalculatorFormProps {
  onCalculate: (data: FormData) => void;
  initialData: FormData | null;
}

const DEFAULT_HEIGHT = 2.7;

const CalculatorForm: React.FC<CalculatorFormProps> = ({ onCalculate, initialData }) => {
  const [formData, setFormData] = useState<FormData>({
    width: initialData?.width || '',
    length: initialData?.length || '',
    height: initialData?.height || '',
    peopleCount: initialData?.peopleCount || 1,
    sunExposure: initialData?.sunExposure || 'none',
    customerName: initialData?.customerName || ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: e.target.type === 'number' ? 
        (value === '' ? '' : Number(value)) : 
        value
    });
    
    if (errors[name as keyof FormData]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    if (!formData.width) {
      newErrors.width = 'A largura é necessária';
    } else if (Number(formData.width) <= 0) {
      newErrors.width = 'Largura deve ser maior que zero';
    }
    
    if (!formData.length) {
      newErrors.length = 'O comprimento é necessário';
    } else if (Number(formData.length) <= 0) {
      newErrors.length = 'Comprimento deve ser maior que zero';
    }
    
    if (formData.height && Number(formData.height) <= 0) {
      newErrors.height = 'Altura deve ser maior que zero';
    }
    
    if (Number(formData.peopleCount) < 1) {
      newErrors.peopleCount = 'Deve haver pelo menos 1 pessoa';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      const dataToSubmit = {
        ...formData,
        height: formData.height || DEFAULT_HEIGHT.toString()
      };
      
      onCalculate(dataToSubmit);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="flex items-center text-blue-800 font-semibold mb-4">
          <Home className="w-5 h-5 mr-2" />
          Dimensões do Ambiente
        </h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Largura (m)
            </label>
            <input
              type="number"
              name="width"
              value={formData.width}
              onChange={handleInputChange}
              step="0.01"
              className={`w-full rounded-md border ${errors.width ? 'border-red-500' : 'border-blue-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Ex: 3.5"
            />
            {errors.width && <p className="mt-1 text-sm text-red-500">{errors.width}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Comprimento (m)
            </label>
            <input
              type="number"
              name="length"
              value={formData.length}
              onChange={handleInputChange}
              step="0.01"
              className={`w-full rounded-md border ${errors.length ? 'border-red-500' : 'border-blue-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Ex: 4.0"
            />
            {errors.length && <p className="mt-1 text-sm text-red-500">{errors.length}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Altura (m) <span className="text-gray-400 text-xs">(opcional)</span>
            </label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              step="0.01"
              className={`w-full rounded-md border ${errors.height ? 'border-red-500' : 'border-blue-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder={`Padrão: ${DEFAULT_HEIGHT}m`}
            />
            {errors.height && <p className="mt-1 text-sm text-red-500">{errors.height}</p>}
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="flex items-center text-blue-800 font-semibold mb-4">
          <Users className="w-5 h-5 mr-2" />
          Ocupação do Ambiente
        </h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantas pessoas normalmente ficarão no ambiente?
          </label>
          <input
            type="number"
            name="peopleCount"
            value={formData.peopleCount}
            onChange={handleInputChange}
            min="1"
            className={`w-full rounded-md border ${errors.peopleCount ? 'border-red-500' : 'border-blue-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Ex: 2"
          />
          {errors.peopleCount && <p className="mt-1 text-sm text-red-500">{errors.peopleCount}</p>}
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="flex items-center text-blue-800 font-semibold mb-4">
          <Sun className="w-5 h-5 mr-2" />
          Incidência de Sol
        </h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quando o ambiente recebe sol?
          </label>
          <select
            name="sunExposure"
            value={formData.sunExposure}
            onChange={handleInputChange}
            className="w-full rounded-md border border-blue-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="none">Sem sol direto</option>
            <option value="morning">Pela manhã</option>
            <option value="afternoon">Pela tarde</option>
            <option value="allday">O dia todo</option>
          </select>
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="flex items-center text-blue-800 font-semibold mb-4">
          <Ruler className="w-5 h-5 mr-2" />
          Informações para o PDF
        </h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Seu nome <span className="text-gray-400 text-xs">(opcional)</span>
          </label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleInputChange}
            className="w-full rounded-md border border-blue-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: João Silva"
          />
        </div>
      </div>
      
      <div className="text-center pt-2">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Calcular BTUs Necessários
        </button>
      </div>
    </form>
  );
};

export default CalculatorForm;