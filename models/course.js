const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const courseSchema = new mongoose.Schema({

    country: String,
    institute: String,
    name: String,
    collaborators: [String]
});

courseSchema.plugin(findOrCreate);

module.exports = mongoose.model("Course", courseSchema);