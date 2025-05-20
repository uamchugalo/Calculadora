import { CalculationResult } from '../types';

export const generatePDF = (result: CalculationResult): void => {
  const { formData, btuRequired, recommendedSize } = result;
  
  // Calculate room area
  const width = Number(formData.width);
  const length = Number(formData.length);
  const area = width * length;
  
  // Format customer name
  const customerName = formData.customerName || 'Cliente';
  
  // Create a text representation of the data
  const title = 'RELATÓRIO DE CÁLCULO DE BTUs';
  const date = new Date().toLocaleDateString('pt-BR');
  
  let content = `
${title}
Data: ${date}
Cliente: ${customerName}

DADOS DO AMBIENTE
----------------
Dimensões: ${width}m × ${length}m × ${formData.height}m
Área: ${area.toFixed(2)} m²
Pessoas no ambiente: ${formData.peopleCount}
Incidência de sol: ${
    formData.sunExposure === 'none' ? 'Sem sol direto' :
    formData.sunExposure === 'morning' ? 'Pela manhã' :
    formData.sunExposure === 'afternoon' ? 'Pela tarde' :
    'O dia todo'
  }

RESULTADO DO CÁLCULO
-------------------
BTUs necessários: ${Math.round(btuRequired).toLocaleString('pt-BR')} BTUs
Ar-condicionado recomendado: ${recommendedSize.toLocaleString('pt-BR')} BTUs

Observações:
- Este cálculo considera fatores básicos para dimensionamento.
- Consulte um profissional para instalação adequada.
- Para maior eficiência energética, considere modelos inverter.
  `;
  
  // Create a Blob containing the text data
  const blob = new Blob([content], { type: 'text/plain' });
  
  // Create a URL for the Blob
  const url = URL.createObjectURL(blob);
  
  // Create a link element
  const a = document.createElement('a');
  a.href = url;
  a.download = `Calculo_BTU_${customerName.replace(/\s+/g, '_')}_${date.replace(/\//g, '-')}.txt`;
  
  // Append the link to the body
  document.body.appendChild(a);
  
  // Click the link to download the file
  a.click();
  
  // Remove the link from the body
  document.body.removeChild(a);
  
  // Revoke the URL to free up memory
  URL.revokeObjectURL(url);
};