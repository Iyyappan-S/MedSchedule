const express = require("express");
const router = express.Router();

const Rating = require("../models/Rating");
const auth = require("../middleware/auth");

/* ⭐ ADD / UPDATE RATING */
router.post("/", auth, async (req,res)=>{

try{

const {doctor, rating} = req.body;

/* update existing rating */
await Rating.findOneAndUpdate(
{
doctor,
user:req.user.username
},
{
rating
},
{
upsert:true
}
);

res.json({message:"Rating saved"});

}catch(err){
console.log(err);
res.status(500).json({message:"Server error"});
}

});

/* 📊 GET AVG RATING */
router.get("/:doctor", async (req,res)=>{

try{

const data = await Rating.find({
doctor:req.params.doctor
});

if(data.length===0){
return res.json({avg:0});
}

const avg =
data.reduce((a,b)=>a+b.rating,0)
/ data.length;

res.json({
avg:avg.toFixed(1)
});

}catch(err){
console.log(err);
res.status(500).json({message:"Server error"});
}

});

module.exports = router;