const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('nurse', {
    nrsId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nrsName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING(6),
      allowNull: false,
      defaultValue: "Female"
    },
    nrsNo: {
      type: DataTypes.STRING(13),
      allowNull: false
    },
    wardAssi: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ward',
        key: 'wardNo'
      }
    },
    nrsEmail: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    nrsDOB: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'nurse',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nrsId" },
        ]
      },
      {
        name: "wardAssi",
        using: "BTREE",
        fields: [
          { name: "wardAssi" },
        ]
      },
    ]
  });
};
