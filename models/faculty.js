const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const FacultySchema = new mongoose.Schema({
    username: String,
    password: String,
    role: String
});
FacultySchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Faculty", FacultySchema);
