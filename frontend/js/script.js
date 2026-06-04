const doctors = [
{
name:"Dr. Sarah Chen",
spec:"Cardiology",
image:"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400"
},
{
name:"Dr. James Wilson",
spec:"Dermatology",
image:"https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400"
},
{
name:"Dr. Priya Sharma",
spec:"General",
image:"https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400"
}
];

/* ================= RENDER ================= */
function renderDoctors(list = doctors){

const grid = document.getElementById("doctorsGrid");
grid.innerHTML = "";

list.forEach(doc => {

const div = document.createElement("div");
div.className = "card";

div.innerHTML = `
<img src="${doc.image}">
<h3>${doc.name}</h3>
<p>${doc.spec}</p>

<input placeholder="Your Name" class="name">
<input type="date" class="date">

<select class="time">
<option>10:30 AM</option>
<option>12:00 PM</option>
<option>2:30 PM</option>
<option>7:00 PM</option>
</select>

<button>Book</button>
`;

div.querySelector("button").onclick = () => book(doc.name, div.querySelector("button"));

grid.appendChild(div);

});
}

/* ================= SEARCH ================= */
function searchDoctor(){
const val = document.getElementById("search").value.toLowerCase();

const filtered = doctors.filter(d =>
d.name.toLowerCase().includes(val) ||
d.spec.toLowerCase().includes(val)
);

renderDoctors(filtered);
}

/* ================= BOOK ================= */
async function book(doctor, btn){

btn.disabled = true;
btn.innerText = "Booking...";

const card = btn.parentElement;

const name = card.querySelector(".name").value;
const date = card.querySelector(".date").value;
const time = card.querySelector(".time").value;

if(!name || !date){
alert("Please fill all details ❗");
btn.disabled = false;
btn.innerText = "Book";
return;
}

try{
const res = await fetch("http://localhost:5000/appointments",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({name,doctor,date,time})
});

const data = await res.json();
alert(data.message);

}catch(err){
alert("Booking failed ❌");
console.log(err);
}

btn.disabled = false;
btn.innerText = "Book";
}

/* ================= CHAT ================= */
async function send(){

const input = document.getElementById("input");
const msg = input.value;

if(!msg) return;

const box = document.getElementById("messages");

box.innerHTML += `<p><b>You:</b> ${msg}</p>`;

const res = await fetch("http://localhost:5000/chat",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({message:msg})
});

const data = await res.json();

box.innerHTML += `<p><b>Bot:</b> ${data.reply}</p>`;

input.value = "";
box.scrollTop = box.scrollHeight;
}

/* ================= CHAT TOGGLE ================= */
function toggleChat(){
const c = document.getElementById("chat");
c.style.display = c.style.display === "none" ? "block" : "none";
}

/* ================= INIT ================= */
renderDoctors();