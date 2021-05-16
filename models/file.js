const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const FileSchema = new mongoose.Schema({
    path: String,
    topic: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Faculty",
        },
        username: { type: String, unique: false },
    },
});
// FileSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("File", FileSchema);
