const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const User = require("../models/users");

module.exports = function (passport) {
  passport.use(
    new localStrategy(
      { usernameField: "username" },
      (username,
      password,
      (r) => {
        User.findOne({ where: { username: username } }).then((user) => {
          if (!user) {
            return r(null, false, { message: "Account not found" });
          }

          bcrypt.compare(password, user.password, (err, succ) => {
            if (succ) {
              return r(null, user);
            } else {
              return r(null, false, { message: "Incorrect credentials" });
            }
          });
        });
      })
    )
  );

  passport.serializeUser(function (user, d) {
    d(null, user.id);
  });

  passport.deserializeUser(function (id, d) {
    //   TODO: check sequelize findByPk
    User.findByPk(id).then((user) => {
      d(null, user);
    });
  });
};
