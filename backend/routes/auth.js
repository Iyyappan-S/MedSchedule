const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* REGISTER USER */
router.post("/register", async (req,res)=>{
try{
const {username,password} = req.body;

const exists = await User.findOne({username});
if(exists) return res.json({message:"User already exists"});

const hash = await bcrypt.hash(password,10);

await new User({
username,
password:hash,
role:"user"
}).save();

res.json({message:"Registered successfully"});
}catch(err){
res.status(500).json({message:"Register failed"});
}
});

/* LOGIN */
router.post("/login", async (req,res)=>{
try{
const {username,password} = req.body;

const user = await User.findOne({username});
if(!user) return res.json({message:"User not found"});

const ok = await bcrypt.compare(password,user.password);
if(!ok) return res.json({message:"Wrong password"});

const token = jwt.sign(
{
id:user._id,
username:user.username,
role:user.role
},
"SECRET123",
{expiresIn:"1d"}
);

res.json({
token,
role:user.role
});
}catch(err){
res.status(500).json({message:"Login failed"});
}
});

module.exports = router;