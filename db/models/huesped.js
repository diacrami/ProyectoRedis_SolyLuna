"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Huesped extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Usuario, {
        foreignKey: "id_usuario",
      });
      models.Usuario.hasOne(this, {
        foreignKey: "id_usuario",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  Huesped.init(
    {
      cedula: {
        type: DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      id_usuario: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        references: {
          model: "Usuario", //Model name.
          key: "id",
        },
      },
      pais: {
        type: DataTypes.STRING,
        defaultValue: "Ecuador",
        allowNull: false,
      },
      ciudad: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fecha_nacimiento: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Huesped",
      tableName: "Huespedes",
    }
  );
  return Huesped;
};
