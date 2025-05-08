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
import {
    Filter,
    CheckSquare,
    Eye,
    TableIcon,
    BarChartIcon as ChartIcon,
    Printer,
    Copy,
    Mail,
    FileText,
    FileSpreadsheet,
    FileIcon as FilePdf,
    Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

export default function ReportsPage() {
    // State for export options
    const [dateRange, setDateRange] = useState<"last7days" | "last30days" | "last90days" | "custom">("last30days")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [exportFormat, setExportFormat] = useState<"table" | "summary" | "print" | "csv" | "excel" | "pdf">("summary")
    const [showExportOptions, setShowExportOptions] = useState(false)
    const [showExportPreview, setShowExportPreview] = useState(false)
    const [isGeneratingFile, setIsGeneratingFile] = useState(false)
    const { toast } = useToast()
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

    // Get format icon
    const getFormatIcon = () => {
        switch (exportFormat) {
            case "table":
                return <TableIcon className="h-4 w-4 mr-2" />
            case "summary":
                return <ChartIcon className="h-4 w-4 mr-2" />
            case "print":
                return <Printer className="h-4 w-4 mr-2" />
            case "csv":
                return <FileText className="h-4 w-4 mr-2" />
            case "excel":
                return <FileSpreadsheet className="h-4 w-4 mr-2" />
            case "pdf":
                return <FilePdf className="h-4 w-4 mr-2" />
            default:
                return <Eye className="h-4 w-4 mr-2" />
        }
    }

    // Handle export action
    const handleExport = () => {
        // For on-screen preview formats, show the dialog
        if (exportFormat === "table" || exportFormat === "summary" || exportFormat === "print") {
            setShowExportPreview(true)
            return
        }

        // For file downloads, prepare and trigger the download
        downloadReport(exportFormat)
    }

    // Function to generate and download reports
    const downloadReport = async (format: string) => {
        setIsGeneratingFile(true)

        try {
            // In a real application, this would be an API call to generate the report
            // For this demo, we'll create a simple CSV/Excel/PDF file with some data

            // Prepare the data based on selected metrics
            const reportData: any = {}

            if (selectedMetrics.revenue) {
                reportData.revenue = monthlySalesData
            }

            if (selectedMetrics.courtUsage) {
                reportData.courtUsage = courtUsageData
            }

            if (selectedMetrics.timeAnalysis) {
                reportData.timeSlots = timeSlotData
            }

            if (selectedMetrics.customerTypes) {
                reportData.customerTypes = customerTypeData
            }

            // Convert the data to the appropriate format
            let fileContent = ""
            let fileType = ""
            let fileName = `futsal-report-${new Date().toISOString().split("T")[0]}`

            switch (format) {
                case "csv":
                    fileContent = generateCSV(reportData)
                    fileType = "text/csv"
                    fileName += ".csv"
                    break
                case "excel":
                    // In a real app, this would generate an Excel file
                    // For this demo, we'll use CSV as a substitute
                    fileContent = generateCSV(reportData)
                    fileType = "application/vnd.ms-excel"
                    fileName += ".xlsx"
                    break
                case "pdf":
                    // In a real app, this would generate a PDF
                    // For this demo, we'll use a text representation
                    fileContent = generatePDFText(reportData)
                    fileType = "application/pdf"
                    fileName += ".pdf"
                    break
            }

            // Create a Blob with the file content
            const blob = new Blob([fileContent], { type: fileType })

            // Create a download link and trigger the download
            const url = URL.createObjectURL(blob)
            const link = document.createElement("a")
            link.href = url
            link.download = fileName
            document.body.appendChild(link)
            link.click()

            // Clean up
            URL.revokeObjectURL(url)
            document.body.removeChild(link)

            toast({
                title: "Report Downloaded",
                description: `Your ${format.toUpperCase()} report has been downloaded successfully.`,
                variant: "default",            })
        } catch (error) {
            console.error("Error generating report:", error)
            toast({
                title: "Download Failed",
                description: "There was an error generating your report. Please try again.",
                variant: "destructive",            })
        } finally {
            setIsGeneratingFile(false)
        }
    }

    // Generate CSV content from data
    const generateCSV = (data: any) => {
        let csv = ""

        // Revenue data
        if (data.revenue) {
            csv += "REVENUE DATA\n"
            csv += "Month,Revenue\n"
            data.revenue.forEach((item: any) => {
                csv += `${item.name},${item.revenue}\n`
            })
            csv += "\n"
        }

        // Court usage data
        if (data.courtUsage) {
            csv += "COURT USAGE DATA\n"
            csv += "Court,Bookings\n"
            data.courtUsage.forEach((item: any) => {
                csv += `${item.name},${item.bookings}\n`
            })
            csv += "\n"
        }

        // Time slot data
        if (data.timeSlots) {
            csv += "TIME SLOT DATA\n"
            csv += "Time Slot,Bookings\n"
            data.timeSlots.forEach((item: any) => {
                csv += `${item.name},${item.bookings}\n`
            })
            csv += "\n"
        }

        // Customer type data
        if (data.customerTypes) {
            csv += "CUSTOMER TYPE DATA\n"
            csv += "Type,Percentage\n"
            data.customerTypes.forEach((item: any) => {
                csv += `${item.name},${item.value}\n`
            })
        }

        return csv
    }

    // Generate text representation of PDF content
    const generatePDFText = (data: any) => {
        let text = "FUTSAL COURT PERFORMANCE REPORT\n"
        text += `Generated on ${new Date().toLocaleDateString()}\n\n`

        // Revenue data
        if (data.revenue) {
            text += "REVENUE DATA\n"
            text += "Month\tRevenue\n"
            data.revenue.forEach((item: any) => {
                text += `${item.name}\t$${item.revenue}\n`
            })
            text += "\n"
        }

        // Court usage data
        if (data.courtUsage) {
            text += "COURT USAGE DATA\n"
            text += "Court\tBookings\n"
            data.courtUsage.forEach((item: any) => {
                text += `${item.name}\t${item.bookings}\n`
            })
            text += "\n"
        }

        // Time slot data
        if (data.timeSlots) {
            text += "TIME SLOT DATA\n"
            text += "Time Slot\tBookings\n"
            data.timeSlots.forEach((item: any) => {
                text += `${item.name}\t${item.bookings}\n`
            })
            text += "\n"
        }

        // Customer type data
        if (data.customerTypes) {
            text += "CUSTOMER TYPE DATA\n"
            text += "Type\tPercentage\n"
            data.customerTypes.forEach((item: any) => {
                text += `${item.name}\t${item.value}%\n`
            })
        }

        return text
    }

    // Mock function to simulate sharing the report
    const shareReport = (method: string) => {
        toast({
            title: "Report Shared",
            description: `Your report would be shared via ${method} in a real application.`,
            variant: "default",        })
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
                                        onValueChange={(value: "table" | "summary" | "print" | "csv" | "excel" | "pdf") =>
                                            setExportFormat(value)
                                        }
                                    >
                                        <SelectTrigger id="format">
                                            <SelectValue placeholder="Select format" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="table">Tabular View</SelectItem>
                                            <SelectItem value="summary">Summary View</SelectItem>
                                            <SelectItem value="print">Print-Friendly View</SelectItem>
                                            <SelectItem value="csv">Download CSV</SelectItem>
                                            <SelectItem value="excel">Download Excel</SelectItem>
                                            <SelectItem value="pdf">Download PDF</SelectItem>
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

                    <Dialog open={showExportPreview} onOpenChange={setShowExportPreview}>
                        <DialogTrigger asChild>
                            <Button onClick={handleExport} disabled={isGeneratingFile} className="w-full sm:w-auto">
                                {isGeneratingFile ? (
                                    <>
                                        <svg
                                            className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        {getFormatIcon()}
                                        {exportFormat === "table" || exportFormat === "summary" || exportFormat === "print"
                                            ? `View ${exportFormat === "table" ? "Tabular" : exportFormat === "summary" ? "Summary" : "Print-Friendly"} Report`
                                            : `Download as ${exportFormat.toUpperCase()}`}
                                    </>
                                )}
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle className="flex items-center justify-between">
                                    <span>Report: {getDateRangeLabel()}</span>
                                    <div className="flex items-center space-x-2">
                                        <Button variant="outline" size="sm" onClick={() => shareReport("email")}>
                                            <Mail className="h-4 w-4 mr-2" />
                                            Email
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => shareReport("copy")}>
                                            <Copy className="h-4 w-4 mr-2" />
                                            Copy
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => shareReport("print")}>
                                            <Printer className="h-4 w-4 mr-2" />
                                            Print
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => downloadReport(exportFormat === "print" ? "pdf" : "excel")}
                                        >
                                            <Download className="h-4 w-4 mr-2" />
                                            Download
                                        </Button>
                                    </div>
                                </DialogTitle>
                                <DialogDescription>
                                    Futsal Court Performance Report • Generated on {new Date().toLocaleDateString()}
                                </DialogDescription>
                            </DialogHeader>

                            {exportFormat === "table" && (
                                <div className="space-y-6">
                                    {selectedMetrics.revenue && (
                                        <div>
                                            <h3 className="text-lg font-medium mb-2">Revenue Analysis</h3>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Month</TableHead>
                                                        <TableHead className="text-right">Revenue</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {monthlySalesData.map((item) => (
                                                        <TableRow key={item.name}>
                                                            <TableCell>{item.name}</TableCell>
                                                            <TableCell className="text-right">${item.revenue.toLocaleString()}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                    <TableRow>
                                                        <TableCell className="font-bold">Total</TableCell>
                                                        <TableCell className="text-right font-bold">
                                                            ${monthlySalesData.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </div>
                                    )}

                                    {selectedMetrics.courtUsage && (
                                        <div>
                                            <h3 className="text-lg font-medium mb-2">Court Usage</h3>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Court</TableHead>
                                                        <TableHead className="text-right">Bookings</TableHead>
                                                        <TableHead className="text-right">Utilization %</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {courtUsageData.map((item) => (
                                                        <TableRow key={item.name}>
                                                            <TableCell>{item.name}</TableCell>
                                                            <TableCell className="text-right">{item.bookings}</TableCell>
                                                            <TableCell className="text-right">
                                                                {Math.round((item.bookings / Math.max(...courtUsageData.map((d) => d.bookings))) * 100)}
                                                                %
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    )}

                                    {selectedMetrics.timeAnalysis && (
                                        <div>
                                            <h3 className="text-lg font-medium mb-2">Time Slot Analysis</h3>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Time Slot</TableHead>
                                                        <TableHead className="text-right">Bookings</TableHead>
                                                        <TableHead className="text-right">% of Total</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {timeSlotData.map((item) => {
                                                        const totalBookings = timeSlotData.reduce((sum, slot) => sum + slot.bookings, 0)
                                                        const percentage = ((item.bookings / totalBookings) * 100).toFixed(1)

                                                        return (
                                                            <TableRow key={item.name}>
                                                                <TableCell>{item.name}</TableCell>
                                                                <TableCell className="text-right">{item.bookings}</TableCell>
                                                                <TableCell className="text-right">{percentage}%</TableCell>
                                                            </TableRow>
                                                        )
                                                    })}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    )}

                                    {selectedMetrics.customerTypes && (
                                        <div>
                                            <h3 className="text-lg font-medium mb-2">Customer Demographics</h3>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Customer Type</TableHead>
                                                        <TableHead className="text-right">Percentage</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {customerTypeData.map((item) => (
                                                        <TableRow key={item.name}>
                                                            <TableCell>{item.name}</TableCell>
                                                            <TableCell className="text-right">{item.value}%</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    )}
                                </div>
                            )}

                            {exportFormat === "summary" && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Card>
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-base">Revenue Summary</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Total Revenue:</span>
                                                        <span className="font-medium">
                              ${monthlySalesData.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}
                            </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Average Monthly:</span>
                                                        <span className="font-medium">
                              $
                                                            {Math.round(
                                                                monthlySalesData.reduce((sum, item) => sum + item.revenue, 0) / monthlySalesData.length,
                                                            ).toLocaleString()}
                            </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Highest Month:</span>
                                                        <span className="font-medium">
                              {monthlySalesData.reduce((max, item) => (item.revenue > max.revenue ? item : max)).name}{" "}
                                                            ($
                                                            {monthlySalesData
                                                                .reduce((max, item) => (item.revenue > max.revenue ? item : max))
                                                                .revenue.toLocaleString()}
                                                            )
                            </span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        <Card>
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-base">Court Usage Summary</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Total Bookings:</span>
                                                        <span className="font-medium">
                              {courtUsageData.reduce((sum, item) => sum + item.bookings, 0)}
                            </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Most Popular Court:</span>
                                                        <span className="font-medium">
                              {courtUsageData.reduce((max, item) => (item.bookings > max.bookings ? item : max)).name} (
                                                            {
                                                                courtUsageData.reduce((max, item) => (item.bookings > max.bookings ? item : max))
                                                                    .bookings
                                                            }{" "}
                                                            bookings)
                            </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Least Popular Court:</span>
                                                        <span className="font-medium">
                              {courtUsageData.reduce((min, item) => (item.bookings < min.bookings ? item : min)).name} (
                                                            {
                                                                courtUsageData.reduce((min, item) => (item.bookings < min.bookings ? item : min))
                                                                    .bookings
                                                            }{" "}
                                                            bookings)
                            </span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    <Card>
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-base">Business Insights</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                <div className="flex items-start gap-2">
                                                    <CheckSquare className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                                    <div>
                                                        <h4 className="font-medium">Peak Hours Opportunity</h4>
                                                        <p className="text-sm text-muted-foreground">
                                                            The 6PM-9PM slot accounts for{" "}
                                                            {Math.round(
                                                                (timeSlotData[4].bookings /
                                                                    timeSlotData.reduce((sum, item) => sum + item.bookings, 0)) *
                                                                100,
                                                            )}
                                                            % of all bookings. Consider implementing dynamic pricing with a 15-20% premium during
                                                            these hours while offering discounts during the 6AM-9AM slot to increase morning
                                                            utilization.
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-2">
                                                    <CheckSquare className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                                    <div>
                                                        <h4 className="font-medium">Court Optimization</h4>
                                                        <p className="text-sm text-muted-foreground">
                                                            Court 5 has{" "}
                                                            {Math.round(
                                                                ((courtUsageData[0].bookings - courtUsageData[4].bookings) /
                                                                    courtUsageData[0].bookings) *
                                                                100,
                                                            )}
                                                            % fewer bookings than Court 1. Consider rotating league matches across all courts or
                                                            offering special promotions specifically for Court 5 to balance usage.
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-2">
                                                    <CheckSquare className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                                    <div>
                                                        <h4 className="font-medium">Customer Retention Strategy</h4>
                                                        <p className="text-sm text-muted-foreground">
                                                            With {customerTypeData[0].value}% of bookings coming from regular customers, implementing
                                                            a loyalty program could increase retention further. Consider offering a "book 9 sessions,
                                                            get 1 free" program to incentivize repeat bookings.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {selectedMetrics.timeAnalysis && (
                                        <Card>
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-base">Time Slot Distribution</CardTitle>
                                            </CardHeader>
                                            <CardContent className="h-[200px]">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <BarChart data={timeSlotData}>
                                                        <CartesianGrid strokeDasharray="3 3" />
                                                        <XAxis dataKey="name" />
                                                        <YAxis />
                                                        <Tooltip formatter={(value) => [`${value}`, "Bookings"]} />
                                                        <Bar dataKey="bookings" fill="#8884d8" />
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </CardContent>
                                        </Card>
                                    )}
                                </div>
                            )}

                            {exportFormat === "print" && (
                                <div className="space-y-8 print:space-y-6">
                                    <div className="text-center mb-6 print:mb-4">
                                        <h2 className="text-2xl font-bold">Futsal Court Performance Report</h2>
                                        <p className="text-muted-foreground">
                                            {getDateRangeLabel()} • Generated on {new Date().toLocaleDateString()}
                                        </p>
                                    </div>

                                    {selectedMetrics.revenue && (
                                        <div>
                                            <h3 className="text-xl font-semibold mb-4 print:text-lg">Revenue Analysis</h3>
                                            <div className="h-[250px] print:h-[200px]">
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
                                            <div className="mt-2 text-sm grid grid-cols-2 gap-4">
                                                <div>
                                                    <span className="font-medium">Total Revenue:</span> $
                                                    {monthlySalesData.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}
                                                </div>
                                                <div>
                                                    <span className="font-medium">Average Monthly:</span> $
                                                    {Math.round(
                                                        monthlySalesData.reduce((sum, item) => sum + item.revenue, 0) / monthlySalesData.length,
                                                    ).toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <Separator className="print:hidden" />

                                    {selectedMetrics.courtUsage && (
                                        <div>
                                            <h3 className="text-xl font-semibold mb-4 print:text-lg">Court Usage</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="h-[250px] print:h-[200px]">
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
                                                <div className="space-y-4">
                                                    <h4 className="font-medium">Court Usage Insights</h4>
                                                    <p className="text-sm">
                                                        Court 1 is your most popular court with {courtUsageData[0].bookings} bookings, while Court 5
                                                        has the lowest usage with {courtUsageData[4].bookings} bookings. This represents a{" "}
                                                        {Math.round(
                                                            ((courtUsageData[0].bookings - courtUsageData[4].bookings) / courtUsageData[0].bookings) *
                                                            100,
                                                        )}
                                                        % difference in utilization.
                                                    </p>
                                                    <p className="text-sm">
                                                        <span className="font-medium">Recommendation:</span> Consider rotating league matches across
                                                        all courts or offering special promotions specifically for Court 5 to balance usage.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <Separator className="print:hidden" />

                                    {selectedMetrics.timeAnalysis && (
                                        <div>
                                            <h3 className="text-xl font-semibold mb-4 print:text-lg">Time Slot Analysis</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="h-[250px] print:h-[200px]">
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
                                                <div className="space-y-4">
                                                    <h4 className="font-medium">Time Slot Insights</h4>
                                                    <p className="text-sm">
                                                        The 6PM-9PM slot is your peak time with {timeSlotData[4].bookings} bookings, accounting for{" "}
                                                        {Math.round(
                                                            (timeSlotData[4].bookings / timeSlotData.reduce((sum, item) => sum + item.bookings, 0)) *
                                                            100,
                                                        )}
                                                        % of all bookings.
                                                    </p>
                                                    <p className="text-sm">
                                                        <span className="font-medium">Recommendation:</span> Implement dynamic pricing with a 15-20%
                                                        premium during peak hours while offering discounts during the 6AM-9AM slot to increase
                                                        morning utilization.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <Separator className="print:hidden" />

                                    {selectedMetrics.customerTypes && (
                                        <div>
                                            <h3 className="text-xl font-semibold mb-4 print:text-lg">Customer Demographics</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="h-[250px] print:h-[200px]">
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        <PieChart>
                                                            <Pie
                                                                data={customerTypeData}
                                                                cx="50%"
                                                                cy="50%"
                                                                labelLine={false}
                                                                outerRadius={100}
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
                                                <div className="space-y-4">
                                                    <h4 className="font-medium">Customer Insights</h4>
                                                    <p className="text-sm">
                                                        Regular customers make up {customerTypeData[0].value}% of your bookings, while new customers
                                                        account for only {customerTypeData[2].value}%. This indicates strong loyalty but potential
                                                        challenges in customer acquisition.
                                                    </p>
                                                    <p className="text-sm">
                                                        <span className="font-medium">Recommendation:</span> Implement a "book 9 sessions, get 1
                                                        free" loyalty program to reward regular customers while running targeted promotions to
                                                        attract new customers.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </DialogContent>
                    </Dialog>
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
