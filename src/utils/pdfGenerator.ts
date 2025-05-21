import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CalculationResult } from '../types';

export const generatePDF = async (result: CalculationResult) => {
  const element = document.createElement('div');
  element.innerHTML = `
    <div style="padding: 20px; font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #2563EB; font-size: 20px; margin-bottom: 8px;">Relatório de Cálculo de BTUs</h1>
        ${result.formData.customerName ? `<p style="font-size: 14px; color: #444;">Cliente: ${result.formData.customerName}</p>` : ''}
        <p style="font-size: 12px; color: #666;">Data: ${new Date().toLocaleDateString('pt-BR')}</p>
      </div>

      <div style="background-color: #EFF6FF; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="color: #1D4ED8; font-size: 16px; margin-bottom: 10px;">Resultado do Cálculo</h2>
        <p style="font-size: 15px; color: #1E40AF; margin-bottom: 8px;">BTUs necessários: <strong>${Math.round(result.btuRequired).toLocaleString('pt-BR')} BTUs</strong></p>
        <p style="font-size: 15px; color: #047857;">Potência recomendada: <strong>${result.recommendedSize.toLocaleString('pt-BR')} BTUs</strong></p>
      </div>

      <div style="margin-bottom: 20px;">
        <h2 style="color: #1D4ED8; font-size: 16px; margin-bottom: 10px;">Informações do Ambiente</h2>
        <div style="background-color: #F8FAFC; padding: 15px; border-radius: 8px;">
          <p style="margin-bottom: 8px; color: #444; font-size: 13px;"><strong>Dimensões:</strong> ${result.formData.width}m × ${result.formData.length}m × ${result.formData.height}m</p>
          <p style="margin-bottom: 8px; color: #444; font-size: 13px;"><strong>Área:</strong> ${(Number(result.formData.width) * Number(result.formData.length)).toFixed(2)} m²</p>
          <p style="margin-bottom: 8px; color: #444; font-size: 13px;"><strong>Pessoas no ambiente:</strong> ${result.formData.peopleCount}</p>
          <p style="color: #444; font-size: 13px;"><strong>Incidência de sol:</strong> ${
            result.formData.sunExposure === 'none' ? 'Sem sol direto' :
            result.formData.sunExposure === 'morning' ? 'Pela manhã' :
            result.formData.sunExposure === 'afternoon' ? 'Pela tarde' : 'O dia todo'
          }</p>
        </div>
      </div>

      <div style="margin-top: 20px; border-top: 1px solid #E2E8F0; padding-top: 15px; text-align: center;">
        <p style="font-size: 11px; color: #64748B;">Calculadora de BTUs</p>
        <p style="font-size: 11px; color: #64748B;">Este relatório foi gerado automaticamente em ${new Date().toLocaleDateString('pt-BR')}</p>
      </div>
    </div>
  `;

  document.body.appendChild(element);

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      windowWidth: 600,
      backgroundColor: '#ffffff'
    });

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const aspectRatio = canvas.height / canvas.width;
    const imgWidth = pdfWidth;
    const imgHeight = pdfWidth * aspectRatio;

    // Ajusta a altura se exceder o tamanho da página
    if (imgHeight > pdfHeight) {
      const scale = pdfHeight / imgHeight;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth * scale, pdfHeight);
    } else {
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    }

    pdf.save(`Calculo-BTUs-${new Date().toISOString().split('T')[0]}.pdf`);
  } finally {
    document.body.removeChild(element);
  }
};