const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('room', {
    roomNo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    wardNo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ward',
        key: 'wardNo'
      }
    },
    roomType: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    occupied: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    oneDayCharge: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'room',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "roomNo" },
        ]
      },
      {
        name: "wardNo",
        using: "BTREE",
        fields: [
          { name: "wardNo" },
        ]
      },
    ]
  });
};
