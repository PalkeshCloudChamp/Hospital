const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('patient', {
    patId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    patName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING(6),
      allowNull: false
    },
    patNo: {
      type: DataTypes.STRING(13),
      allowNull: false
    },
    patEmail: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    patDOB: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    docAssi: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'doctor',
        key: 'docId'
      }
    }
  }, {
    sequelize,
    tableName: 'patient',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "patId" },
        ]
      },
      {
        name: "docAssi",
        using: "BTREE",
        fields: [
          { name: "docAssi" },
        ]
      },
    ]
  });
};
