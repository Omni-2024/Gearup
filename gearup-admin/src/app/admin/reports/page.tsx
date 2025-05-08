"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
    LineChart,
    Line,
} from "recharts"
import { Download, FileText, FileSpreadsheet, FileIcon as FilePdf, Filter, CheckSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"

export default function ReportsPage() {
    // State for export options
    const [dateRange, setDateRange] = useState<"last7days" | "last30days" | "last90days" | "custom">("last30days")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [exportFormat, setExportFormat] = useState<"csv" | "excel" | "pdf">("excel")
    const [showExportOptions, setShowExportOptions] = useState(false)
    const [selectedMetrics, setSelectedMetrics] = useState({
        revenue: true,
        bookings: true,
        courtUsage: true,
        timeAnalysis: true,
        customerTypes: true,
    })

    // Sample data for charts
    const monthlySalesData = [
        { name: "Jan", revenue: 4000 },
        { name: "Feb", revenue: 3000 },
        { name: "Mar", revenue: 5000 },
        { name: "Apr", revenue: 4500 },
        { name: "May", revenue: 6000 },
        { name: "Jun", revenue: 5500 },
        { name: "Jul", revenue: 7000 },
        { name: "Aug", revenue: 6500 },
        { name: "Sep", revenue: 8000 },
        { name: "Oct", revenue: 7500 },
        { name: "Nov", revenue: 9000 },
        { name: "Dec", revenue: 10000 },
    ]

    const courtUsageData = [
        { name: "Court 1", bookings: 145 },
        { name: "Court 2", bookings: 132 },
        { name: "Court 3", bookings: 98 },
        { name: "Court 4", bookings: 110 },
        { name: "Court 5", bookings: 85 },
    ]

    const timeSlotData = [
        { name: "6 AM - 9 AM", bookings: 120 },
        { name: "9 AM - 12 PM", bookings: 150 },
        { name: "12 PM - 3 PM", bookings: 180 },
        { name: "3 PM - 6 PM", bookings: 220 },
        { name: "6 PM - 9 PM", bookings: 350 },
        { name: "9 PM - 12 AM", bookings: 280 },
    ]

    const customerTypeData = [
        { name: "Regular", value: 55 },
        { name: "Occasional", value: 30 },
        { name: "New", value: 15 },
    ]

    const weekdayVsWeekendData = [
        { name: "Monday", bookings: 45 },
        { name: "Tuesday", bookings: 52 },
        { name: "Wednesday", bookings: 48 },
        { name: "Thursday", bookings: 61 },
        { name: "Friday", bookings: 78 },
        { name: "Saturday", bookings: 95 },
        { name: "Sunday", bookings: 88 },
    ]

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

    // Handle export action
    const handleExport = () => {
        // In a real application, this would trigger the export process
        // based on the selected format, date range, and metrics

        const exportData = {
            format: exportFormat,
            dateRange,
            customRange: dateRange === "custom" ? { startDate, endDate } : null,
            metrics: selectedMetrics,
        }

        console.log("Exporting report with options:", exportData)

        // Show success message or trigger download
        alert(`Report exported as ${exportFormat.toUpperCase()}. In a real application, this would download the file.`)
    }

    // Get date range label
    const getDateRangeLabel = () => {
        switch (dateRange) {
            case "last7days":
                return "Last 7 Days"
            case "last30days":
                return "Last 30 Days"
            case "last90days":
                return "Last 90 Days"
            case "custom":
                return "Custom Range"
            default:
                return "Select Range"
        }
    }

    // Get export format icon
    const getFormatIcon = () => {
        switch (exportFormat) {
            case "csv":
                return <FileText className="h-4 w-4 mr-2" />
            case "excel":
                return <FileSpreadsheet className="h-4 w-4 mr-2" />
            case "pdf":
                return <FilePdf className="h-4 w-4 mr-2" />
            default:
                return <Download className="h-4 w-4 mr-2" />
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
                    <p className="text-muted-foreground">View, analyze, and export booking and revenue data</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                    <Popover open={showExportOptions} onOpenChange={setShowExportOptions}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full sm:w-auto">
                                <Filter className="h-4 w-4 mr-2" />
                                Export Options
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <div className="space-y-4">
                                <h4 className="font-medium">Export Settings</h4>

                                <div className="space-y-2">
                                    <Label htmlFor="format">Format</Label>
                                    <Select
                                        value={exportFormat}
                                        onValueChange={(value: "csv" | "excel" | "pdf") => setExportFormat(value)}
                                    >
                                        <SelectTrigger id="format">
                                            <SelectValue placeholder="Select format" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="csv">CSV</SelectItem>
                                            <SelectItem value="excel">Excel</SelectItem>
                                            <SelectItem value="pdf">PDF</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="dateRange">Date Range</Label>
                                    <Select
                                        value={dateRange}
                                        onValueChange={(value: "last7days" | "last30days" | "last90days" | "custom") => setDateRange(value)}
                                    >
                                        <SelectTrigger id="dateRange">
                                            <SelectValue placeholder="Select date range" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="last7days">Last 7 Days</SelectItem>
                                            <SelectItem value="last30days">Last 30 Days</SelectItem>
                                            <SelectItem value="last90days">Last 90 Days</SelectItem>
                                            <SelectItem value="custom">Custom Range</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {dateRange === "custom" && (
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="startDate">Start Date</Label>
                                            <Input
                                                id="startDate"
                                                type="date"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="endDate">End Date</Label>
                                            <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <Label>Include Metrics</Label>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="revenue"
                                                checked={selectedMetrics.revenue}
                                                onCheckedChange={(checked) =>
                                                    setSelectedMetrics({ ...selectedMetrics, revenue: checked as boolean })
                                                }
                                            />
                                            <label htmlFor="revenue" className="text-sm">
                                                Revenue Analysis
                                            </label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="bookings"
                                                checked={selectedMetrics.bookings}
                                                onCheckedChange={(checked) =>
                                                    setSelectedMetrics({ ...selectedMetrics, bookings: checked as boolean })
                                                }
                                            />
                                            <label htmlFor="bookings" className="text-sm">
                                                Booking Trends
                                            </label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="courtUsage"
                                                checked={selectedMetrics.courtUsage}
                                                onCheckedChange={(checked) =>
                                                    setSelectedMetrics({ ...selectedMetrics, courtUsage: checked as boolean })
                                                }
                                            />
                                            <label htmlFor="courtUsage" className="text-sm">
                                                Court Usage
                                            </label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="timeAnalysis"
                                                checked={selectedMetrics.timeAnalysis}
                                                onCheckedChange={(checked) =>
                                                    setSelectedMetrics({ ...selectedMetrics, timeAnalysis: checked as boolean })
                                                }
                                            />
                                            <label htmlFor="timeAnalysis" className="text-sm">
                                                Time Slot Analysis
                                            </label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="customerTypes"
                                                checked={selectedMetrics.customerTypes}
                                                onCheckedChange={(checked) =>
                                                    setSelectedMetrics({ ...selectedMetrics, customerTypes: checked as boolean })
                                                }
                                            />
                                            <label htmlFor="customerTypes" className="text-sm">
                                                Customer Demographics
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>

                    <Button onClick={handleExport} className="w-full sm:w-auto">
                        {getFormatIcon()}
                        Export as {exportFormat.toUpperCase()}
                    </Button>
                </div>
            </div>

            <Card className="mb-6">
                <CardHeader className="pb-2">
                    <CardTitle>Business Insights</CardTitle>
                    <CardDescription>Key metrics to help improve your futsal business</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                            <h3 className="font-medium text-green-800 flex items-center">
                                <CheckSquare className="h-4 w-4 mr-2" />
                                Peak Hours Opportunity
                            </h3>
                            <p className="text-sm text-green-700 mt-1">
                                6PM-9PM is your most popular time slot. Consider dynamic pricing to maximize revenue during these hours.
                            </p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                            <h3 className="font-medium text-blue-800 flex items-center">
                                <CheckSquare className="h-4 w-4 mr-2" />
                                Underutilized Courts
                            </h3>
                            <p className="text-sm text-blue-700 mt-1">
                                Court 5 has 38% lower bookings than Court 1. Consider promotions or special rates to increase usage.
                            </p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                            <h3 className="font-medium text-purple-800 flex items-center">
                                <CheckSquare className="h-4 w-4 mr-2" />
                                Customer Retention
                            </h3>
                            <p className="text-sm text-purple-700 mt-1">
                                55% of bookings come from regular customers. Implement a loyalty program to increase retention further.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Tabs defaultValue="revenue">
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="revenue">Revenue</TabsTrigger>
                    <TabsTrigger value="courts">Court Usage</TabsTrigger>
                    <TabsTrigger value="time">Time Analysis</TabsTrigger>
                    <TabsTrigger value="customers">Customers</TabsTrigger>
                    <TabsTrigger value="weekly">Weekly Trends</TabsTrigger>
                </TabsList>

                <TabsContent value="revenue" className="space-y-6 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Monthly Revenue</CardTitle>
                            <CardDescription>Revenue from court bookings over the past 12 months</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={monthlySalesData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                                        <Bar dataKey="revenue" fill="#3b82f6" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between text-sm text-muted-foreground">
                            <div>
                                Total Annual Revenue: <span className="font-medium">$72,000</span>
                            </div>
                            <div>
                                Average Monthly Revenue: <span className="font-medium">$6,000</span>
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="courts" className="space-y-6 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Court Usage</CardTitle>
                            <CardDescription>Number of bookings per court</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={courtUsageData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip formatter={(value) => [`${value}`, "Bookings"]} />
                                        <Bar dataKey="bookings" fill="#82ca9d" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between text-sm text-muted-foreground">
                            <div>
                                Most Popular: <span className="font-medium">Court 1 (145 bookings)</span>
                            </div>
                            <div>
                                Least Popular: <span className="font-medium">Court 5 (85 bookings)</span>
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="time" className="space-y-6 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Popular Time Slots</CardTitle>
                            <CardDescription>Number of bookings by time of day</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={timeSlotData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip formatter={(value) => [`${value}`, "Bookings"]} />
                                        <Line type="monotone" dataKey="bookings" stroke="#8884d8" strokeWidth={2} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between text-sm text-muted-foreground">
                            <div>
                                Peak Hours: <span className="font-medium">6 PM - 9 PM (350 bookings)</span>
                            </div>
                            <div>
                                Opportunity: <span className="font-medium">Morning slots have 67% fewer bookings</span>
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="customers" className="space-y-6 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Customer Types</CardTitle>
                            <CardDescription>Distribution of customer types</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={customerTypeData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            outerRadius={150}
                                            fill="#8884d8"
                                            dataKey="value"
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        >
                                            {customerTypeData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between text-sm text-muted-foreground">
                            <div>
                                Regular Customers: <span className="font-medium">55%</span>
                            </div>
                            <div>
                                Customer Acquisition Cost: <span className="font-medium">$25 per new customer</span>
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="weekly" className="space-y-6 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Weekday vs Weekend Bookings</CardTitle>
                            <CardDescription>Booking patterns throughout the week</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={weekdayVsWeekendData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip formatter={(value) => [`${value}`, "Bookings"]} />
                                        <Bar dataKey="bookings" fill="#8884d8" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between text-sm text-muted-foreground">
                            <div>
                                Weekend Average: <span className="font-medium">91.5 bookings</span>
                            </div>
                            <div>
                                Weekday Average: <span className="font-medium">56.8 bookings</span>
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
