"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts"
import { ArrowUpRight, Users, Calendar, DollarSign, Clock, Layers } from "lucide-react"

export default function DashboardPage() {
    // Sample data for charts
    const bookingsData = [
        { name: "Mon", bookings: 24 },
        { name: "Tue", bookings: 18 },
        { name: "Wed", bookings: 22 },
        { name: "Thu", bookings: 26 },
        { name: "Fri", bookings: 32 },
        { name: "Sat", bookings: 38 },
        { name: "Sun", bookings: 30 },
    ]

    const revenueData = [
        { name: "Jan", revenue: 4000 },
        { name: "Feb", revenue: 3000 },
        { name: "Mar", revenue: 5000 },
        { name: "Apr", revenue: 4500 },
        { name: "May", revenue: 6000 },
        { name: "Jun", revenue: 5500 },
    ]

    const timeSlotData = [
        { name: "Morning (6-12)", value: 30 },
        { name: "Afternoon (12-5)", value: 25 },
        { name: "Evening (5-9)", value: 35 },
        { name: "Night (9-12)", value: 10 },
    ]

    const courtUsageData = [
        { name: "Court 1", bookings: 45 },
        { name: "Court 2", bookings: 38 },
        { name: "Court 3", bookings: 42 },
        { name: "Court 4", bookings: 30 },
        { name: "Court 5", bookings: 25 },
    ]

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

    const stats = [
        {
            title: "Total Bookings",
            value: "1,234",
            change: "+12%",
            icon: Calendar,
        },
        {
            title: "Revenue",
            value: "$8,567",
            change: "+8%",
            icon: DollarSign,
        },
        {
            title: "Active Users",
            value: "345",
            change: "+23%",
            icon: Users,
        },
        {
            title: "Court Utilization",
            value: "78%",
            change: "+5%",
            icon: Layers,
        },
    ]

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Overview of your futsal court bookings and performance</p>
            </div>

            {/* Stats cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <Card key={index}>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                                    <p className="text-2xl font-bold">{stat.value}</p>
                                </div>
                                <div className="rounded-full bg-primary/10 p-2">
                                    <stat.icon className="h-5 w-5 text-primary" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm text-green-500">
                                <ArrowUpRight className="mr-1 h-4 w-4" />
                                {stat.change} from last month
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Charts */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Weekly Bookings</CardTitle>
                        <CardDescription>Number of court bookings per day</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={bookingsData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="bookings" fill="#3b82f6" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Monthly Revenue</CardTitle>
                        <CardDescription>Revenue from court bookings</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={revenueData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Popular Time Slots</CardTitle>
                        <CardDescription>Distribution of bookings by time of day</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={timeSlotData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {timeSlotData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Court Usage</CardTitle>
                        <CardDescription>Number of bookings per court</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={courtUsageData} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" />
                                    <YAxis dataKey="name" type="category" width={80} />
                                    <Tooltip />
                                    <Bar dataKey="bookings" fill="#82ca9d" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Bookings</CardTitle>
                    <CardDescription>Latest court reservations</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            {
                                court: "Court 1",
                                user: "John Doe",
                                time: "Today, 6:00 PM - 7:00 PM",
                                status: "Confirmed",
                                icon: Calendar,
                            },
                            {
                                court: "Court 3",
                                user: "Jane Smith",
                                time: "Today, 7:00 PM - 8:00 PM",
                                status: "Confirmed",
                                icon: Calendar,
                            },
                            {
                                court: "Court 2",
                                user: "Robert Johnson",
                                time: "Today, 8:00 PM - 9:00 PM",
                                status: "Pending",
                                icon: Clock,
                            },
                            {
                                court: "Court 4",
                                user: "Emily Davis",
                                time: "Tomorrow, 5:00 PM - 6:00 PM",
                                status: "Confirmed",
                                icon: Calendar,
                            },
                            {
                                court: "Court 1",
                                user: "Michael Wilson",
                                time: "Tomorrow, 7:00 PM - 8:00 PM",
                                status: "Confirmed",
                                icon: Calendar,
                            },
                        ].map((booking, index) => (
                            <div key={index} className="flex items-center gap-4 border-b pb-4 last:border-0">
                                <div
                                    className={`rounded-full p-2 ${
                                        booking.status === "Confirmed" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"
                                    }`}
                                >
                                    <booking.icon className="h-4 w-4" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <p className="text-sm font-medium">
                                            {booking.court} • {booking.user}
                                        </p>
                                        <span
                                            className={`text-xs px-2 py-1 rounded-full ${
                                                booking.status === "Confirmed" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"
                                            }`}
                                        >
                      {booking.status}
                    </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">{booking.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
