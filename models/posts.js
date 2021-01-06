const db = require("./index.js");

const Posts = db.sequelize.define("posts", {
  title: {
    type: db.Sequelize.STRING,
  },
  content: {
    type: db.Sequelize.TEXT,
  },
});

module.exports = Posts;
