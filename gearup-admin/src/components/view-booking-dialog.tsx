"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, Mail, Phone, User, MapPin, Calendar, Clock, CreditCard, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface ViewBookingDialogProps {
    booking: {
        id: string
        customer: string
        email: string
        phone: string
        court: string
        date: string
        time: string
        amount: number
        status: string
        paymentStatus: string
    }
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function ViewBookingDialog({ booking, open, onOpenChange }: ViewBookingDialogProps) {
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
    const handleDownloadReceipt = () => {
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
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                        <span>Booking Details</span>
                        <Badge className={getStatusColor(booking.status)} variant="outline">
                            {booking.status}
                        </Badge>
                    </DialogTitle>
                    <DialogDescription>Complete information about booking {booking.id}</DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Booking Information */}
                    <div>
                        <h3 className="text-lg font-medium">Booking Information</h3>
                        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-start gap-2">
                                <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium">Booking ID</p>
                                    <p className="text-sm text-muted-foreground">{booking.id}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium">Court</p>
                                    <p className="text-sm text-muted-foreground">{booking.court}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium">Date</p>
                                    <p className="text-sm text-muted-foreground">{booking.date}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium">Time</p>
                                    <p className="text-sm text-muted-foreground">{booking.time}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Customer Information */}
                    <div>
                        <h3 className="text-lg font-medium">Customer Information</h3>
                        <div className="mt-3 space-y-3">
                            <div className="flex items-start gap-2">
                                <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium">Name</p>
                                    <p className="text-sm text-muted-foreground">{booking.customer}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium">Email</p>
                                    <p className="text-sm text-muted-foreground">{booking.email}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium">Phone</p>
                                    <p className="text-sm text-muted-foreground">{booking.phone}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Payment Information */}
                    <div>
                        <h3 className="text-lg font-medium">Payment Information</h3>
                        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-start gap-2">
                                <CreditCard className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium">Amount</p>
                                    <p className="text-sm text-muted-foreground">${booking.amount.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="h-5 w-5 flex items-center justify-center">
                                    <Badge className={getPaymentStatusColor(booking.paymentStatus)} variant="outline">
                                        {booking.paymentStatus}
                                    </Badge>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Payment Status</p>
                                    <p className="text-sm text-muted-foreground">
                                        {booking.paymentStatus === "Paid"
                                            ? "Payment completed"
                                            : booking.paymentStatus === "Unpaid"
                                                ? "Payment pending"
                                                : "Amount refunded"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Close
                    </Button>
                    {booking.paymentStatus === "Paid" && (
                        <Button onClick={handleDownloadReceipt}>
                            <Download className="mr-2 h-4 w-4" />
                            Download Receipt
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
