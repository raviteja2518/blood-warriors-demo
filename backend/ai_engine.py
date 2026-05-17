import os
import google.generativeai as genai
from typing import List, Dict
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini
# In a real app, you'd use os.getenv("GOOGLE_API_KEY")
# For the demo, we will handle the key safely or use a mock if not provided
GENAI_API_KEY = os.getenv("GOOGLE_API_KEY", "MOCK_KEY")
if GENAI_API_KEY != "MOCK_KEY":
    genai.configure(api_key=GENAI_API_KEY)

# Mock Donor Database
MOCK_DONORS = [
    {"id": "d1", "name": "Arjun Mehta", "blood_type": "O+", "location": "Hyderabad", "state": "Telangana", "age": 28, "gender": "Male", "distance": 1.2, "last_donation": "4 months ago", "willingness_score": 95, "languages": ["English", "Hindi", "Telugu"]},
    {"id": "d2", "name": "Priya Sharma", "blood_type": "O+", "location": "Hyderabad", "state": "Telangana", "age": 24, "gender": "Female", "distance": 2.5, "last_donation": "6 months ago", "willingness_score": 88, "languages": ["English", "Hindi"]},
    {"id": "d3", "name": "Kiran Kumar", "blood_type": "O+", "location": "Hyderabad", "state": "Telangana", "age": 35, "gender": "Male", "distance": 5.8, "last_donation": "3 months ago", "willingness_score": 92, "languages": ["Telugu", "Hindi"]},
    {"id": "d4", "name": "Suresh Raina", "blood_type": "B-", "location": "Delhi", "state": "Delhi", "age": 32, "gender": "Male", "distance": 2.1, "last_donation": "5 months ago", "willingness_score": 80, "languages": ["Hindi", "English"]},
    {"id": "d5", "name": "Ananya Rao", "blood_type": "O+", "location": "Hyderabad", "state": "Telangana", "age": 29, "gender": "Female", "distance": 3.1, "last_donation": "1 year ago", "willingness_score": 90, "languages": ["Telugu", "English"]},
    {"id": "d6", "name": "Vikram Singh", "blood_type": "O+", "location": "Hyderabad", "state": "Telangana", "age": 41, "gender": "Male", "distance": 4.5, "last_donation": "8 months ago", "willingness_score": 85, "languages": ["Hindi", "Punjabi"]},
    {"id": "d7", "name": "Sneha Gupta", "blood_type": "O+", "location": "Secunderabad", "state": "Telangana", "age": 22, "gender": "Female", "distance": 6.2, "last_donation": "2 months ago", "willingness_score": 94, "languages": ["Hindi", "English"]},
]

class BloodBridgeAI:
    def __init__(self):
        self.model = genai.GenerativeModel('gemini-1.5-flash') if GENAI_API_KEY != "MOCK_KEY" else None

    async def get_matches(self, blood_type: str, location: str) -> List[Dict]:
        """
        Logic to filter and rank donors.
        Returns the Top 5 matches.
        """
        matches = [d for d in MOCK_DONORS if d["blood_type"] == blood_type]
        # Sort by distance and willingness
        matches.sort(key=lambda x: (x["distance"], -x["willingness_score"]))
        return matches[:5]

    async def generate_outreach_message(self, donor_name: str, patient_name: str, hospital: str, language: str) -> str:
        """
        Use Gemini to generate a personalized, urgent message in the specified language.
        """
        if not self.model:
            # Fallback mock messages
            messages = {
                "Hindi": f"नमस्ते {donor_name}, {patient_name} को {hospital} में रक्त की तत्काल आवश्यकता है। क्या आप मदद कर सकते हैं?",
                "Telugu": f"నమస్తే {donor_name}, {hospital}లో {patient_name}కు అత్యవసరంగా రక్తం కావాలి. మీరు సహాయం చేయగలరా?",
                "English": f"Hi {donor_name}, {patient_name} urgently needs blood at {hospital}. Can you help?"
            }
            return messages.get(language, messages["English"])

        prompt = f"""
        Draft a short, urgent, and respectful WhatsApp message for a blood donor.
        Donor Name: {donor_name}
        Patient Name: {patient_name}
        Hospital: {hospital}
        Language: {language}
        The tone should be human, responsive, and encouraging. Use local cultural nuances if appropriate.
        """
        response = self.model.generate_content(prompt)
        return response.text.strip()
