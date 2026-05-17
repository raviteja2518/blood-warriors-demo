"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Droplets, MapPin, Hospital, Calendar, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewRequestPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const patientName = formData.get("patientName") as string;
    const bloodType = formData.get("bloodType") as string;
    
    setLoading(true);
    // Simulate API call to FastAPI
    setTimeout(() => {
      setLoading(false);
      router.push(`/bridge?name=${encodeURIComponent(patientName)}&blood=${encodeURIComponent(bloodType)}`);
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">New Patient Request</h1>
          <p className="text-muted-foreground">Initiate the AI-driven matching process for a patient in need.</p>
        </div>

        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle>Request Details</CardTitle>
            <CardDescription>Enter the patient's transfusion requirements.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patientName">Patient Name</Label>
                  <Input id="patientName" name="patientName" placeholder="e.g. Rahul Sharma" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bloodType">Blood Type Required</Label>
                  <Select name="bloodType" defaultValue="O+">
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hospital">Hospital / Medical Center</Label>
                <div className="relative">
                  <Hospital className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="hospital" name="hospital" className="pl-10" placeholder="e.g. Apollo Hospital, Hyderabad" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="urgency">Urgency Level</Label>
                  <Select name="urgency" defaultValue="High">
                    <SelectTrigger>
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Critical">Critical (Immediate)</SelectItem>
                      <SelectItem value="High">High (Within 6h)</SelectItem>
                      <SelectItem value="Normal">Normal (Recurring)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Requirement Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="date" name="date" type="date" className="pl-10" defaultValue={new Date().toISOString().split('T')[0]} />
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg border border-amber-200 dark:border-amber-900 flex gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                <p className="text-xs text-amber-700 dark:text-amber-400">
                  Submitting this request will trigger the <strong>Blood Bridge AI</strong> to analyze the donor database and initiate multilingual outreach to compatible donors within a 10km radius.
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="button" variant="outline" className="flex-1" onClick={() => router.back()}>Cancel</Button>
                <Button type="submit" className="flex-1 gap-2" disabled={loading}>
                  {loading ? "Processing..." : "Initiate AI Bridge"}
                  <Droplets className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
