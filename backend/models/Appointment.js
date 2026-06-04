const mongoose = require("mongoose");

const schema = new mongoose.Schema({
user:String,
name:String,
email:String,
phone:String,
doctor:String,
date:String,
time:String,
status:{
type:String,
default:"Pending"
}
});

module.exports = mongoose.model("Appointment", schema);