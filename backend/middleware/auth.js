const jwt = require("jsonwebtoken");

module.exports = (req,res,next)=>{

let token = req.headers.authorization;

if(!token){
return res.status(401).json({error:"No token"});
}

/* supports both token and Bearer token */
if(token.startsWith("Bearer ")){
token = token.split(" ")[1];
}

try{

const decoded = jwt.verify(token, "SECRET123");

req.user = decoded;

next();

}catch(err){

console.log("JWT Error:", err.message);

res.status(401).json({error:"Invalid token"});

}

};