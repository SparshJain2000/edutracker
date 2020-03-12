const express = require("express"),
    router = express.Router(),
    middleware = require("../middleware"),
    // Pokemon = require("../models/pokemon"),
    // Comment = require("../models/comments"),
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

// const mongoUrl =
//     "mongodb+srv://raghav:qwerty12345@cluster0-lru38.mongodb.net/test?retryWrites=true&w=majority";
// const conn = mongoose.createConnection(mongoUrl);
// let gfs;
// conn.once("open", function() {
//     gfs = Grid(conn.db, mongoose.mongo);
//     gfs.collection("uploads");
// });
// const storage = new GridFsStorage({
//     url: mongoUrl,
//     file: (req, file) => {
//         return new Promise((resolve, reject) => {
//             const fileInfo = {
//                 filename: file.originalname,
//                 bucketName: "uploads"
//             };
//             resolve(fileInfo);
//         });
//     }
// });
// const upload = multer({ storage });

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
