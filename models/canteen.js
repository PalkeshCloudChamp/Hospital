const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('canteen', {
    prodId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    prodName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    prodType: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    prodPrice: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'canteen',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "prodId" },
        ]
      },
    ]
  });
};
