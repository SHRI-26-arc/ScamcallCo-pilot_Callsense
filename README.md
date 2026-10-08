# 📞 ScamCall Co-Pilot - CallSense
### Your Second Ear Against Phone Scams

🔴 **Live App:** https://shri-26-arc.github.io/ScamcallCo-pilot_Callsense/
💻 **GitHub:** https://github.com/shri-26-arc/ScamcallCo-pilot_Callsense

## 📝 About The Project
CallSense is an AI-powered Co-Pilot that detects scam calls in real-time. Unlike Truecaller which only shows caller name, CallSense understands *what* the caller is saying.

It listens, transcribes live calls, and instantly warns you with a Scam Risk Score if it detects fraud patterns like "OTP share", "Bank blocked", "Urgent money needed".

Specially designed for elders and vulnerable users.

## ✨ Key Features
- 🎙️ Real-time Call Transcription
- 🚨 Live Scam Risk Score (0-100%)
- 🔍 Keyword Flagging (OTP, Bank, Police case etc.)
- 📊 Risk Dashboard - Call History & Analysis
- 🔒 Privacy-First - No call stored on server

## 🛠️ Tech Stack
- Frontend: React.js + Vite
- Styling: CSS3
- Deployment: GitHub Pages
- Logic: JavaScript + NLP Pattern Matching (Prototype)

## 📂 Project Structure
/src
    - assets/
    - App.jsx (Main logic)
    - App.css
    - main.jsx
    - member2-dashboard.html (Risk Dashboard)

## 🗄️ Database
**Current Prototype:** No external database used. Uses Mock Data / Local State for demo to keep it lightweight and private.

**Future Production:** Firebase + MongoDB for user history, community reported scam numbers, and integration with 1930 Cyber Crime & TRAI database.

## 🚀 Prototype Status
This is a functional MVP / Prototype. The live link demonstrates working UI and scam-detection flow with simulated data.

### Future Advancements to Make it Production-Ready:
1.  **Advanced AI:** LLM fine-tuned on 10k+ Indian scam calls, Voice Cloning Detection
2.  **Multi-Language:** Hindi, Kannada, Tamil, Telugu, Hinglish support
3.  **Mobile App:** Android app with background call listening
4.  **Safety:** Auto-report to 1930 portal + PDF evidence generator for police
5.  **Family Shield:** Alert family if parents get scam call

## 👥 Team
- Member 2: Risk Dashboard Done

## ▶️ How to Run Locally
```bash
npm install
npm run dev
