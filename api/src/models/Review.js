const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('review', {

    puntaje: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    opinion:{
        type: DataTypes.STRING,
        allowNull: false,
    }

  })

}