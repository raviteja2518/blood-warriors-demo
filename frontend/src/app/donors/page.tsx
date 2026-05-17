"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MapPin, Calendar, Plus, Filter, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";

const initialDonors = [
  { id: "1", name: "Arjun Mehta", blood: "O+", location: "Hyderabad", state: "Telangana", age: 28, gender: "Male", lastDonation: "4 months ago", score: 95, status: "Eligible" },
  { id: "2", name: "Priya Sharma", blood: "A+", location: "Hyderabad", state: "Telangana", age: 24, gender: "Female", lastDonation: "6 months ago", score: 88, status: "Eligible" },
  { id: "3", name: "Kiran Kumar", blood: "O-", location: "Secunderabad", state: "Telangana", age: 35, gender: "Male", lastDonation: "2 months ago", score: 72, status: "Ineligible" },
  { id: "4", name: "Suresh Raina", blood: "B+", location: "Gachibowli", state: "Telangana", age: 32, gender: "Male", lastDonation: "Never", score: 80, status: "Eligible" },
  { id: "5", name: "Ananya Rao", blood: "AB+", location: "Banjara Hills", state: "Telangana", age: 29, gender: "Female", lastDonation: "1 year ago", score: 92, status: "Eligible" },
  { id: "6", name: "Vikram Singh", blood: "O+", location: "Lucknow", state: "Uttar Pradesh", age: 41, gender: "Male", lastDonation: "8 months ago", score: 85, status: "Eligible" },
  { id: "7", name: "Sneha Gupta", blood: "O+", location: "Noida", state: "Uttar Pradesh", age: 22, gender: "Female", lastDonation: "2 months ago", score: 94, status: "Eligible" },
];

export default function DonorsPage() {
  const [donors, setDonors] = useState<any[]>([]);
  const [filterBlood, setFilterBlood] = useState("All");
  const [filterState, setFilterState] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("blood_warriors_donors");
    if (saved) {
      setDonors(JSON.parse(saved));
    } else {
      setDonors(initialDonors);
      localStorage.setItem("blood_warriors_donors", JSON.stringify(initialDonors));
    }
  }, []);

  const handleAddDonor = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    
    const newDonor = {
      id: Date.now().toString(),
      name: (formData.get("donorName") as string) || "New Donor",
      blood: (formData.get("bloodGroup") as string) || "O+", 
      location: (formData.get("city") as string) || "Hyderabad",
      state: (formData.get("state") as string) || "Telangana",
      age: parseInt(formData.get("age") as string) || 25,
      gender: (formData.get("gender") as string) || "Male",
      lastDonation: "Never",
      score: 85,
      status: "Eligible"
    };
    
    const updated = [newDonor, ...donors];
    setDonors(updated);
    localStorage.setItem("blood_warriors_donors", JSON.stringify(updated));
    setIsDialogOpen(false);
  };

  const filteredDonors = donors.filter(d => 
    (filterBlood === "All" || d.blood === filterBlood) &&
    (filterState === "All" || d.state === filterState) &&
    (d.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Donor Network</h1>
            <p className="text-muted-foreground">Manage and track voluntary donors across India.</p>
          </div>
          <div className="flex gap-4">
             <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger 
                  render={
                    <Button className="gap-2">
                        <Plus className="w-4 h-4" />
                        Add New Donor
                    </Button>
                  }
                />
                <DialogContent className="sm:max-w-[500px]">
                    <form onSubmit={handleAddDonor}>
                        <DialogHeader>
                            <DialogTitle>Register New Donor</DialogTitle>
                            <DialogDescription>Add a voluntary donor to the Blood Warriors network.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Full Name</Label>
                                    <Input name="donorName" placeholder="e.g. Rahul Singh" required />
                                </div>
                                <div className="space-y-2">
                                    <Label>Blood Group</Label>
                                    <Select name="bloodGroup" required>
                                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                                        <SelectContent>
                                            {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Age</Label>
                                    <Input name="age" type="number" placeholder="25" required />
                                </div>
                                <div className="space-y-2">
                                    <Label>Gender</Label>
                                    <Select name="gender" required>
                                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Male">Male</SelectItem>
                                            <SelectItem value="Female">Female</SelectItem>
                                            <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>State</Label>
                                    <Input name="state" placeholder="e.g. Telangana" required />
                                </div>
                                <div className="space-y-2">
                                    <Label>City</Label>
                                    <Input name="city" placeholder="e.g. Hyderabad" required />
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" className="w-full">Register Donor</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
             </Dialog>
          </div>
        </div>

        {/* Filters Bar */}
        <Card className="border-none shadow-sm bg-card/50">
            <CardContent className="p-4 flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs font-bold uppercase text-muted-foreground">Filters:</span>
                </div>
                
                <div className="flex items-center gap-2">
                    <Label className="text-xs">Blood Group</Label>
                    <Select onValueChange={setFilterBlood} defaultValue="All">
                        <SelectTrigger className="w-[100px] h-8 text-xs">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All Types</SelectItem>
                            {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-2">
                    <Label className="text-xs">State</Label>
                    <Select onValueChange={setFilterState} defaultValue="All">
                        <SelectTrigger className="w-[140px] h-8 text-xs">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All States</SelectItem>
                            <SelectItem value="Telangana">Telangana</SelectItem>
                            <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                            <SelectItem value="Delhi">Delhi</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="ml-auto relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search by name..." 
                      className="pl-10 h-8 text-xs" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Global Donor Registry</CardTitle>
            <CardDescription>Comprehensive database of {filteredDonors.length} active donors.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Donor Info</TableHead>
                  <TableHead>Demographics</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Last Donation</TableHead>
                  <TableHead>AI Score</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDonors.map((donor) => (
                  <TableRow key={donor.id} className="group cursor-pointer">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border-2 border-background shadow-sm">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                            {donor.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="font-bold text-sm">{donor.name}</span>
                            <Badge variant="outline" className="w-fit text-[10px] h-4 bg-destructive/5 text-destructive border-destructive/20 font-bold">
                                {donor.blood}
                            </Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-medium">{donor.gender}</span>
                        <span className="text-[10px] text-muted-foreground uppercase font-bold">{donor.age} Years</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1 text-xs font-medium">
                            <MapPin className="w-3 h-3 text-muted-foreground" />
                            {donor.location}
                        </div>
                        <span className="text-[10px] text-muted-foreground uppercase font-bold">{donor.state}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-xs">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        {donor.lastDonation}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
                           <div 
                            className="h-full bg-primary" 
                            style={{ width: `${donor.score}%` }}
                           />
                        </div>
                        <span className="text-xs font-bold">{donor.score}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={donor.status === "Eligible" ? "secondary" : "outline"} className={donor.status === "Eligible" ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-50 text-[10px]" : "text-[10px]"}>
                        {donor.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
