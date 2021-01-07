const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const User = require("../models/users");

const router = express().Router();

router.get("/signup", (req, res) => {
  res.render("users/signup");
});

router.post("/signup", (req, res) => {
  async function validateUser(username, email) {
    let user;
    try {
      user = await User.findOne({ where: { username: username } });
      user = await User.findOne({ where: { email: email } });
    } catch (err) {
      console.log("Error: ", err);
    }
    if (!!user) return true;
    return false;
  }

  let errs = [];
  let msg = [
    "This field may not be blank",
    "The two password didn't match",
    "A user with that username already exist",
    "A user with that email already exist",
  ];

  if (
    (!req.body.username && req.body.username === undefined) ||
    req.body.username === null
  ) {
    errs.push({ msg: { username: msg[0] } });
  }
  if (
    (!req.body.password && req.body.password === undefined) ||
    req.body.password === null ||
    req.body.password_confirm
  ) {
    errs.push({ msg: { password: msg[0] } });
  }
  if (req.body.password !== req.body.password_confirm) {
    errs.push({ msg: { password_confirm: msg[1] } });
  }

  if (errs.length > 0) {
    req.flash("error_msg", { errors: errs });
  } else {
    if (validateUser(req.body.username, req.body.email)) {
      errs.push({ msg: { username: msg[2], email: msg[3] } });
    } else {
      User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      })
        .then(() => {
          req.flash("success_msg", "Welcome to Postfees");
          res.redirect("/");
        })
        .catch((err) => {
          req.flash("error_msg", "Something went wrong");
        });

      bcrypt.genSalt(10, (err, salt) => {
        // user instance does not exit
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) {
            req.flash("error_msg", "Something went wrong");
          }
          user.password = hash;
          user.save();
        });
      });
    }
  }
});

router.get("/login", (req, res) => {
  res.render("users/login");
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
});

module.exports = router;
