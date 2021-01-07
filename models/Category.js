const db = require("./");

const Category = db.sequelize.define("category", {
  name: {
    type: db.Sequelize.STRING,
    slug: {
      type: db.Sequelize.STRING,
    },
  },
});

// Category.sync({ force: true });

module.exports = Category;
