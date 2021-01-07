const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");

const posts = require("./routes/posts");
const main = require("./routes");

const app = express();

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
app.use(flash());
// middleware
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("errpr_msg");

  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", main);
app.use("/posts", posts);

// start server
app.listen(8000, () => {
  console.log(`Server Running on http://localhost:${8000}`);
});
