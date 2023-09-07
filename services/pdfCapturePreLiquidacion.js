// services/pdfCaptureService.js
const puppeteer = require('puppeteer');

const pdfCaptureService = {
  capturePageAsPDF: async (url, outputPath) => {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url);
      await page.pdf({ path: outputPath, format: 'A3', landscape: true });
      await browser.close();
      return outputPath;
    } catch (error) {
      console.error('Error al capturar la página como PDF:', error);
      throw error;
    }
  },
};

module.exports = pdfCaptureService;