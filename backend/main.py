from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from pydantic import BaseModel
from typing import List, Optional
from ai_engine import BloodBridgeAI

app = FastAPI(title="Blood Warriors AI API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ai = BloodBridgeAI()

class MatchRequest(BaseModel):
    blood_type: str
    location: str
    patient_name: str
    hospital: str

class OutreachRequest(BaseModel):
    donor_name: str
    patient_name: str
    hospital: str
    language: str

@app.get("/")
async def root():
    return {"message": "Welcome to Blood Warriors AI API", "status": "online"}

@app.post("/match")
async def match_donors(request: MatchRequest):
    try:
        matches = await ai.get_matches(request.blood_type, request.location)
        return {
            "status": "success",
            "patient": request.patient_name,
            "matches": matches
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/outreach")
async def generate_message(request: OutreachRequest):
    try:
        message = await ai.generate_outreach_message(
            request.donor_name, 
            request.patient_name, 
            request.hospital, 
            request.language
        )
        return {
            "status": "success",
            "message": message
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
