// Importa el módulo Express para crear y configurar el servidor
const express = require('express');
const rateLimit = require('express-rate-limit');
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

// Configura el middleware de limitación de velocidad
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10000, // número máximo de solicitudes por ventana
  message: 'Has excedido el límite de velocidad de solicitudes.', // mensaje de respuesta personalizado
});

// Rutas
// Aplica el middleware de limitación de velocidad a todas las rutas que desees proteger
app.use('/api', limiter, routes);

// Ruta para capturar la página web como PDF
app.post('/capture-pdf', pdfCaptureController);

// Define el puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 3001;

// Inicia el servidor y escucha en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
