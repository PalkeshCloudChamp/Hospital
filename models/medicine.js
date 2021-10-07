const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('medicine', {
    medicineId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    medName: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    medType: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    manuDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    expDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    manufacturer: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    purDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'medicine',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "medicineId" },
        ]
      },
    ]
  });
};
