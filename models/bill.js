const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bill', {
    billNo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'patient',
        key: 'patId'
      }
    },
    patientType: {
      type: DataTypes.STRING(3),
      allowNull: false
    },
    docId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'doctor',
        key: 'docId'
      }
    },
    docCharge: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    roomNo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'room',
        key: 'roomNo'
      }
    },
    canteenCharge: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    medAmo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    labCharge: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    totalAmount: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'bill',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "billNo" },
        ]
      },
      {
        name: "patientId",
        using: "BTREE",
        fields: [
          { name: "patientId" },
        ]
      },
      {
        name: "docId",
        using: "BTREE",
        fields: [
          { name: "docId" },
        ]
      },
      {
        name: "roomNo",
        using: "BTREE",
        fields: [
          { name: "roomNo" },
        ]
      },
    ]
  });
};
