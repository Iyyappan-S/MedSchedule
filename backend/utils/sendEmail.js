const nodemailer = require("nodemailer");

const sendEmail = async (
to,
doctor,
date,
time
)=>{

try{

const transporter =
nodemailer.createTransport({

service:"gmail",

auth:{
user:process.env.EMAIL_USER,
pass:process.env.EMAIL_PASS
}

});

await transporter.sendMail({

from:process.env.EMAIL_USER,

to,

subject:"Appointment Confirmation",

html:`

<h2>🏥 Appointment Confirmed</h2>

<p><b>Doctor:</b> ${doctor}</p>

<p><b>Date:</b> ${date}</p>

<p><b>Time:</b> ${time}</p>

<p>
Thank you for choosing MedSchedule.
</p>

`

});

console.log("✅ Email Sent");

}catch(err){

console.log(
"Email Error:",
err.message
);

}

};

module.exports = sendEmail;