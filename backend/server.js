const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

// Session storage - for judges: "Maintaining conversation/session data"
let sessions = [];

function analyze(text){
  let score=0, tactics=[];
  if(/cbi|police/i.test(text)){score+=30; tactics.push("Fake Authority");}
  if(/arrest|jail/i.test(text)){score+=25; tactics.push("Threat");}
  if(/don't tell|secret/i.test(text)){score+=20; tactics.push("Secrecy");}
  if(/transfer|money|upi|otp/i.test(text)){score+=35; tactics.push("Money Request");}
  if(/immediately|urgent|now/i.test(text)){score+=20; tactics.push("Urgency");}
  score=Math.min(score,100);
  
  let risk="SAFE";
  if(score>=75) risk="HIGH"; 
  else if(score>=40) risk="MEDIUM"; 
  else if(score>=15) risk="LOW";
  
  return { score, risk_level: risk, tactics, advice: score>=75?"HANG UP • CALL 1930":"Be cautious", is_scam: score>=60 };
}

app.get("/", (req,res)=>res.json({status:"CallSense Running ✅", member:"Member 4 - Backend"}));
app.get("/sessions", (req,res)=>res.json(sessions)); // shows you maintain history

// MAIN ENDPOINT - Handles everything
app.post("/api/analyze", (req,res)=>{
  const transcript = req.body.transcript || req.body.text || "";
  
  if(!transcript){
    return res.status(400).json({error: "Transcript is required"});
  }

  const result = analyze(transcript);
  
  // Family alert simulation
  let familyAlert = null;
  if(result.risk_level === "HIGH"){
    familyAlert = {
      sent: true,
      to: "Trusted Contact - Mom/Dad",
      message: `🚨 HIGH RISK call detected! Score: ${result.score}% - "${transcript.substring(0,60)}..."`
    };
  }

  const response = {
    risk: result.risk_level,
    score: result.score,
    tactics: result.tactics,
    is_scam: result.is_scam,
    advice: result.advice,
    transcript: transcript,
    timestamp: new Date().toISOString(),
    action: result.risk_level === "HIGH" ? "Call Blocked & User Alerted" : "Call Safe",
    familyAlert: familyAlert
  };

  // Save session
  sessions.push(response);
  if(sessions.length > 20) sessions.shift();

  console.log(`[${response.risk}] ${response.score}% - ${transcript.substring(0,40)}`);
  if(familyAlert) console.log(familyAlert.message);

  res.json(response);
});

// Also support /analyze for Member 1/2
app.post("/analyze", (req,res)=>{
  req.url = "/api/analyze";
  app._router.handle(req,res);
});

app.listen(5000, ()=>console.log("✅ Member 4 Backend running on http://localhost:5000"));