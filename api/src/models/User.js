const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('user', {
    /* githubId: {
    type: DataTypes.STRING,
    unique: true,
    }, */
    googleId: {
    type: DataTypes.STRING,
    unique: true,
    }, 
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        //allowNull: false,
    },
    estadoUser: {
      type: DataTypes.ENUM('activo', 'deleted'),
      allowNull: false,
      defaultValue:'activo'
    },
    estadoUser: {
      type: DataTypes.ENUM('activo', 'deleted'),
      allowNull: false,
      defaultValue:'activo'
    },
    estadoPassword: {
      type: DataTypes.ENUM('ok', 'reset'),
      allowNull: false,
      defaultValue:'ok'
    },
    rol: {
        type:DataTypes.ENUM('admin', 'usuario'),
        allowNull: false,
        defaultValue:'usuario'
    },
    historial: {
        type:DataTypes.STRING,
    },
    email: {
        type:DataTypes.STRING,
        //allowNull: false,
        // esto es una validacion de email
        validate:{
          isEmail : true
        }
    }
  }) //
}