const express = require("express"),
    app = express(),
    methodOverride = require("method-override"),
    mongoose = require("mongoose"),
    request = require("request"),
    flash = require("connect-flash"),
    bodyParser = require("body-parser"),
    Student = require("./models/student"),
    Faculty = require("./models/faculty"),
    cors = require("cors"),
    passport = require("passport"),
    LocalStratergy = require("passport-local");

//===================================================================
//Requiring ROUTES

var indexRoutes = require("./routes/index"),
    studentRoutes = require("./routes/student"),
    facultyRoutes = require("./routes/faculty");

//===================================================================
//Connecting mongoose to mongoDB

mongoose.connect("mongodb://localhost:27017/edutracker", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//===================================================================
//linking external files
app.use(express.static(__dirname + "/public"));

//for flash messages
app.use(flash());

//for post routes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//setting view engine ejs
app.set("view engine", "ejs");

//setting session
app.use(
    require("express-session")({
        secret: "bitchor",
        resave: false,
        saveUninitialized: false
    })
);

//===================================================================
//Passport initialization

app.use(passport.initialize());
app.use(passport.session());
// passport.use(new LocalStratergy(Student.authenticate()));
passport.use("student", new LocalStratergy(Student.authenticate()));
passport.use("faculty", new LocalStratergy(Faculty.authenticate()));
// passport.serializeUser(Student.serializeUser());
// passport.deserializeUser(Student.deserializeUser());
passport.serializeUser((user, done) => {
    // user.permission = "faculty_permission";
    done(null, user);
});
passport.deserializeUser((user, done) => {
    if (user != null) {
        done(null, user);
    }
});

//===================================================================
//setting locals

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.err = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//===================================================================
//setting up routes

app.use("/", indexRoutes);
app.use("/student", studentRoutes);
app.use("/faculty", facultyRoutes);

//===================================================================
//listening at a port

const port = process.env.PORT || 7000;
app.listen(port, () => console.log("listening at " + port));

//===================================================================
