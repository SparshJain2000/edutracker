const express = require("express"),
    router = express.Router(),
    middleware = require("../middleware");

//show homepage
router.get("/", (req, res) => res.render("home"));
router.get("/home", (req, res) => res.redirect("/"));

//show signup page
router.get("/signup", function(req, res) {
    res.render("signup");
});

//show login page
router.get("/login", (req, res) => res.render("login"));

//show about page
router.get("/about", (req, res) => res.render("about"));

//show upload page
router.get("/upload", middleware.isFaculty, (req, res) => res.render("upload"));
module.exports = router;
