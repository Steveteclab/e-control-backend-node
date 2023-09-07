// pdfCaptureController.js
const pdfCaptureService = require('../services/pdfCapturePreLiquidacion');
const path = require('path');

const pdfCaptureController = async (req, res) => {
  try {
    // Obtiene la URL del cuerpo de la solicitud JSON
    const { url } = req.body;

    // Verifica que se haya proporcionado una URL
    if (!url) {
      return res.status(400).json({ error: 'La URL no se ha proporcionado en el cuerpo de la solicitud JSON.' });
    }

    // Define la ruta donde se guardará el archivo PDF
    const outputPath = path.join(__dirname, '../uploads/captured.pdf');

    // Captura la página web como PDF y obtén la ruta del archivo PDF generado
    const pdfPath = await pdfCaptureService.capturePageAsPDF(url, outputPath);

    // Envía el archivo PDF como respuesta
    res.download(pdfPath);
  } catch (error) {
    console.error('Error al capturar la página como PDF:', error);
    res.status(500).json({ error: 'Error al capturar la página como PDF' });
  }
};

module.exports = pdfCaptureController;