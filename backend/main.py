from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Req(BaseModel):
    text: str

@app.get("/")
def home():
    return {"status": "AI Running"}

@app.post("/analyze")
def analyze(req: Req):
    t = req.text.lower()
    tactics = []
    if "bank" in t or "police" in t:
        tactics.append("Fake Authority")
    if "urgent" in t or "immediat" in t:
        tactics.append("Urgency")
    if "transfer" in t or "pay" in t:
        tactics.append("Money Request")
    if "otp" in t:
        tactics.append("OTP Request")
    score = len(tactics)*30
    if score==0:
        score=10
    if score>95:
        score=95
    risk = "HIGH" if score>=60 else "MEDIUM" if score>=30 else "LOW"
    return {"risk": risk, "score": score, "tactics": tactics}