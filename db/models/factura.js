"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Factura extends Model {
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
        foreignKey: "cedula_huesped",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Factura.init(
    {
      num: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
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
      fecha_facturacion: {
        type: DataTypes.TIME,
        defaultValue: new Date(),
        allowNull: false,
      },
      precio_total: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Factura",
      tableName: "Facturas",
    }
  );
  return Factura;
};
