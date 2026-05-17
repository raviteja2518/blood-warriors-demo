"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Droplets, ArrowRight, Brain, Languages, MapPin, HeartPulse } from "lucide-react";

const recentRequests = [
  { id: "1", patient: "Rahul S.", blood: "O+", hospital: "Apollo, HYD", urgency: "Critical", time: "2m ago" },
  { id: "2", patient: "Sneha V.", blood: "B-", hospital: "AIIMS, DEL", urgency: "High", time: "15m ago" },
  { id: "3", patient: "Amit K.", blood: "A+", hospital: "Fortis, BLR", urgency: "Normal", time: "1h ago" },
];

export default function Home() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Overview</h1>
          <p className="text-muted-foreground">AI-enabled care coordination and resource allocation.</p>
        </div>

        <StatsOverview />

        <div className="grid gap-6 md:grid-cols-7">
          {/* Main Bridge Section */}
          <Card className="md:col-span-4 border-none shadow-md bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                Active Blood Bridge AI
              </CardTitle>
              <CardDescription>Real-time matching and automated donor outreach.</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center bg-muted/30 rounded-lg mx-6 mb-6 border-2 border-dashed">
              <div className="text-center space-y-4">
                <div className="relative inline-block">
                  <div className="absolute inset-0 animate-ping rounded-full bg-primary/20 scale-150" />
                  <div className="relative bg-primary/10 p-6 rounded-full border border-primary/20">
                    <Droplets className="w-12 h-12 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">AI Engine Standby</h3>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                    Waiting for a new request to initiate smart matching and multilingual coordination.
                  </p>
                </div>
                <Button className="gap-2">
                  Initiate Scenario Simulation
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Side Requests Panel */}
          <Card className="md:col-span-3 border-none shadow-md bg-card">
            <CardHeader>
              <CardTitle>Recent Requests</CardTitle>
              <CardDescription>Live feed from partner hospitals.</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[420px] pr-4">
                <div className="space-y-4">
                  {recentRequests.map((req) => (
                    <div key={req.id} className="p-4 rounded-xl border bg-card/50 hover:bg-secondary/50 transition-colors cursor-pointer group">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center text-destructive font-bold text-xs">
                            {req.blood}
                          </div>
                          <div>
                            <p className="text-sm font-semibold">{req.patient}</p>
                            <div className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase font-bold">
                              <MapPin className="w-3 h-3" />
                              {req.hospital}
                            </div>
                          </div>
                        </div>
                        <Badge variant={req.urgency === "Critical" ? "destructive" : "secondary"} className="text-[10px] uppercase font-bold px-1.5 h-5">
                          {req.urgency}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex gap-2">
                          <div className="p-1 rounded bg-muted text-muted-foreground" title="Multilingual Support">
                            <Languages className="w-3 h-3" />
                          </div>
                          <div className="p-1 rounded bg-muted text-muted-foreground" title="AI Priority">
                            <Brain className="w-3 h-3" />
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground italic">{req.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Feature Highlights for Idea Submission */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-none shadow-sm bg-indigo-50/50 dark:bg-indigo-950/20">
            <CardContent className="pt-6 text-center space-y-2">
              <div className="mx-auto bg-indigo-100 dark:bg-indigo-900/40 p-3 rounded-xl w-fit mb-2">
                <Languages className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h4 className="font-bold">Adaptive Interaction</h4>
              <p className="text-xs text-muted-foreground">Engages donors in 12+ Indian languages via adaptive AI models.</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm bg-emerald-50/50 dark:bg-emerald-950/20">
            <CardContent className="pt-6 text-center space-y-2">
              <div className="mx-auto bg-emerald-100 dark:bg-emerald-900/40 p-3 rounded-xl w-fit mb-2">
                <Brain className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h4 className="font-bold">Smart Prioritization</h4>
              <p className="text-xs text-muted-foreground">Predicts donor willingness and prioritizes based on historical signals.</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm bg-amber-50/50 dark:bg-amber-950/20">
            <CardContent className="pt-6 text-center space-y-2">
              <div className="mx-auto bg-amber-100 dark:bg-amber-900/40 p-3 rounded-xl w-fit mb-2">
                <HeartPulse className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h4 className="font-bold">Human-Centric Feedback</h4>
              <p className="text-xs text-muted-foreground">Builds long-term engagement through responsive feedback loops.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
