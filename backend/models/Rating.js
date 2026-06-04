const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
doctor: String,
user: String,
rating: Number
});

module.exports = mongoose.model("Rating", ratingSchema);