// Importa el módulo Express para crear y configurar el servidor
const express = require('express');
const app = express();
const cors = require('cors'); // Importa el paquete cors

// Configuración de CORS
app.use(cors());

// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(express.json());

// Importa las rutas de la aplicación
const routes = require('./routes/routes');

// Importa el controlador para capturar la página web como PDF
const pdfCaptureController = require('./controllers/pdfCaptureController');

// Rutas
app.use('/api', routes);

// Ruta para capturar la página web como PDF
app.post('/capture-pdf', pdfCaptureController);

// Define el puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 3001;

// Inicia el servidor y escucha en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
