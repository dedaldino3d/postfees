const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const posts = require("./routes/posts");

// config
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/posts", posts);

// start server
app.listen(8000, () => {
  console.log(`Server Running on http://localhost:${8000}`);
});
