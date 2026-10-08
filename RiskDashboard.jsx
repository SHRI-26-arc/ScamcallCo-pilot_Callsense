import { useState, useEffect } from 'react'

export default function RiskDashboard() {
  const [score, setScore] = useState(85)
  const [transcript, setTranscript] = useState("Your bank account is blocked. Transfer money immediately to avoid legal action.")
  
  const risks = [
    { label: "Urgency Tactics", value: 90, color: "bg-red-500" },
    { label: "Authority Impersonation", value: 85, color: "bg-orange-500" },
    { label: "Financial Request", value: 95, color: "bg-red-600" },
  ]

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-2">🛡️ CallSense - Risk Dashboard</h1>
      <p className="text-gray-400 mb-6">Member 2 - Real-time Scam Analysis</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Risk Score */}
        <div className="bg-gray-800 p-6 rounded-2xl border border-red-500/30">
          <h2 className="text-xl font-semibold mb-4">Risk Score</h2>
          <div className="flex items-center gap-4">
            <div className="text-6xl font-black text-red-500">{score}%</div>
            <div className="px-4 py-2 bg-red-500/20 text-red-400 rounded-full font-bold">🔴 HIGH RISK</div>
          </div>
          <div className="mt-4 w-full bg-gray-700 rounded-full h-3">
            <div className="h-3 rounded-full bg-red-500" style={{width: `${score}%`}}></div>
          </div>
        </div>

        {/* Transcript */}
        <div className="bg-gray-800 p-6 rounded-2xl">
          <h2 className="text-xl font-semibold mb-2">Live Transcript</h2>
          <p className="bg-black p-4 rounded-lg text-green-300 font-mono text-sm">"{transcript}"</p>
          <button onClick={()=>setScore(s=> s>20 ? s-5 : 95)} className="mt-4 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700">
            Simulate New Call
          </button>
        </div>
      </div>

      {/* Risk Factors */}
      <div className="mt-6 bg-gray-800 p-6 rounded-2xl">
        <h2 className="text-xl font-semibold mb-4">Detected Scam Patterns</h2>
        {risks.map(r=>(
          <div key={r.label} className="mb-3">
            <div className="flex justify-between text-sm mb-1"><span>{r.label}</span><span>{r.value}%</span></div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className={`h-2 rounded-full ${r.color}`} style={{width: `${r.value}%`}}></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-green-900/30 border border-green-500/30 rounded-xl">
        ✅ <b>Action Taken:</b> Call Blocked & User Alerted - Scam prevented!
      </div>
    </div>
  )
}