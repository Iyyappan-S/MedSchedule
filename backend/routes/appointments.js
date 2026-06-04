const express = require("express");
const router = express.Router();

const Appointment = require("../models/Appointment");
const auth = require("../middleware/auth");

const sendEmail = require("../utils/sendEmail");
const sendSMS = require("../utils/sendSMS");

/* BOOK APPOINTMENT */
router.post("/", auth, async (req,res)=>{

try{

const {
name,
email,
phone,
doctor,
date,
time
} = req.body;

const exists = await Appointment.findOne({
doctor,
date,
time
});

if(exists){
return res.json({message:"Slot booked"});
}

await new Appointment({
user:req.user.username,
name,
email,
phone,
doctor,
date,
time,
status:"Pending"
}).save();

if(email){
await sendEmail(email,doctor,date,time);
}

if(phone){
await sendSMS(phone,doctor,date,time);
}

res.json({message:"Booked"});

}catch(err){
console.log(err);
res.status(500).json({message:"Booking failed"});
}

});

/* MY APPOINTMENTS - KEEP ABOVE /:doctor/:date */
router.get("/my", auth, async (req,res)=>{

try{

const data = await Appointment.find({
user:req.user.username
}).sort({_id:-1});

res.json(data);

}catch(err){
console.log(err);
res.status(500).json({message:"Failed to fetch my appointments"});
}

});

/* GET ALL */
router.get("/", async (req,res)=>{

try{
const data = await Appointment.find();
res.json(data);
}catch(err){
res.status(500).json({message:"Failed to fetch"});
}

});

/* GET BOOKED SLOTS */
router.get("/:doctor/:date", async (req,res)=>{

try{

const {doctor,date} = req.params;

const data = await Appointment.find({
doctor,
date
});

const times = data.map(d=>d.time);

res.json(times);

}catch(err){
res.status(500).json({message:"Failed to fetch slots"});
}

});

/* DELETE */
router.delete("/:id", auth, async (req,res)=>{

try{

await Appointment.findByIdAndDelete(req.params.id);

res.json({message:"Deleted successfully ✅"});

}catch{
res.status(500).json({error:"Delete failed ❌"});
}

});

module.exports = router;