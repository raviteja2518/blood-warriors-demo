"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Droplets, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  MessageSquare,
  Users,
  Brain,
  MapPin
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

import { useSearchParams } from "next/navigation";

export default function LiveBridge() {
  const searchParams = useSearchParams();
  const patientName = searchParams.get("name") || "Rahul S.";
  const patientBlood = searchParams.get("blood") || "O+";
  
  const [step, setStep] = useState(0); // 0: Idle, 1: Searching, 2: Found, 3: Notifying, 4: Confirmed
  const [progress, setProgress] = useState(0);
  const [matchingDonors, setMatchingDonors] = useState<any[]>([]);

  useEffect(() => {
    // Load and filter donors
    const saved = localStorage.getItem("blood_warriors_donors");
    let pool = saved ? JSON.parse(saved) : [];
    
    // Filter by exact blood match
    let matches = pool.filter((d: any) => d.blood === patientBlood);
    
    // If no matches in our custom list, use a default set for the demo visualization
    if (matches.length === 0) {
      matches = [
        { id: "d1", name: "System Match 1", blood: patientBlood, dist: "1.2km", status: "Available", language: "English" },
        { id: "d2", name: "System Match 2", blood: patientBlood, dist: "2.5km", status: "Available", language: "Hindi" },
      ];
    }
    
    setMatchingDonors(matches.slice(0, 5));
  }, [patientBlood]);

  const startSimulation = () => {
    setStep(1);
    setProgress(0);
  };

  useEffect(() => {
    if (step === 1) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setStep(2);
            clearInterval(interval);
            return 100;
          }
          return prev + 5;
        });
      }, 100);
      return () => clearInterval(interval);
    }
    if (step === 2) {
      setTimeout(() => setStep(3), 2000);
    }
    if (step === 3) {
      setTimeout(() => setStep(4), 4000);
    }
  }, [step]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Active Blood Bridge</h2>
          <p className="text-sm text-muted-foreground">Scenario: {patientName} ({patientBlood}) at Apollo Hospital</p>
        </div>
        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
          AI Monitoring Active
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        {/* Visualization Area */}
        <Card className="md:col-span-8 border-none shadow-lg overflow-hidden bg-slate-950 text-white min-h-[500px] relative">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          
          <CardHeader className="relative z-10">
            <CardTitle className="text-slate-200 flex items-center gap-2 text-sm uppercase tracking-widest">
              <MapPin className="w-4 h-4 text-destructive" />
              Real-time Geospatial Matching
            </CardTitle>
          </CardHeader>

          <CardContent className="relative h-[400px] flex items-center justify-center">
            {/* Digital Grid Background */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={step > 0 ? { opacity: 0.1 } : { opacity: 0 }}
              className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
            />

            {/* Mock Map / Radar */}
            <div className="relative w-80 h-80 flex items-center justify-center">
              {/* Pulse Rings */}
              <motion.div 
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute w-full h-full border border-primary/30 rounded-full" 
              />
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute w-3/4 h-3/4 border border-primary/40 rounded-full" 
              />
              
              {/* Sonar Ripple */}
              {step === 1 && (
                <motion.div 
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 4, opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  className="absolute w-20 h-20 border-2 border-primary rounded-full"
                />
              )}

              {/* Patient Hub */}
              <div className="relative z-20 bg-destructive p-4 rounded-full shadow-[0_0_30px_rgba(239,68,68,0.5)]">
                <Droplets className="w-8 h-8 text-white" />
              </div>

              {/* Donor Points and Connection Beams */}
              <AnimatePresence>
                {(step >= 2) && (
                  <>
                    {matchingDonors.map((d, i) => {
                      // Mock positions for the 5 points
                      const positions = [
                        "top-0 right-10",
                        "bottom-10 left-0",
                        "top-5 right-40",
                        "bottom-20 right-5",
                        "top-20 left-10"
                      ];
                      return (
                        <React.Fragment key={d.id}>
                          {/* Connection Beam */}
                          <motion.div 
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "100px", opacity: 0.3 }}
                            transition={{ delay: i * 0.3 }}
                            className={cn(
                              "absolute h-[1px] bg-gradient-to-r from-primary to-transparent origin-left z-10",
                              i === 0 && "rotate-[-45deg] top-1/2 left-1/2",
                              i === 1 && "rotate-[135deg] top-1/2 left-1/2",
                              i === 2 && "rotate-[-10deg] top-1/2 left-1/2",
                              i === 3 && "rotate-[45deg] top-1/2 left-1/2",
                              i === 4 && "rotate-[200deg] top-1/2 left-1/2"
                            )}
                          />
                          <motion.div 
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.3 }}
                            className={cn("absolute flex flex-col items-center gap-1", positions[i])}
                          >
                            <div className={cn(
                              "w-3 h-3 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]",
                              i < 2 ? "bg-emerald-500" : "bg-blue-500"
                            )} />
                            <span className="text-[10px] font-bold text-white bg-black/50 px-1 rounded">
                              {d.name.split(' ')[0]} ({d.dist || "2.5km"})
                            </span>
                          </motion.div>
                        </React.Fragment>
                      );
                    })}
                  </>
                )}
              </AnimatePresence>

              {/* Scanning Line */}
              {step === 1 && (
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute w-full h-[4px] bg-gradient-to-r from-transparent via-primary to-transparent z-30 shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                />
              )}
            </div>

            {/* Status Overlay */}
            <div className="absolute bottom-8 left-0 right-0 px-8">
              <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {step === 0 && <span className="text-sm text-slate-400">Ready to initiate bridge...</span>}
                  {step === 1 && (
                    <div className="flex flex-col gap-1 w-48">
                      <span className="text-xs font-bold uppercase tracking-tighter text-primary">AI Scanning Donors</span>
                      <Progress value={progress} className="h-1 bg-slate-800" />
                    </div>
                  )}
                    {step === 2 && (
                      <div className="flex items-center gap-2 text-emerald-400">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="text-sm font-bold">{matchingDonors.length} Matching Profiles Identified</span>
                      </div>
                    )}
                  {step === 3 && (
                    <div className="flex items-center gap-2 text-blue-400">
                      <motion.div animate={{ opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity }}>
                        <MessageSquare className="w-5 h-5" />
                      </motion.div>
                      <span className="text-sm font-bold">Multilingual Outreach via WhatsApp...</span>
                    </div>
                  )}
                  {step === 4 && (
                    <div className="flex items-center gap-2 text-emerald-400">
                      <Users className="w-5 h-5" />
                      <span className="text-sm font-bold">Donor {matchingDonors[0]?.name} Confirmed!</span>
                    </div>
                  )}
                </div>
                {step === 0 && (
                  <Button onClick={startSimulation} size="sm" className="bg-primary hover:bg-primary/90 text-white border-none shadow-lg px-6">
                    Start AI Match
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Decision Panel */}
        <div className="md:col-span-4 space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Brain className="w-4 h-4 text-primary" />
                AI Priority Logic
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {matchingDonors.map((d, i) => (
                <motion.div 
                  key={d.id}
                  initial={{ x: 20, opacity: 0 }}
                  animate={step >= 2 ? { x: 0, opacity: 1 } : {}}
                  transition={{ delay: i * 0.2 }}
                  className={cn(
                    "p-3 rounded-lg border flex items-center justify-between",
                    step === 4 && i === 0 ? "bg-emerald-50 border-emerald-200" : "bg-muted/50"
                  )}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-bold">{d.name}</span>
                    <span className="text-[10px] text-muted-foreground uppercase">{d.dist || "2.1km"} • {d.language || "English"} preference</span>
                  </div>
                  {step === 4 && i === 0 ? (
                    <Badge className="bg-emerald-500 text-[10px]">ACCEPTED</Badge>
                  ) : (
                    <Badge variant="outline" className="text-[10px]">{step >= 3 ? "NOTIFIED" : "PENDING"}</Badge>
                  )}
                </motion.div>
              ))}
              {step < 2 && (
                <div className="py-8 text-center space-y-2 opacity-50">
                  <Users className="w-8 h-8 mx-auto text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Awaiting AI analysis results...</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-none shadow-md bg-destructive/5 border border-destructive/10">
            <CardHeader>
              <CardTitle className="text-xs uppercase tracking-widest text-destructive">Urgent Alert</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium">Thalassemia patient O+ve transfusion window: <span className="text-destructive font-bold">2 hours</span></p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
