const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ward', {
    wardNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    wardType: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "wardType"
    },
    containAc: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    doubleBed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'ward',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "wardNo" },
        ]
      },
      {
        name: "wardType",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "wardType" },
        ]
      },
    ]
  });
};
