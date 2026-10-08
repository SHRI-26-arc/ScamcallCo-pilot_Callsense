from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="AI Scam Detection - Member 3")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Request(BaseModel):
    text: str

# All 8 scam tactics
def detect_scam(text: str):
    t = text.lower()
    tactics = []

    if any(x in t for x in ["bank", "rbi", "police", "cbi", "officer", "government"]):
        tactics.append("Fake Authority")
    if any(x in t for x in ["immediately", "urgent", "right now", "within 24 hours"]):
        tactics.append("Urgency")
    if any(x in t for x in ["transfer", "pay", "send money", "₹", "upi", "account"]):
        tactics.append("Money Request")
    if any(x in t for x in ["don't tell", "secret", "confidential"]):
        tactics.append("Secrecy")
    if any(x in t for x in ["arrest", "jail", "illegal", "blocked", "frozen"]):
        tactics.append("Threats")
    if any(x in t for x in ["don't hang up", "stay on call"]):
        tactics.append("Isolation")
    if any(x in t for x in ["otp", "password", "pin", "cvv"]):
        tactics.append("OTP/Password Request")
    if any(x in t for x in ["kyc", "suspended", "verification failed"]):
        tactics.append("Fake Bank Claims")

    score = min(95, len(tactics) * 25 + 10) if tactics else 10
    risk = "HIGH" if score >= 70 else "MEDIUM" if score >= 35 else "LOW"

    return {
        "risk": risk,
        "score": score,
        "tactics": tactics,
        "explanation": f"The caller is using {', '.join(tactics)} to pressure the victim." if tactics else "No scam pattern found",
        "action": "Hang up and call 1930." if risk == "HIGH" else "Verify with official number."
    }

@app.post("/analyze")
def analyze(req: Request):
    return detect_scam(req.text)

@app.get("/")
def home():
    return {"status": "Member 3 AI Running - Ready"}