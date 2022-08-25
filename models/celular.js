"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class Celular extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Huesped, {
        foreignKey: "cedula_huesped",
      });
      models.Huesped.hasMany(this, {
        as: "Celulares",
        foreignKey: "cedula_huesped",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Celular.init(
    {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
        defaultValue: () => {
          return uuidv4();
        },
      },
      codigo: {
        type: DataTypes.INTEGER,
        defaultValue: 593,
        allowNull: false,
      },
      numero: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      cedula_huesped: {
        type: DataTypes.STRING(10),
        allowNull: false,
        references: {
          model: "Huesped", //Model name.
          key: "cedula",
        },
      },
    },
    {
      sequelize,
      modelName: "Celular",
      tableName: "Celulares",
    }
  );
  return Celular;
};
