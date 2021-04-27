const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('order', {

    total: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    emailEnvio:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    estado:{
        type: DataTypes.ENUM('Vacio', 'En proceso', 'Aprobado', 'Rechazado'),
        allowNull: false,// lo pase a null para probar unas cosas.
        defaultValue: 'En proceso'
    }

  })

}



