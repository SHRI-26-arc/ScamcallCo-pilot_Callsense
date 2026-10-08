const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

function analyze(text){
  let score=0, tactics=[];
  if(/cbi|police/i.test(text)){score+=30; tactics.push("Fake Authority");}
  if(/arrest|jail/i.test(text)){score+=25; tactics.push("Threat");}
  if(/don't tell|secret/i.test(text)){score+=20; tactics.push("Secrecy");}
  if(/transfer|money|upi/i.test(text)){score+=35; tactics.push("Money Request");}
  if(/immediately|urgent/i.test(text)){score+=20; tactics.push("Urgency");}
  score=Math.min(score,100);
  let risk="SAFE";
  if(score>=75) risk="HIGH"; else if(score>=40) risk="MEDIUM"; else if(score>=15) risk="LOW";
  return { score, risk_level: risk, tactics, advice: score>=75?"HANG UP • CALL 1930":"Be cautious", is_scam: score>=60 };
}

app.get("/", (req,res)=>res.json({status:"Callsense Running"}));
app.post("/api/analyze", (req,res)=>res.json(analyze(req.body.transcript||"")));
app.listen(5000, ()=>console.log("✅ Backend running on http://localhost:5000"));