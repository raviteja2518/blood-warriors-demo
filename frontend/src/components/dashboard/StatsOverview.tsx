import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Users, HeartPulse, Clock } from "lucide-react";

const stats = [
  {
    title: "Active Requests",
    value: "12",
    description: "4 critical urgency",
    icon: Droplets,
    color: "text-destructive",
    bg: "bg-destructive/10",
  },
  {
    title: "Total Donors",
    value: "2,840",
    description: "+120 this month",
    icon: Users,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "Successful Bridges",
    value: "842",
    description: "Lives impacted",
    icon: HeartPulse,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    title: "Avg. Match Time",
    value: "18m",
    description: "AI optimized",
    icon: Clock,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
];

export function StatsOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {stat.title}
            </CardTitle>
            <div className={`${stat.bg} p-2 rounded-md`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
