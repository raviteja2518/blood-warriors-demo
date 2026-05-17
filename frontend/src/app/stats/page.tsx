"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  BarChart3, 
  TrendingUp, 
  Heart, 
  Map as MapIcon,
  Activity,
  Users
} from "lucide-react";

export default function StatsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Impact Analytics</h1>
          <p className="text-muted-foreground">Quantifying the lives touched by the Smart Blood Bridge AI.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-none shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Lives Impacted</CardTitle>
                    <Heart className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">1,248</div>
                    <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
            </Card>
            <Card className="border-none shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Donor Growth</CardTitle>
                    <Users className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+240</div>
                    <p className="text-xs text-muted-foreground">New voluntary signups</p>
                </CardContent>
            </Card>
            <Card className="border-none shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg Match Speed</CardTitle>
                    <TrendingUp className="h-4 w-4 text-emerald-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">14.2 min</div>
                    <p className="text-xs text-muted-foreground">80% faster than manual</p>
                </CardContent>
            </Card>
            <Card className="border-none shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">AI Efficiency</CardTitle>
                    <Activity className="h-4 w-4 text-amber-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">94.8%</div>
                    <p className="text-xs text-muted-foreground">Successful bridge rate</p>
                </CardContent>
            </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-none shadow-md h-[400px] flex items-center justify-center bg-card">
                <div className="text-center space-y-4 opacity-50">
                    <BarChart3 className="w-16 h-16 mx-auto text-muted-foreground" />
                    <p className="text-sm font-medium">Regional Donation Trends (Visualizing...)</p>
                </div>
            </Card>
            <Card className="border-none shadow-md h-[400px] flex items-center justify-center bg-card">
                 <div className="text-center space-y-4 opacity-50">
                    <MapIcon className="w-16 h-16 mx-auto text-muted-foreground" />
                    <p className="text-sm font-medium">Live Impact Map (Heatmap View)</p>
                </div>
            </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
