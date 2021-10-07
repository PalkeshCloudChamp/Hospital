const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('staff', {
    staffId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    stPName: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    stPDesi: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING(6),
      allowNull: false
    },
    stPNo: {
      type: DataTypes.STRING(13),
      allowNull: false
    },
    stPEmail: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    stPDOB: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    stPAdd: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    stPSal: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    stPass: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "user@123"
    }
  }, {
    sequelize,
    tableName: 'staff',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "staffId" },
        ]
      },
    ]
  });
};
