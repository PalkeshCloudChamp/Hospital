const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('wardboy', {
    wbId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    wbName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING(6),
      allowNull: false
    },
    wbNo: {
      type: DataTypes.STRING(13),
      allowNull: false
    },
    wbEmail: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    wardAssi: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ward',
        key: 'wardNo'
      }
    },
    wbDOB: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'wardboy',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "wbId" },
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
