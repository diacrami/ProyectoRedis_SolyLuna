"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class Reserva extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Factura, {
        foreignKey: "num_factura",
      });
      models.Factura.hasMany(this, {
        foreignKey: "num_factura",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      this.belongsTo(models.Habitacion, {
        foreignKey: "num_habitacion",
      });
      models.Habitacion.hasMany(this, {
        foreignKey: "num_habitacion",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  Reserva.init(
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
      num_factura: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Factura", //Model name.
          key: "num",
        },
      },
      num_habitacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Habitacion", //Model name.
          key: "num",
        },
      },
      fecha_reservado: {
        type: DataTypes.TIME,
        defaultValue: new Date(),
        allowNull: false,
      },
      fecha_entrada: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      fecha_salida: {
        type: DataTypes.TIME,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Reserva",
      tableName: "Reservas",
    }
  );
  return Reserva;
};
