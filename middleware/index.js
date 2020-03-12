var Faculty = require("../models/faculty"),
    Student = require("../models/student");

var middlewareObj = {};
// middlewareObj.checkCommentOwnership = function(req, res, next) {
//     if (req.isAuthenticated()) {
//         //Is Authorized
//         Comment.findById(req.params.comment_id, function(err, foundComment) {
//             if (err) {
//                 req.flash("error", "You need to be logged in");
//                 res.redirect("back");
//             } else {
//                 if (foundComment.author.id.equals(req.user._id)) {
//                     next();
//                 } else {
//                     req.flash("error", "Permission denied !");
//                     res.redirect("back");
//                 }
//             }
//         });
//     } else {
//         req.flash("error", "You need to be logged in");
//         res.redirect("back");
//     }
// };

// middlewareObj.isLoggedIn = function(req, res, next) {
//     req.flash("error", "You need to be logged in");
//     res.redirect("/login");
// };

middlewareObj.isFaculty = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.role === "Faculty") return next();
        res.redirect("back");
    } else res.redirect("/login");
};

middlewareObj.isStudent = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.role === "Student") return next();
        res.redirect("back");
    } else res.redirect("/login");
};

// middlewareObj.checkPokemonOwnership = function(req, res, next) {
//     if (req.isAuthenticated()) {
//         //Is Authorized
//         Pokemon.findById(req.params.id, function(err, foundPokemon) {
//             if (err) {
//                 req.flash("error", "Not Found !!!");
//                 res.redirect("back");
//             } else {
//                 if (foundPokemon.author.id.equals(req.user._id)) {
//                     next();
//                 } else {
//                     req.flash("error", "You can't do that");
//                     res.redirect("back");
//                 }
//             }
//         });
//     } else {
//         req.flash("error", "You need to be logged in");
//         res.redirect("back");
//     }
// };
module.exports = middlewareObj;
