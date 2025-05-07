'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
    Legend
} from "recharts"
import { Download, FileText } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function ReportsPage() {
    // Sample data for charts
    const monthlySalesData = [
        { name: "Jan", sales: 4000 },
        { name: "Feb", sales: 3000 },
        { name: "Mar", sales: 5000 },
        { name: "Apr", sales: 4500 },
        { name: "May", sales: 6000 },
        { name: "Jun", sales: 5500 },
        { name: "Jul", sales: 7000 },
        { name: "Aug", sales: 6500 },
        { name: "Sep", sales: 8000 },
        { name: "Oct", sales: 7500 },
        { name: "Nov", sales: 9000 },
        { name: "Dec", sales: 10000 },
    ]

    const categoryData = [
        { name: "Electronics", value: 35 },
        { name: "Clothing", value: 25 },
        { name: "Books", value: 15 },
        { name: "Home", value: 25 },
    ]

    const trafficSourceData = [
        { name: "Direct", value: 40 },
        { name: "Organic Search", value: 30 },
        { name: "Social Media", value: 20 },
        { name: "Referral", value: 10 },
    ]

    const customerAgeData = [
        { name: "18-24", value: 15 },
        { name: "25-34", value: 35 },
        { name: "35-44", value: 25 },
        { name: "45-54", value: 15 },
        { name: "55+", value: 10 },
    ]

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
                    <p className="text-muted-foreground">
                        View and analyze business performance data
                    </p>
                </div>
                <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Export Reports
                </Button>
            </div>

            <Tabs defaultValue="sales">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="sales">Sales</TabsTrigger>
                    <TabsTrigger value="products">Products</TabsTrigger>
                    <TabsTrigger value="customers">Customers</TabsTrigger>
                    <TabsTrigger value="traffic">Traffic</TabsTrigger>
                </TabsList>

                <TabsContent value="sales" className="space-y-6 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Monthly Sales</CardTitle>
                            <CardDescription>Sales performance over the past 12 months</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={monthlySalesData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip formatter={(value) => [`$${value}`, 'Sales']} />
                                        <Bar dataKey="sales" fill="#3b82f6" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="products" className="space-y-6 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sales by Category</CardTitle>
                            <CardDescription>Product category distribution</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={categoryData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            outerRadius={150}
                                            fill="#8884d8"
                                            dataKey="value"
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        >
                                            {categoryData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="customers" className="space-y-6 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Customer Demographics</CardTitle>
                            <CardDescription>Age distribution of customers</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={customerAgeData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            outerRadius={150}
                                            fill="#8884d8"
                                            dataKey="value"
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        >
                                            {customerAgeData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="traffic" className="space-y-6 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Traffic Sources</CardTitle>
                            <CardDescription>Where your customers are coming from</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={trafficSourceData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            outerRadius={150}
                                            fill="#8884d8"
                                            dataKey="value"
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        >
                                            {trafficSourceData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
