const express = require("express");
const request = require("request");
const fs = require("fs");
const app = express();
const multer = require("multer");
const mongoose = require("mongoose");
const crypto = require("crypto");
const methodOverride = require("method-override");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const path = require("path");
const bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const mongoUrl = process.env.DATABASE_URL;
const conn = mongoose.createConnection(mongoUrl);
let gfs;
conn.once("open", function() {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads");
});

//storage
const storage = new GridFsStorage({
    url: mongoUrl,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const fileInfo = {
                filename: file.originalname,
                bucketName: "uploads"
            };
            resolve(fileInfo);
        });
    }
});
const upload = multer({ storage });

//download

app.get("/", function(req, res) {
    res.render("page");
});
app.post("/upload", upload.single("file"), function(req, res) {
    console.log("uploaded");
    res.redirect("/");
});
app.get("/files", function(req, res) {
    gfs.files.find({}).toArray((err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({ err: "No Files Exist" });
        } else {
            return res.json(file);
        }
    });
});

app.get("/show", (req, res) => {
    gfs.collection("uploads");
    var key = req.query.key;
    gfs.files.find({ filename: key }).toArray(function(err, files) {
        if (!files || files.length === 0) {
            return res.status(404).json({
                responseCode: 1,
                responseMessage: "error"
            });
        }
        var readstream = gfs.createReadStream({
            filename: files[0].filename,
            root: "uploads"
        });
        var name = files[0].filename;
        var writestream = fs.createWriteStream(name);
        readstream.pipe(writestream);

        res.download(__dirname + "/" + name, name, function(err) {
            if (err) throw err;
            else console.log("check console");
        });

        res.set("Content-Type", files[0].contentType);
    });
});

const port = 8080;
app.listen(port, function() {
    console.log("running");
});
