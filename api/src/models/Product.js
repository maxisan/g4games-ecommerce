const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('product', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    descripcion: {
    	type: DataTypes.TEXT,
    	allowNull: false,
    },

    descripcionCorta: { //Nuevo hasta 80 caracteres
      type: DataTypes.STRING(80),
      allowNull: false,
    }, 

    keyCode: {
    	type: DataTypes.STRING,
    	allowNull: false,
      unique: true,
    },

    tamanio: {
    	type: DataTypes.INTEGER,
    	allowNull: false,
    },

    precio: {
    	type: DataTypes.INTEGER,
    	allowNull: false,
    },

    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },

    fechaLanzamiento: { //Nuevo
      type: DataTypes.STRING,
      allowNull: false,
    },

    clasificacion: { //Nuevo
      type: DataTypes.STRING,
      allowNull: false,
    },

    desarrollador: { //Nuevo
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
};
