const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
require("../config/auth")(passport);

const posts = require("./routes/posts");
const categories = require("./routes/categories");
const main = require("./routes");

const app = express();
const PORT = 8000;

// config
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// session
app.use(
  session({
    secret: "kn43kJNSdkls0@3$%&@5389GDFdsd9s8FDKJ5KK234390dskjkd",
    resave: true,
    saveUnitialized: true,
  })
);
// auth
app.use(passport.initialize());
app.use(passport.session());
// ---
app.use(flash());
// middleware
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", main);
app.use("/posts", posts);
app.use("/categories", categories);

// start server
app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});
