const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    height: {
      type: DataTypes.INTEGER,
      defaultValue: 50
    },
    weight: {
      type: DataTypes.INTEGER,
      defaultValue: 50
    },
    health: {
      type:DataTypes.INTEGER,
      defaultValue: 50
    },
    speed: {
      type:DataTypes.INTEGER,
      defaultValue: 50
    },
    defense: {
      type:DataTypes.INTEGER,
      defaultValue: 50
    },
    attack: {
      type:DataTypes.INTEGER,
      defaultValue: 50
    },
    image: {
      type:DataTypes.STRING,
      defaultValue: 'https://okdiario.com/guiltybit/wp-content/uploads/2016/12/5-razones-para-no-ver-poke%CC%81mon-5-1200x675.jpg'
    },
    createInDb: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true
    }


  });
};
