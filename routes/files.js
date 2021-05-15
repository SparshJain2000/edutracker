const express = require("express");
const router = express.Router();
const fs = require("fs");
const middleware = require("../middleware/index");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./data/files");
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(
            null,
            Date.now() +
                "_" +
                file.originalname.split(" ")[0] +
                "." +
                file.originalname.split(".")[1],
        );
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(null, true);
    }
};
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter,
});

//download

router.get("/", function (req, res) {
    res.render("page");
});
router.post(
    "/upload",
    middleware.isFaculty,
    upload.single("file"),
    function (req, res) {
        console.log(req.body);
        console.log(req.file);
        console.log("uploaded");
        res.redirect("/");
    },
);

module.exports = router;
