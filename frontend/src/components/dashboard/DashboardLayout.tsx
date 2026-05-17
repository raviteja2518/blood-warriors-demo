"use client";

import React from "react";
import { 
  Droplets, 
  LayoutDashboard, 
  Users, 
  Activity, 
  Settings, 
  MessageSquare,
  Bell,
  Search,
  Plus
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Droplets, label: "Live Bridge", href: "/bridge" },
  { icon: Users, label: "Donors", href: "/donors" },
  { icon: MessageSquare, label: "Outreach", href: "/outreach" },
  { icon: Activity, label: "Impact Stats", href: "/stats" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-destructive/10 p-2 rounded-lg">
            <Droplets className="text-destructive w-6 h-6" />
          </div>
          <span className="font-bold text-xl tracking-tight">Blood Warriors</span>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium",
                pathname === item.href
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t space-y-4">
          <div className="flex items-center gap-3 px-3 py-2">
            <Avatar className="h-9 w-9 border">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>BW</AvatarFallback>
            </Avatar>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-semibold truncate">Coordinator Alpha</span>
              <span className="text-xs text-muted-foreground truncate">Admin Panel</span>
            </div>
          </div>
          <Button variant="outline" className="w-full justify-start gap-2 h-9 text-xs">
            <Settings className="w-3 h-3" />
            Settings
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Nav */}
        <header className="h-16 border-b bg-card flex items-center justify-between px-8">
          <div className="flex items-center gap-4 w-1/3">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search donors, patients, or requests..." 
                className="pl-10 h-9 bg-muted/50 border-none focus-visible:ring-1"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/requests/new">
              <Button size="sm" className="gap-2 shadow-sm">
                <Plus className="w-4 h-4" />
                New Request
              </Button>
            </Link>
            <div className="h-4 w-[1px] bg-border" />
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-card" />
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}
