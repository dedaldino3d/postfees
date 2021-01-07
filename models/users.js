const db = require("./index");

const Users = db.sequelize.define("users", {
  username: {
    type: db.Sequelize.STRING,
  },
  email: {
    type: db.Sequelize.STRING,
  },
  age: {
    type: db.Sequelize.TINYINT,
  },
  password: {
    type: db.Sequelize.STRING,
  },
});

module.exports = Users;
