"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Languages, 
  Clock, 
  CheckCheck, 
  User,
  ArrowUpRight
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const outreachLogs = [
  { 
    id: "1", 
    donor: "Arjun Mehta", 
    language: "Telugu", 
    message: "నమస్తే అర్జున్ గారు, అపోలో హాస్పిటల్‌లో ఒక రోగికి అత్యవసరంగా O+ రక్తం అవసరం. మీరు సహాయం చేయగలరా?", 
    status: "Read", 
    time: "10m ago" 
  },
  { 
    id: "2", 
    donor: "Priya Sharma", 
    language: "Hindi", 
    message: "नमस्ते प्रिया, फोर्टिस अस्पताल में एक आपातकालीन आवश्यकता है। क्या आप आज रक्तदान के लिए उपलब्ध हैं?", 
    status: "Replied (Yes)", 
    time: "25m ago" 
  },
  { 
    id: "3", 
    donor: "Suresh Raina", 
    language: "English", 
    message: "Hi Suresh, an urgent request has been matched to your profile for A+ blood. Please let us know if you can assist.", 
    status: "Delivered", 
    time: "1h ago" 
  },
];

export default function OutreachPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Outreach Logs</h1>
          <p className="text-muted-foreground">Monitor automated communications and donor interactions.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-none shadow-sm bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Messages Sent</p>
                  <p className="text-3xl font-bold">142</p>
                </div>
                <MessageSquare className="w-8 h-8 text-primary opacity-20" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm bg-emerald-50/50 dark:bg-emerald-950/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Response Rate</p>
                  <p className="text-3xl font-bold">84%</p>
                </div>
                <CheckCheck className="w-8 h-8 text-emerald-500 opacity-20" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm bg-indigo-50/50 dark:bg-indigo-950/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Languages Used</p>
                  <p className="text-3xl font-bold">8+</p>
                </div>
                <Languages className="w-8 h-8 text-indigo-500 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Recent Communications</CardTitle>
            <CardDescription>Live feed of AI-generated donor engagement.</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-6">
                {outreachLogs.map((log) => (
                  <div key={log.id} className="group relative flex flex-col gap-3 p-4 rounded-xl border bg-card/50 hover:bg-secondary/50 transition-all">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="bg-muted p-1.5 rounded-md">
                          <User className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <span className="font-bold text-sm">{log.donor}</span>
                        <Badge variant="outline" className="text-[10px] uppercase px-1.5">
                          {log.language}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {log.time}
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 p-3 rounded-lg italic text-sm text-slate-700 dark:text-slate-300 border-l-4 border-primary/20">
                      "{log.message}"
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          log.status.includes("Replied") ? "bg-emerald-500" : "bg-blue-400"
                        )} />
                        <span className="text-xs font-medium uppercase tracking-wider">{log.status}</span>
                      </div>
                      <button className="text-xs text-primary font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        View Chat <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
