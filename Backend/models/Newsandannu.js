const mongoose = require("mongoose")

const NewsandannuSchema = mongoose.Schema({
   heading:String,
   description:String,
   time:String,
   image:String,
})

module.exports = mongoose.model("Newsandannu", NewsandannuSchema);