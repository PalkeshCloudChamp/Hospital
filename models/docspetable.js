const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('docspetable', {
    dsId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    drId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'doctor',
        key: 'docId'
      }
    },
    speId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'specializations',
        key: 'speId'
      }
    },
    fees: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'docspetable',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "dsId" },
        ]
      },
      {
        name: "drId",
        using: "BTREE",
        fields: [
          { name: "drId" },
        ]
      },
      {
        name: "speId",
        using: "BTREE",
        fields: [
          { name: "speId" },
        ]
      },
    ]
  });
};
