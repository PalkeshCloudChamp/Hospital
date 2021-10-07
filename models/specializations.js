const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('specializations', {
    speId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    speName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "speName"
    },
    speType: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'specializations',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "speId" },
        ]
      },
      {
        name: "speName",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "speName" },
        ]
      },
    ]
  });
};
