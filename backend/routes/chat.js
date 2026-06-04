const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    const msg = (message || "").toLowerCase();

    let reply = "I am your MedSchedule assistant. Please describe your health issue.";

    if (msg.includes("fever")) {
      reply = "For fever, drink fluids, rest well, and book a General Physician or Fever Specialist if it continues.";
    } 
    else if (msg.includes("child") || msg.includes("children") || msg.includes("baby")) {
      reply = "For children-related health concerns, please book a Pediatrician.";
    } 
    else if (msg.includes("heart") || msg.includes("chest")) {
      reply = "For heart or chest-related concerns, please consult a Cardiologist.";
    } 
    else if (msg.includes("skin")) {
      reply = "For skin-related issues, please book a Dermatologist.";
    } 
    else if (msg.includes("dental") || msg.includes("tooth")) {
      reply = "For dental problems, please book a Dentist.";
    } 
    else if (msg.includes("appointment") || msg.includes("book")) {
      reply = "To book an appointment, select a disease, choose a doctor, enter your details, select a date, and click an available slot.";
    }

    res.json({ reply });

  } catch (err) {
    console.log(err);
    res.status(500).json({ reply: "Chat service error." });
  }
});

module.exports = router;