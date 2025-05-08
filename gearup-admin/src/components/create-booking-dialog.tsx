"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { CalendarIcon, Check, ChevronsUpDown, Clock } from "lucide-react"
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
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

// Mock data for courts
const courts = [
    { value: "court-1", label: "Court 1" },
    { value: "court-2", label: "Court 2" },
    { value: "court-3", label: "Court 3" },
    { value: "court-4", label: "Court 4" },
    { value: "court-5", label: "Court 5" },
]

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

interface CreateBookingDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function CreateBookingDialog({ open, onOpenChange }: CreateBookingDialogProps) {
    // State for multi-step form
    const [step, setStep] = useState(1)
    const [date, setDate] = useState<Date>()
    const [court, setCourt] = useState("")
    const [openCourtSelect, setOpenCourtSelect] = useState(false)
    const [timeSlots, setTimeSlots] = useState<{ id: string; time: string; available: boolean }[]>([])
    const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([])
    const [customerName, setCustomerName] = useState("")
    const [customerEmail, setCustomerEmail] = useState("")
    const [customerPhone, setCustomerPhone] = useState("")
    const { toast } = useToast()

    // Reset form when dialog opens
    useEffect(() => {
        if (open) {
            setStep(1)
            setDate(undefined)
            setCourt("")
            setSelectedTimeSlots([])
            setCustomerName("")
            setCustomerEmail("")
            setCustomerPhone("")
        }
    }, [open])

    // Generate time slots when date and court are selected
    useEffect(() => {
        if (date && court) {
            // In a real app, this would fetch available slots from the server
            setTimeSlots(generateTimeSlots())
        }
    }, [date, court])

    const handleTimeSlotToggle = (slotId: string) => {
        setSelectedTimeSlots((prev) => (prev.includes(slotId) ? prev.filter((id) => id !== slotId) : [...prev, slotId]))
    }

    const handleNextStep = () => {
        if (step === 1) {
            if (!date || !court) {
                toast({
                    title: "Missing information",
                    description: "Please select both a date and court",
                    variant: "destructive",                })
                return
            }
            setStep(2)
        } else if (step === 2) {
            if (selectedTimeSlots.length === 0) {
                toast({
                    title: "No time slots selected",
                    description: "Please select at least one time slot",
                    variant: "destructive",                })
                return
            }
            setStep(3)
        } else if (step === 3) {
            if (!customerName || !customerEmail || !customerPhone) {
                toast({
                    title: "Missing information",
                    description: "Please fill in all customer details",
                    variant: "destructive",                })
                return
            }
            handleCreateBooking()
        }
    }

    const handlePreviousStep = () => {
        if (step > 1) {
            setStep(step - 1)
        }
    }

    const handleCreateBooking = () => {
        // In a real app, this would send the booking data to the server
        console.log({
            date,
            court,
            timeSlots: selectedTimeSlots,
            customer: {
                name: customerName,
                email: customerEmail,
                phone: customerPhone,
            },
        })

        toast({
            title: "Booking created",
            description: `Booking for ${customerName} on ${date?.toLocaleDateString()} has been created`,
            variant: "default",        })

        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}  >
            <DialogContent className="sm:max-w-[500px] w-500px ">
                <DialogHeader>
                    <DialogTitle>Create New Booking</DialogTitle>
                    <DialogDescription>
                        {step === 1 && "Select a date and court for the booking."}
                        {step === 2 && "Select available time slots for the booking."}
                        {step === 3 && "Enter customer information to complete the booking."}
                    </DialogDescription>
                </DialogHeader>

                {/* Step 1: Select Date and Court */}
                {step === 1 && (
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="date">Date</Label>
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

                        <div className="space-y-2">
                            <Label htmlFor="court">Court</Label>
                            <Popover open={openCourtSelect} onOpenChange={setOpenCourtSelect}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={openCourtSelect}
                                        className="w-full justify-between"
                                    >
                                        {court ? courts.find((c) => c.value === court)?.label : "Select a court"}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                    <Command>
                                        <CommandInput placeholder="Search courts..." />
                                        <CommandList>
                                            <CommandEmpty>No court found.</CommandEmpty>
                                            <CommandGroup>
                                                {courts.map((c) => (
                                                    <CommandItem
                                                        key={c.value}
                                                        value={c.value}
                                                        onSelect={(currentValue) => {
                                                            setCourt(currentValue === court ? "" : currentValue)
                                                            setOpenCourtSelect(false)
                                                        }}
                                                    >
                                                        <Check className={cn("mr-2 h-4 w-4", court === c.value ? "opacity-100" : "opacity-0")} />
                                                        {c.label}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                )}

                {/* Step 2: Select Time Slots */}
                {step === 2 && (
                    <div className="py-4">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium">
                                    Available Time Slots for {courts.find((c) => c.value === court)?.label} on{" "}
                                    {date ? format(date, "PPP") : ""}
                                </h3>
                                <span className="text-xs text-muted-foreground">{selectedTimeSlots.length} slot(s) selected</span>
                            </div>

                            <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto p-1">
                                {timeSlots.map((slot) => (
                                    <Button
                                        key={slot.id}
                                        variant={selectedTimeSlots.includes(slot.id) ? "default" : "outline"}
                                        className={cn("justify-start", !slot.available && "opacity-50 cursor-not-allowed")}
                                        disabled={!slot.available}
                                        onClick={() => slot.available && handleTimeSlotToggle(slot.id)}
                                    >
                                        <Clock className="mr-2 h-4 w-4" />
                                        {slot.time}
                                        {selectedTimeSlots.includes(slot.id) && <Check className="ml-auto h-4 w-4" />}
                                    </Button>
                                ))}
                            </div>

                            {timeSlots.length === 0 && (
                                <div className="text-center py-4 text-muted-foreground">
                                    Please select a date and court to view available time slots.
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Step 3: Customer Information */}
                {step === 3 && (
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Customer Name</Label>
                            <Input
                                id="name"
                                placeholder="Enter customer name"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter customer email"
                                value={customerEmail}
                                onChange={(e) => setCustomerEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Mobile Number</Label>
                            <Input
                                id="phone"
                                placeholder="Enter customer mobile number"
                                value={customerPhone}
                                onChange={(e) => setCustomerPhone(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2 border rounded-md p-4">
                            <h3 className="text-sm font-medium">Booking Summary</h3>
                            <div className="text-sm">
                                <p>
                                    <span className="font-medium">Court:</span> {courts.find((c) => c.value === court)?.label}
                                </p>
                                <p>
                                    <span className="font-medium">Date:</span> {date ? format(date, "PPP") : ""}
                                </p>
                                <p>
                                    <span className="font-medium">Time Slots:</span>
                                </p>
                                <ul className="list-disc pl-5">
                                    {selectedTimeSlots.map((slotId) => {
                                        const slot = timeSlots.find((s) => s.id === slotId)
                                        return slot ? <li key={slotId}>{slot.time}</li> : null
                                    })}
                                </ul>
                                <p className="mt-2">
                                    <span className="font-medium">Total Amount:</span> ${selectedTimeSlots.length * 50}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
                    {step > 1 && (
                        <Button variant="outline" onClick={handlePreviousStep}>
                            Back
                        </Button>
                    )}
                    <Button onClick={handleNextStep}>{step < 3 ? "Next" : "Create Booking"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
