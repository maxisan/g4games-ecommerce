const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('multimedia', {
        caption: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        thumb_url: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.url.slice(0,58)}t_media_lib_thumb/${this.url.slice(58)}`
            }
        },
        public_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        alt: {
            type: DataTypes.STRING,
        },
        folder: {
            type: DataTypes.STRING,
        },
        tags: {
            type: DataTypes.TEXT,
        },
        position: {
            type: DataTypes.ENUM('ninguna', 'portada', 'tarjeta'),
        }
    })
}