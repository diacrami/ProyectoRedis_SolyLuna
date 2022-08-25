"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Habitacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Tipo_Habitacion, {
        foreignKey: "id_tipo",
      });
      models.Tipo_Habitacion.hasMany(this, {
        foreignKey: "id_tipo",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  Habitacion.init(
    {
      num: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      id_tipo: {
        allowNull: false,
        type: DataTypes.UUIDV4,
        references: {
          model: "Tipo_Habitacion", //Model name.
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Habitacion",
      tableName: "Habitaciones",
    }
  );
  return Habitacion;
};
