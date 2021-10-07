var DataTypes = require("sequelize").DataTypes;
var _staff = require("./staff");

function initModels(sequelize) {
  var staff = _staff(sequelize, DataTypes);


  return {
    staff,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
