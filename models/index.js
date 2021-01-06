const Sequelize = require("Sequelize");

const sequelize = new Sequelize("node_test", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(function () {
    console.log("Successful authentication");
  })
  .catch(function (err) {
    console.log("Authentication Failed");
  });

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize,
};
