const Sequelize = require("sequelize");
const sequelize = require("./index.js");

const Posts = sequelize.define("posts", {
  title: {
    type: Sequelize.STRING,
  },
  content: {
    type: Sequelize.TEXT,
  },
});

module.exports = Posts;
