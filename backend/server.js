require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();

/* =========================
MIDDLEWARE
========================= */

app.use(cors());

app.use(express.json());

/* =========================
STATIC FOLDER
========================= */

/* Prescription uploads */

app.use(
"/uploads",
express.static("uploads")
);

/* =========================
DATABASE CONNECTION
========================= */

/* DATABASE CONNECTION */
console.log("MONGO_URL =", process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL)
.then(() => {
  console.log("✅ MongoDB Atlas Connected");
})
.catch((err) => {
  console.log("❌ DB Error:", err);
});


/* =========================
ROUTES
========================= */

/* AUTH */

app.use(
"/auth",
require("./routes/auth")
);

/* APPOINTMENTS */

app.use(
"/appointments",
require("./routes/appointments")
);

/* CHAT AI */

app.use(
"/chat",
require("./routes/chat")
);

/* DOCTORS */

app.use(
"/doctors",
require("./routes/doctors")
);


app.use(
"/admin",
require("./routes/admin")
);

/* FILE UPLOAD */

app.use(
"/upload",
require("./routes/upload")
);

/* =========================
ROOT
========================= */

app.get("/", (req,res)=>{

res.send(
"🚀 MedSchedule Backend Running"
);

});

/* =========================
SERVER
========================= */

const PORT = 5000;

app.listen(PORT, ()=>{

console.log(
`✅ Server running on port ${PORT}`
);

});