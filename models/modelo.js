// Importa el módulo de conexión a la base de datos
const pool = require('../config/db');

// Librería para encriptar contraseñas
const bcrypt = require('bcrypt');
const saltRounds = 10; // Número de rondas para el algoritmo de hash (puede ajustarse según tus necesidades)

module.exports = {
  // Insertar un nuevo usuario en la base de datos con contraseña seguras
  insertUsuario: async (usuarioData) => {
    const connection = await pool.getConnection();
    
    try {
      // Generar un salt aleatorios
      const salt = await bcrypt.genSalt(saltRounds);
      
      // Hashear la contraseña con el salt generado
      const hashedPassword = await bcrypt.hash(usuarioData.contrasena, salt);
      
      // Insertar el usuario con la contraseña hasheada en la base de datos
      const [result] = await connection.execute(
        'INSERT INTO TB_USUARIOS_JWT (nombre, primer_apellido, segundo_apellido, telefono, correo_electronico, nombre_usuario, contrasena_hash, contrasena_salt, id_rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [usuarioData.nombre, usuarioData.primer_apellido, usuarioData.segundo_apellido, usuarioData.telefono, usuarioData.correo_electronico, usuarioData.nombre_usuario, hashedPassword, salt, usuarioData.id_rol]
      );
      
      connection.release();
      return result;
    } catch (error) {
      console.error('Error al insertar el usuario:', error);
      throw error;
    }
  },

  // Obtener información de usuarios por su ID
  selectUsuario: async (id) => {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM TB_USUARIOS_JWT WHERE id = ?', [id]);
    connection.release();
    return rows;
  },

  // Actualizar el teléfono de un usuario por su ID
  updateUsuario: async (id, telefono, correo_electronico) => {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'UPDATE TB_USUARIOS_JWT SET telefono = ?, correo_electronico = ? WHERE id = ?',
      [telefono, correo_electronico, id]
    );
    connection.release();
    return result;
  },

  // Eliminar un usuario por su ID
  deleteUsuario: async (id) => {
    const connection = await pool.getConnection();
    const [result] = await connection.execute('DELETE FROM TB_USUARIOS_JWT WHERE id = ?', [id]);
    connection.release();
    return result;
  },
};