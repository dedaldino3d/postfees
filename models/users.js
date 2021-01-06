const Sequelize = require("sequelize");
const sequelize = require("./index");

const Users = sequelize.define("users", {
  username: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  age: {
    type: Sequelize.TINYINT,
  },
});

module.exports = Users;
