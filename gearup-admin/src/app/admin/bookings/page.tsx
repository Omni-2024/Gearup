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
import { MoreHorizontal, Search, Eye, Calendar, Plus, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreateBookingDialog } from "@/components/create-booking-dialog"
import { ViewBookingDialog } from "@/components/view-booking-dialog"
import { RescheduleBookingDialog } from "@/components/reschedule-booking-dialog"

// Update the mock data to include email and phone
const bookings = [
    {
        id: "#BK-001",
        customer: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        court: "Court 1",
        date: "2023-05-15",
        time: "6:00 PM - 7:00 PM",
        amount: 50,
        status: "Confirmed",
        paymentStatus: "Paid",
    },
    {
        id: "#BK-002",
        customer: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "+1 (555) 987-6543",
        court: "Court 2",
        date: "2023-05-14",
        time: "7:00 PM - 8:00 PM",
        amount: 50,
        status: "Confirmed",
        paymentStatus: "Paid",
    },
    {
        id: "#BK-003",
        customer: "Robert Johnson",
        email: "robert.johnson@example.com",
        phone: "+1 (555) 456-7890",
        court: "Court 3",
        date: "2023-05-13",
        time: "8:00 PM - 9:00 PM",
        amount: 70,
        status: "Cancelled",
        paymentStatus: "Refunded",
    },
    {
        id: "#BK-004",
        customer: "Emily Davis",
        email: "emily.davis@example.com",
        phone: "+1 (555) 234-5678",
        court: "Court 4",
        date: "2023-05-16",
        time: "5:00 PM - 6:00 PM",
        amount: 40,
        status: "Pending",
        paymentStatus: "Unpaid",
    },
    {
        id: "#BK-005",
        customer: "Michael Wilson",
        email: "michael.wilson@example.com",
        phone: "+1 (555) 876-5432",
        court: "Court 1",
        date: "2023-05-16",
        time: "7:00 PM - 8:00 PM",
        amount: 50,
        status: "Confirmed",
        paymentStatus: "Paid",
    },
    {
        id: "#BK-006",
        customer: "Sarah Brown",
        email: "sarah.brown@example.com",
        phone: "+1 (555) 345-6789",
        court: "Court 5",
        date: "2023-05-17",
        time: "6:00 PM - 7:00 PM",
        amount: 60,
        status: "Confirmed",
        paymentStatus: "Paid",
    },
    {
        id: "#BK-007",
        customer: "David Miller",
        email: "david.miller@example.com",
        phone: "+1 (555) 654-3210",
        court: "Court 2",
        date: "2023-05-17",
        time: "8:00 PM - 9:00 PM",
        amount: 50,
        status: "Pending",
        paymentStatus: "Unpaid",
    },
    {
        id: "#BK-008",
        customer: "Lisa Anderson",
        email: "lisa.anderson@example.com",
        phone: "+1 (555) 789-0123",
        court: "Court 3",
        date: "2023-05-18",
        time: "7:00 PM - 9:00 PM",
        amount: 140,
        status: "Confirmed",
        paymentStatus: "Paid",
    },
]

export default function BookingsPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [courtFilter, setCourtFilter] = useState("all")
    const [isCreateBookingOpen, setIsCreateBookingOpen] = useState(false)

    // Add state for the new dialogs
    const [selectedBooking, setSelectedBooking] = useState<(typeof bookings)[0] | null>(null)
    const [isViewBookingOpen, setIsViewBookingOpen] = useState(false)
    const [isRescheduleBookingOpen, setIsRescheduleBookingOpen] = useState(false)

    const filteredBookings = bookings.filter(
        (booking) =>
            (booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                booking.court.toLowerCase().includes(searchTerm.toLowerCase()) ||
                booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                booking.phone.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (statusFilter === "all" || booking.status.toLowerCase() === statusFilter.toLowerCase()) &&
            (courtFilter === "all" || booking.court === courtFilter),
    )

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "confirmed":
                return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
            case "pending":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
            case "cancelled":
                return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
        }
    }

    const getPaymentStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "paid":
                return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
            case "unpaid":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
            case "refunded":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
        }
    }

    // Function to handle downloading receipt
    const handleDownloadReceipt = (booking: (typeof bookings)[0]) => {
        // In a real app, this would generate a PDF receipt
        // For this demo, we'll create a simple text receipt
        const receiptContent = `
FUTSAL COURT BOOKING RECEIPT
============================
Booking ID: ${booking.id}
Date: ${booking.date}
Time: ${booking.time}
Court: ${booking.court}

Customer: ${booking.customer}
Email: ${booking.email}
Phone: ${booking.phone}

Amount: $${booking.amount.toFixed(2)}
Payment Status: ${booking.paymentStatus}

Thank you for your booking!
    `.trim()

        // Create a Blob with the receipt content
        const blob = new Blob([receiptContent], { type: "text/plain" })
        const url = URL.createObjectURL(blob)

        // Create a download link and trigger the download
        const link = document.createElement("a")
        link.href = url
        link.download = `receipt-${booking.id.replace("#", "")}.txt`
        document.body.appendChild(link)
        link.click()

        // Clean up
        URL.revokeObjectURL(url)
        document.body.removeChild(link)
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
                    <p className="text-muted-foreground">Manage court reservations and bookings</p>
                </div>
                <Button className="w-full md:w-auto" onClick={() => setIsCreateBookingOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Booking
                </Button>
            </div>

            <Card>
                <CardHeader className="pb-3">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <CardTitle>All Bookings</CardTitle>
                            <CardDescription>A list of all court bookings including their status and details</CardDescription>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative w-full md:w-64">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search bookings..."
                                    className="pl-8 w-full"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-full md:w-[180px]">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Statuses</SelectItem>
                                    <SelectItem value="confirmed">Confirmed</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={courtFilter} onValueChange={setCourtFilter}>
                                <SelectTrigger className="w-full md:w-[180px]">
                                    <SelectValue placeholder="Filter by court" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Courts</SelectItem>
                                    <SelectItem value="Court 1">Court 1</SelectItem>
                                    <SelectItem value="Court 2">Court 2</SelectItem>
                                    <SelectItem value="Court 3">Court 3</SelectItem>
                                    <SelectItem value="Court 4">Court 4</SelectItem>
                                    <SelectItem value="Court 5">Court 5</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Booking ID</TableHead>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Court</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Time</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Payment</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredBookings.length > 0 ? (
                                    filteredBookings.map((booking) => (
                                        <TableRow key={booking.id}>
                                            <TableCell className="font-medium">{booking.id}</TableCell>
                                            <TableCell>{booking.customer}</TableCell>
                                            <TableCell>{booking.court}</TableCell>
                                            <TableCell>{booking.date}</TableCell>
                                            <TableCell>{booking.time}</TableCell>
                                            <TableCell>${booking.amount}</TableCell>
                                            <TableCell>
                                                <Badge className={getStatusColor(booking.status)} variant="outline">
                                                    {booking.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={getPaymentStatusColor(booking.paymentStatus)} variant="outline">
                                                    {booking.paymentStatus}
                                                </Badge>
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
                                                        <DropdownMenuItem
                                                            onClick={() => {
                                                                setSelectedBooking(booking)
                                                                setIsViewBookingOpen(true)
                                                            }}
                                                        >
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View Details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => {
                                                                setSelectedBooking(booking)
                                                                setIsRescheduleBookingOpen(true)
                                                            }}
                                                            disabled={booking.status === "Cancelled"}
                                                        >
                                                            <Calendar className="mr-2 h-4 w-4" />
                                                            Reschedule
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => handleDownloadReceipt(booking)}
                                                            disabled={booking.paymentStatus !== "Paid"}
                                                        >
                                                            <Download className="mr-2 h-4 w-4" />
                                                            Download Receipt
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={9} className="text-center py-6 text-muted-foreground">
                                            No bookings found matching your search criteria.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <CreateBookingDialog open={isCreateBookingOpen} onOpenChange={setIsCreateBookingOpen} />

            {selectedBooking && (
                <>
                    <ViewBookingDialog booking={selectedBooking} open={isViewBookingOpen} onOpenChange={setIsViewBookingOpen} />

                    <RescheduleBookingDialog
                        booking={selectedBooking}
                        open={isRescheduleBookingOpen}
                        onOpenChange={setIsRescheduleBookingOpen}
                    />
                </>
            )}
        </div>
    )
}
