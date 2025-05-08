"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { CalendarIcon, Check, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

// Mock time slots
const generateTimeSlots = () => {
    const slots = []
    for (let hour = 6; hour <= 22; hour++) {
        const formattedHour = hour % 12 === 0 ? 12 : hour % 12
        const period = hour < 12 ? "AM" : "PM"
        slots.push({
            id: `${hour}:00`,
            time: `${formattedHour}:00 ${period}`,
            available: Math.random() > 0.3, // Randomly mark some as unavailable
        })
    }
    return slots
}

interface RescheduleBookingDialogProps {
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

export function RescheduleBookingDialog({ booking, open, onOpenChange }: RescheduleBookingDialogProps) {
    // Parse the booking date string to a Date object
    const parseDateString = (dateStr: string) => {
        const [year, month, day] = dateStr.split("-").map(Number)
        return new Date(year, month - 1, day)
    }

    // State for the form
    const [date, setDate] = useState<Date | undefined>(parseDateString(booking.date))
    const [timeSlots, setTimeSlots] = useState<{ id: string; time: string; available: boolean }[]>([])
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("")
    const { toast } = useToast()

    // Generate time slots when date changes
    useEffect(() => {
        if (date) {
            // In a real app, this would fetch available slots from the server
            setTimeSlots(generateTimeSlots())
            setSelectedTimeSlot("") // Reset selected time slot when date changes
        }
    }, [date])

    const handleReschedule = () => {
        if (!date || !selectedTimeSlot) {
            toast({
                title: "Missing information",
                description: "Please select both a date and time slot",
                type: "error",
            })
            return
        }

        // In a real app, this would send the reschedule request to the server
        console.log({
            bookingId: booking.id,
            newDate: format(date, "yyyy-MM-dd"),
            newTimeSlot: selectedTimeSlot,
        })

        toast({
            title: "Booking rescheduled",
            description: `Booking ${booking.id} has been rescheduled to ${format(date, "PPP")} at ${timeSlots.find((slot) => slot.id === selectedTimeSlot)?.time}`,
            type: "success",
        })

        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Reschedule Booking</DialogTitle>
                    <DialogDescription>
                        Change the date and time for booking {booking.id} for {booking.customer}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Current booking info */}
                    <div className="bg-muted/50 p-4 rounded-md">
                        <h3 className="text-sm font-medium mb-2">Current Booking</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                                <span className="text-muted-foreground">Court:</span> {booking.court}
                            </div>
                            <div>
                                <span className="text-muted-foreground">Date:</span> {booking.date}
                            </div>
                            <div>
                                <span className="text-muted-foreground">Time:</span> {booking.time}
                            </div>
                            <div>
                                <span className="text-muted-foreground">Status:</span>{" "}
                                <Badge
                                    variant="outline"
                                    className={
                                        booking.status === "Confirmed"
                                            ? "bg-green-100 text-green-800"
                                            : booking.status === "Pending"
                                                ? "bg-yellow-100 text-yellow-800"
                                                : "bg-red-100 text-red-800"
                                    }
                                >
                                    {booking.status}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    {/* New date selection */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium">New Date</h3>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(date, "PPP") : "Select a date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* New time slot selection */}
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium">New Time Slot</h3>
                            <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto p-1">
                                {timeSlots.map((slot) => (
                                    <Button
                                        key={slot.id}
                                        variant={selectedTimeSlot === slot.id ? "default" : "outline"}
                                        className={cn("justify-start", !slot.available && "opacity-50 cursor-not-allowed")}
                                        disabled={!slot.available}
                                        onClick={() => slot.available && setSelectedTimeSlot(slot.id)}
                                    >
                                        <Clock className="mr-2 h-4 w-4" />
                                        {slot.time}
                                        {selectedTimeSlot === slot.id && <Check className="ml-auto h-4 w-4" />}
                                    </Button>
                                ))}
                            </div>

                            {timeSlots.length === 0 && (
                                <div className="text-center py-4 text-muted-foreground">
                                    Please select a date to view available time slots.
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleReschedule}>Reschedule Booking</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
