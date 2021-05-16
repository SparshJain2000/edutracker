const express = require("express");
const File = require("../models/file");
const router = express.Router();
const fs = require("fs");
const middleware = require("../middleware/index");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(req.body.topic);
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

router.get("/", async (req, res) => {
    const files = await File.find({});
    res.json(files);
});
router.post(
    "/upload",
    middleware.isFaculty,
    upload.single("file"),
    async (req, res) => {
        // console.log(req.body);
        // console.log(req.file);
        // console.log(req.user.)
        if (req.file) {
            const file = new File({
                path: req.file.path,
                topic: req.body.topic,
                author: {
                    id: req.user._id,
                    username: req.user.username,
                },
            });
            await file.save();
            console.log("uploaded");
        }

        res.redirect("/");
    },
);

module.exports = router;
