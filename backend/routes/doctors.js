const express = require("express");
const router = express.Router();

router.get("/", async (req,res)=>{

const doctors = [
{
name:"Dr. James Wilson",
specialization:"Cardiologist",
image:"https://images.unsplash.com/photo-1612349317150-e413f6a5b16d",
experience:"12 Years",
qualification:"MBBS, MD Cardiology",
hospital:"MedSchedule Heart Center",
fee:"₹700",
about:"Expert in heart care, chest pain, blood pressure, and cardiac consultation."
},
{
name:"Dr. Priya Sharma",
specialization:"Pediatrician",
image:"https://images.unsplash.com/photo-1594824476967-48c8b964273f",
experience:"9 Years",
qualification:"MBBS, DCH",
hospital:"Children Care Clinic",
fee:"₹500",
about:"Specialist in child health, vaccination, fever, growth, and nutrition care."
},
{
name:"Dr. John Smith",
specialization:"General Physician",
image:"https://images.unsplash.com/photo-1559839734-2b71ea197ec2",
experience:"10 Years",
qualification:"MBBS",
hospital:"MedSchedule General Clinic",
fee:"₹400",
about:"Treats fever, cold, infection, diabetes, BP and general health issues."
},
{
name:"Dr. Emily",
specialization:"Dermatologist",
image:"https://images.unsplash.com/photo-1651008376811-b90baee60c1f",
experience:"8 Years",
qualification:"MBBS, MD Dermatology",
hospital:"Skin Care Center",
fee:"₹600",
about:"Specialist in acne, skin allergy, hair fall, rashes and cosmetic skin care."
},
{
name:"Dr. Robert",
specialization:"Dentist",
image:"https://images.unsplash.com/photo-1622253692010-333f2da6031d",
experience:"11 Years",
qualification:"BDS, MDS",
hospital:"Smile Dental Clinic",
fee:"₹450",
about:"Expert in tooth pain, cleaning, braces, root canal and dental care."
},
{
name:"Dr. Alex",
specialization:"Fever Specialist",
image:"https://images.unsplash.com/photo-1582750433449-648ed127bb54",
experience:"7 Years",
qualification:"MBBS",
hospital:"Fever Care Unit",
fee:"₹350",
about:"Handles fever, viral infection, flu symptoms, dengue and seasonal illness."
}
];

res.json(doctors);

});

module.exports = router;