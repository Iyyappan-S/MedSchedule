const token = localStorage.getItem("token");

if(!token){
alert("Unauthorized ❌");
location="login.html";
}

function logout(){
localStorage.removeItem("token");
location="login.html";
}

let appointments = [];

/* LOAD DATA */
async function load(){

const res = await fetch("http://localhost:5000/appointments");
appointments = await res.json();

render(appointments);
}

/* RENDER */
function render(data){

const list = document.getElementById("list");
const count = document.getElementById("count");

list.innerHTML="";
count.innerText = data.length;

if(data.length === 0){
list.innerHTML = `<tr><td colspan="5">No appointments</td></tr>`;
return;
}

data.forEach(d=>{

const row = document.createElement("tr");

row.innerHTML=`
<td>${d.name}</td>
<td>${d.doctor}</td>
<td>${d.date}</td>
<td>${d.time}</td>
<td><button class="delete-btn">Delete</button></td>
`;

row.querySelector("button").onclick = async ()=>{

if(!confirm("Delete this appointment?")) return;

await fetch("http://localhost:5000/appointments/"+d._id,{
method:"DELETE",
headers:{Authorization:token}
});

row.remove();
};

list.appendChild(row);

});
}

/* SEARCH */
function search(){
const val = document.getElementById("search").value.toLowerCase();

const filtered = appointments.filter(a =>
a.name.toLowerCase().includes(val) ||
a.doctor.toLowerCase().includes(val)
);

render(filtered);
}

load();