const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("temperament", {
    name: {
      type: DataTypes.STRING,
      get() {
        const capitalLetter = this.getDataValue("name")[0]
          .toUpperCase()
          .concat(this.getDataValue("name").slice(1));
        return capitalLetter;
      },
    },
  });
};
