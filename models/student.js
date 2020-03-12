const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const StudentSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: String
});
StudentSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Student", StudentSchema);
