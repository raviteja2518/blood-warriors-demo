const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function matchDonors(payload: {
  blood_type: string;
  location: string;
  patient_name: string;
  hospital: string;
}) {
  const response = await fetch(`${API_BASE_URL}/match`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return response.json();
}

export async function generateOutreach(payload: {
  donor_name: string;
  patient_name: string;
  hospital: string;
  language: string;
}) {
  const response = await fetch(`${API_BASE_URL}/outreach`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return response.json();
}
