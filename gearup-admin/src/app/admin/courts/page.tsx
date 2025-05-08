"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Plus, Search, Edit, Trash, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddCourtDialog } from "@/components/add-court-dialog"
import { toast } from "@/components/ui/use-toast"

// Mock data for courts
const initialCourts = [
    {
        id: 1,
        name: "Court 1",
        type: "Indoor",
        size: "5-a-side",
        hourlyRate: 50,
        status: "Available",
        bookingsToday: 5,
        image: "/placeholder.svg?height=40&width=40",
        logo: null,
    },
    {
        id: 2,
        name: "Court 2",
        type: "Indoor",
        size: "5-a-side",
        hourlyRate: 50,
        status: "Available",
        bookingsToday: 3,
        image: "/placeholder.svg?height=40&width=40",
        logo: null,
    },
    {
        id: 3,
        name: "Court 3",
        type: "Indoor",
        size: "7-a-side",
        hourlyRate: 70,
        status: "Maintenance",
        bookingsToday: 0,
        image: "/placeholder.svg?height=40&width=40",
        logo: null,
    },
    {
        id: 4,
        name: "Court 4",
        type: "Outdoor",
        size: "5-a-side",
        hourlyRate: 40,
        status: "Available",
        bookingsToday: 4,
        image: "/placeholder.svg?height=40&width=40",
        logo: null,
    },
    {
        id: 5,
        name: "Court 5",
        type: "Outdoor",
        size: "7-a-side",
        hourlyRate: 60,
        status: "Available",
        bookingsToday: 2,
        image: "/placeholder.svg?height=40&width=40",
        logo: null,
    },
]

// Mock data for court statistics
const courtStats = [
    {
        id: 1,
        name: "Court 1",
        totalBookings: 145,
        revenue: 7250,
        utilization: 78,
        popularTime: "7:00 PM - 9:00 PM",
        averageDuration: 1.5,
    },
    {
        id: 2,
        name: "Court 2",
        totalBookings: 132,
        revenue: 6600,
        utilization: 72,
        popularTime: "6:00 PM - 8:00 PM",
        averageDuration: 1.2,
    },
    {
        id: 3,
        name: "Court 3",
        totalBookings: 98,
        revenue: 6860,
        utilization: 65,
        popularTime: "8:00 PM - 10:00 PM",
        averageDuration: 1.8,
    },
    {
        id: 4,
        name: "Court 4",
        totalBookings: 110,
        revenue: 4400,
        utilization: 70,
        popularTime: "5:00 PM - 7:00 PM",
        averageDuration: 1.3,
    },
    {
        id: 5,
        name: "Court 5",
        totalBookings: 85,
        revenue: 5100,
        utilization: 62,
        popularTime: "7:00 PM - 9:00 PM",
        averageDuration: 1.5,
    },
]

export default function CourtsPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [activeTab, setActiveTab] = useState("courts")
    const [courts, setCourts] = useState(initialCourts)
    const [isAddCourtOpen, setIsAddCourtOpen] = useState(false)

    const filteredCourts = courts.filter(
        (court) =>
            court.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            court.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            court.size.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "available":
                return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
            case "booked":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
            case "maintenance":
                return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
        }
    }

    const handleAddCourt = (newCourt: any) => {
        setCourts([...courts, newCourt])
    }

    const handleDeleteCourt = (id: number) => {
        // Check if court has bookings today
        const court = courts.find((c) => c.id === id)
        if (court && court.bookingsToday > 0) {
            toast({
                title: "Cannot delete court",
                description: `${court.name} has ${court.bookingsToday} bookings today and cannot be deleted.`,
                variant: "destructive",
            })
            return
        }

        // Confirm deletion
        if (confirm(`Are you sure you want to delete this court?`)) {
            setCourts(courts.filter((court) => court.id !== id))
            toast({
                title: "Court deleted",
                description: "The court has been deleted successfully.",
                variant: "default",
            })
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Courts</h1>
                    <p className="text-muted-foreground">Manage your futsal courts and view statistics</p>
                </div>
                <Button className="w-full md:w-auto" onClick={() => setIsAddCourtOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Court
                </Button>
            </div>

            <Tabs defaultValue="courts" onValueChange={setActiveTab} className="space-y-6">
                <TabsList>
                    <TabsTrigger value="courts">Courts</TabsTrigger>
                    <TabsTrigger value="statistics">Court Statistics</TabsTrigger>
                </TabsList>

                <TabsContent value="courts">
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div>
                                    <CardTitle>All Courts</CardTitle>
                                    <CardDescription>A list of all futsal courts including their status and details</CardDescription>
                                </div>
                                <div className="relative w-full md:w-64">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Search courts..."
                                        className="pl-8 w-full"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Court</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Size</TableHead>
                                            <TableHead>Hourly Rate</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Bookings Today</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredCourts.length > 0 ? (
                                            filteredCourts.map((court) => (
                                                <TableRow key={court.id}>
                                                    <TableCell className="font-medium">
                                                        <div className="flex items-center gap-2">
                                                            <img
                                                                src={court.image || "/placeholder.svg"}
                                                                alt={court.name}
                                                                className="rounded w-8 h-8 object-cover"
                                                            />
                                                            <div className="flex flex-col">
                                                                {court.name}
                                                                {court.logo && <span className="text-xs text-muted-foreground">Has custom logo</span>}
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>{court.type}</TableCell>
                                                    <TableCell>{court.size}</TableCell>
                                                    <TableCell>${court.hourlyRate}/hr</TableCell>
                                                    <TableCell>
                                                        <Badge className={getStatusColor(court.status)} variant="outline">
                                                            {court.status}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-1">
                                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                                            {court.bookingsToday}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon">
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                    <span className="sr-only">Open menu</span>
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem>
                                                                    <Edit className="mr-2 h-4 w-4" />
                                                                    Edit
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    <Calendar className="mr-2 h-4 w-4" />
                                                                    View Schedule
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem
                                                                    onClick={() => handleDeleteCourt(court.id)}
                                                                    className="text-red-600 focus:text-red-600"
                                                                >
                                                                    <Trash className="mr-2 h-4 w-4" />
                                                                    Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                                                    No courts found matching your search criteria.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="statistics">
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div>
                                    <CardTitle>Court Statistics</CardTitle>
                                    <CardDescription>Performance metrics for each court</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Court</TableHead>
                                            <TableHead>Total Bookings</TableHead>
                                            <TableHead>Revenue</TableHead>
                                            <TableHead>Utilization</TableHead>
                                            <TableHead>Popular Time</TableHead>
                                            <TableHead>Avg. Duration (hrs)</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {courtStats.map((stat) => (
                                            <TableRow key={stat.id}>
                                                <TableCell className="font-medium">{stat.name}</TableCell>
                                                <TableCell>{stat.totalBookings}</TableCell>
                                                <TableCell>${stat.revenue.toLocaleString()}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                            <div
                                                                className="bg-primary h-2.5 rounded-full"
                                                                style={{ width: `${stat.utilization}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="text-xs">{stat.utilization}%</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{stat.popularTime}</TableCell>
                                                <TableCell>{stat.averageDuration} hrs</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <AddCourtDialog open={isAddCourtOpen} onOpenChange={setIsAddCourtOpen} onCourtAdded={handleAddCourt} />
        </div>
    )
}
