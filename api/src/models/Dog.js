const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("dog", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    dog_breed: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    height_max: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 11,
        max: 110,
        isGreater(value) {
          if (value < this.height_min)
            throw new Error("Max height should be greater than min height");
        },
      },
    },
    height_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 10,
        max: 109,
      },
    },
    weight_max: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 2,
        max: 99,
        isGreater(value) {
          if (value < this.weight_min)
            throw new Error("Max weight should be greater than min weight");
        },
      },
    },
    weight_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 98,
      },
    },
    life_span: {
      type: DataTypes.STRING,
    },
  });
};
