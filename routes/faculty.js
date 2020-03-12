const express = require("express"),
    router = express.Router(),
    middleware = require("../middleware"),
    Faculty = require("../models/faculty"),
    Student = require("../models/student"),
    passport = require("passport");
const fs = require("fs");
const multer = require("multer");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const path = require("path");

//create faculty
router.post("/", function(req, res) {
    var newUser = new Faculty({ username: req.body.username, role: "Faculty" });
    Faculty.register(newUser, req.body.password, function(error, user) {
        if (error) {
            console.log(error.message);
            req.flash("error", error.message);
            return res.redirect("/signup");
        }
        passport.authenticate("faculty")(req, res, function() {
            req.flash("success", "Welcome " + user.username);
            res.redirect("/");
        });
    });
});

//handle login logic
router.post(
    "/login",
    passport.authenticate("faculty", {
        successRedirect: "/upload",
        failureRedirect: "/login"
    }),
    function(req, res) {}
);

//handle logout logic
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged You OUT !");
    res.redirect("back");
});

module.exports = router;
