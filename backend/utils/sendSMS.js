const sendSMS = async (
phone,
doctor,
date,
time
)=>{

console.log("📱 SMS Reminder");

console.log(
`Phone: ${phone}`
);

console.log(
`Doctor: ${doctor}`
);

console.log(
`Date: ${date}`
);

console.log(
`Time: ${time}`
);

};

module.exports = sendSMS;