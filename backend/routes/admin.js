const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Appointment = require("../models/Appointment");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

/* STATS */
router.get("/stats", auth, admin, async (req,res)=>{
const users = await User.countDocuments();
const appointments = await Appointment.countDocuments();
const pending = await Appointment.countDocuments({status:"Pending"});
const confirmed = await Appointment.countDocuments({status:"Confirmed"});
const completed = await Appointment.countDocuments({status:"Completed"});
const cancelled = await Appointment.countDocuments({status:"Cancelled"});

res.json({
users,
appointments,
pending,
confirmed,
completed,
cancelled
});
});

/* ALL APPOINTMENTS */
router.get("/appointments", auth, admin, async (req,res)=>{
const data = await Appointment.find().sort({_id:-1});
res.json(data);
});

/* UPDATE STATUS */
router.put("/appointments/:id/status", auth, admin, async (req,res)=>{
const {status} = req.body;

await Appointment.findByIdAndUpdate(
req.params.id,
{status}
);

res.json({message:"Status updated"});
});

module.exports = router;