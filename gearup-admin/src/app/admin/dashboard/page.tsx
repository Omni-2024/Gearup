'use client'
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
    Cell
} from "recharts"
import { ArrowUpRight, Users, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react'

export default function DashboardPage() {
    // Sample data for charts
    const revenueData = [
        { name: "Jan", revenue: 4000 },
        { name: "Feb", revenue: 3000 },
        { name: "Mar", revenue: 5000 },
        { name: "Apr", revenue: 4500 },
        { name: "May", revenue: 6000 },
        { name: "Jun", revenue: 5500 },
    ]

    const visitorsData = [
        { name: "Mon", visitors: 1200 },
        { name: "Tue", visitors: 1400 },
        { name: "Wed", visitors: 1300 },
        { name: "Thu", visitors: 1500 },
        { name: "Fri", visitors: 1800 },
        { name: "Sat", visitors: 1200 },
        { name: "Sun", visitors: 800 },
    ]

    const productData = [
        { name: "Electronics", value: 35 },
        { name: "Clothing", value: 25 },
        { name: "Books", value: 15 },
        { name: "Home", value: 25 },
    ]

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

    const stats = [
        {
            title: "Total Users",
            value: "12,345",
            change: "+12%",
            icon: Users,
        },
        {
            title: "Total Revenue",
            value: "$34,567",
            change: "+8%",
            icon: DollarSign,
        },
        {
            title: "Bookings",
            value: "1,234",
            change: "+23%",
            icon: ShoppingCart,
        },
        {
            title: "Conversion",
            value: "3.2%",
            change: "+5%",
            icon: TrendingUp,
        },
    ]

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                    Overview of your business performance and analytics
                </p>
            </div>

            {/* Stats cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <Card key={index}>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        {stat.title}
                                    </p>
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
                        <CardTitle>Revenue Overview</CardTitle>
                        <CardDescription>Monthly revenue performance</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={revenueData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="revenue" fill="#3b82f6" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Visitor Traffic</CardTitle>
                        <CardDescription>Daily visitor count</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={visitorsData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="visitors"
                                        stroke="#8884d8"
                                        strokeWidth={2}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Product Categories</CardTitle>
                        <CardDescription>Revenue distribution by category</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={productData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {productData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>Latest system events</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((item) => (
                                <div key={item} className="flex items-center gap-4 border-b pb-4 last:border-0">
                                    <div className="rounded-full bg-primary/10 p-2">
                                        <Users className="h-4 w-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">New user registered</p>
                                        <p className="text-xs text-muted-foreground">
                                            {item} hour{item !== 1 ? "s" : ""} ago
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
