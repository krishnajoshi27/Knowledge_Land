const mongoose = require("mongoose")

const AddcourseSchema = mongoose.Schema({
   courseName: String,
})

module.exports = mongoose.model("Addcourse", AddcourseSchema);