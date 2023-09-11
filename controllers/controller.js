// Importa el módulo que contiene las funciones de interacción con la base de datos
const modelo = require('../models/modelo');

// Controlador para la manipulación de datos de usuarios
const controller = {
  // Inserta un nuevo usuario en la base de datos
  insertUsuario: async (req, res) => {
    try {
      // Obtiene los datos del usuario desde el cuerpo de la solicitud
      const usuarioData = req.body;
  
      // Verificar que los campos obligatorios estén presentes en el objeto de usuarioData
      if (!usuarioData.nombre || !usuarioData.primer_apellido || !usuarioData.telefono || !usuarioData.correo_electronico || !usuarioData.nombre_usuario || !usuarioData.contrasena || !usuarioData.id_rol) {
        return res.status(400).json({ status: 'error', message: 'Todos los campos son obligatorios' });
      }
  
      // Llama a la función insertUsuario del modelo para realizar la inserción
      const result = await modelo.insertUsuario(usuarioData);
  
      // Envía la respuesta con el resultado de la inserción
      res.json({ status: 'success', message: 'Usuario insertado exitosamente', data: result });
    } catch (error) {
      console.error(error);
      // Envía una respuesta de error en caso de fallo en la inserción
      res.status(500).json({ status: 'error', message: 'Error al insertar el usuario' });
    }
  },

  // Obtiene información de usuarios de la base de datos
  selectUsuario: async (req, res) => {
    try {
      // Obtiene el ID del usuario desde los parámetros de la solicitud
      const id = req.params.id;
  
      // Llama a la función selectUsuario del modelo para obtener la información
      const result = await modelo.selectUsuario(id);
  
      // Verifica si el resultado está vacío
      if (result.length === 0) {
        return res.status(404).json({ msg: 'Usuario no encontrado' });
      }
  
      // Envía la respuesta con la información de los usuarios
      res.json({ status: 'success', message: 'Usuario Encontrado exitosamente', data: result });
    } catch (error) {
      console.error(error);
      // Envía una respuesta de error en caso de fallo al obtener la información
      res.status(500).send('Error al obtener el tracking');
    }
  },

  // Actualiza la información de un usuario en la base de datos
  updateUsuario: async (req, res) => {
    try {
      // Obtiene el ID del usuario desde los parámetros de la solicitud
      const id = req.params.id;
      // Obtiene el nuevo número de teléfono desde el cuerpo de la solicitud
      const telefono = req.body.telefono;
      const correo_electronico = req.body.correo_electronico;
      
      // Llama a la función updateUsuario del modelo para realizar la actualización
      const result = await modelo.updateUsuario(id, telefono, correo_electronico);
  
      // Verificar si la actualización afectó a algún registro en la base de datos
      if (result.affectedRows === 0) {
        return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
      }
  
      // Envía la respuesta con el resultado de la actualización
      res.json({ status: 'success', message: 'Usuario Actualizado exitosamente', data: result });
    } catch (error) {
      console.error(error);
      // Envía una respuesta de error en caso de fallo en la actualización
      res.status(500).json({ status: 'error', message: 'Error al actualizar el usuario' });
    }
  },

  // Elimina un usuario de la base de datos
  deleteUsuario: async (req, res) => {
    try {
      // Obtiene el ID del usuario desde los parámetros de la solicitud
      const id = req.params.id;
      
      // Llama a la función deleteUsuario del modelo para realizar la eliminación
      const result = await modelo.deleteUsuario(id);
      
      // Envía la respuesta con el resultado de la eliminación
      res.json({ status: 'success', message: 'Usuario Eliminado exitosamente', data: result });
    } catch (error) {
      console.error(error);
      // Envía una respuesta de error en caso de fallo en la eliminación
      res.status(500).send('Error al eliminar el usuario');
    }
  },
};

// Exporta el controlador para su uso en otros módulos
module.exports = controller;