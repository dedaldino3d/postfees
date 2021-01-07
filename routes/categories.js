const express = require("express");
const router = express.Router();

const Category = require("../models/Category");

router.get("/", (req, res) => {
  Category.findAll({ order: [["createdAt", "DESC"]] })
    .then((catgs) => {
      res.render("categories/list", { categories: catgs });
    })
    .catch((err) => {
      req.flash(
        "error_sg",
        "Something went wrong, our engineers are working on that"
      );
      res.redirect("/");
    });
});

router.get("/new_category", (req, res) => {
  res.render("categories/add");
});

router.post("/new_category", (req, res) => {
  let errs = [];
  let msgs = ["This field may not be blank", "Field too short"];

  if (
    (!req.body.name && typeof req.body.name === undefined) ||
    req.body.name === null
  ) {
    errs.push({ msg: { name: msgs[0] } });
  }

  if (req.body.name.length < 2) {
    errs.push({ msg: { name: msgs[1] } });
  }

  if (errs.length > 0) {
    res.render("categories/add", { errors: errs });
  } else {
    Category.create({
      name: req.body.name,
      slug: req.body.slug,
    })
      .then(() => {
        req.flash("success_msg", "Category created with success");
        res.redirect("/categories");
      })
      .catch((err) => {
        req.flash("error_msg", err);
      });
  }
});

router.get("/categories/:id/update", (req, res) => {
  Category.findOne({ where: { id: req.params.id } })
    .then((catg) => {
      res.render("categories/update", { category: catg });
    })
    .catch((err) => {
      req.flash("error_msg", "Category not found");
      res.redirect("/categories");
    });
});

router.post("/categories/update", (req, res) => {
  Category.update(
    { name: req.body.name, slug: req.body.slug },
    { where: { id: req.body.id } }
  )
    .then(() => {
      req.flash("success_msg", "Category updated");
      req.redirect("/categories");
    })
    .catch((err) => {
      req.flash("error_msg", "Something went wrong, we are solving that");
    });
});

router.get("/categories/:id/delete", (req, res) => {});

router.delete("/categories/:id/delete", (req, res) => {
  Category.destroy({ where: { id: req.params.id } })
    .then(() => {
      req.flash("success_msg", "Category has been deleted");
      res.redirect("/categories");
    })
    .catch((err) => {
      req.flash("error_msg", "Can't delete category");
    });
});

module.exports = router;
