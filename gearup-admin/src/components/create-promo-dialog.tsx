"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { CalendarIcon, Loader2, Tag } from "lucide-react"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

interface CreatePromoDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onPromoAdded?: (promo: any) => void
    onPromoUpdated?: (promo: any) => void
    editingPromo?: any
}

export function CreatePromoDialog({
                                      open,
                                      onOpenChange,
                                      onPromoAdded,
                                      onPromoUpdated,
                                      editingPromo,
                                  }: CreatePromoDialogProps) {
    // Form state
    const [name, setName] = useState("")
    const [code, setCode] = useState("")
    const [type, setType] = useState("percentage")
    const [value, setValue] = useState("")
    const [description, setDescription] = useState("")
    const [startDate, setStartDate] = useState<Date>()
    const [endDate, setEndDate] = useState<Date>()
    const [timeRestriction, setTimeRestriction] = useState("")
    const [daysRestriction, setDaysRestriction] = useState<string[]>([])
    const [applicableCourts, setApplicableCourts] = useState<string[]>(["All Courts"])
    const [minBookingDuration, setMinBookingDuration] = useState("1")
    const [usageLimit, setUsageLimit] = useState("")
    const [userType, setUserType] = useState("all")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    // Reset form when dialog opens/closes or when editing a promo
    useEffect(() => {
        if (open) {
            if (editingPromo) {
                // Populate form with existing promo data
                setName(editingPromo.name || "")
                setCode(editingPromo.code || "")
                setType(editingPromo.type || "percentage")
                setValue(editingPromo.value?.toString() || "")
                setDescription(editingPromo.description || "")
                setStartDate(editingPromo.startDate ? new Date(editingPromo.startDate) : undefined)
                setEndDate(editingPromo.endDate ? new Date(editingPromo.endDate) : undefined)
                setTimeRestriction(editingPromo.timeRestriction || "")
                setDaysRestriction(editingPromo.daysRestriction || [])
                setApplicableCourts(editingPromo.applicableCourts || ["All Courts"])
                setMinBookingDuration(editingPromo.minBookingDuration?.toString() || "1")
                setUsageLimit(editingPromo.usageLimit?.toString() || "")
                setUserType(editingPromo.userType || "all")
                setIsEditing(true)
            } else {
                // Reset form for new promo
                setName("")
                setCode("")
                setType("percentage")
                setValue("")
                setDescription("")
                setStartDate(new Date())
                setEndDate(undefined)
                setTimeRestriction("")
                setDaysRestriction([])
                setApplicableCourts(["All Courts"])
                setMinBookingDuration("1")
                setUsageLimit("")
                setUserType("all")
                setIsEditing(false)
            }
        }
    }, [open, editingPromo])

    // Generate a random promo code
    const generatePromoCode = () => {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        let result = ""
        for (let i = 0; i < 8; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length))
        }
        setCode(result)
    }

    // Toggle day selection for day restriction
    const toggleDay = (day: string) => {
        setDaysRestriction((current) => (current.includes(day) ? current.filter((d) => d !== day) : [...current, day]))
    }

    // Toggle court selection for applicable courts
    const toggleCourt = (court: string) => {
        if (court === "All Courts") {
            setApplicableCourts(["All Courts"])
        } else {
            setApplicableCourts((current) => {
                // If "All Courts" is selected and we're selecting a specific court, remove "All Courts"
                if (current.includes("All Courts")) {
                    return [court]
                }
                // If the court is already selected, remove it
                if (current.includes(court)) {
                    return current.filter((c) => c !== court)
                }
                // Otherwise, add it
                return [...current, court]
            })
        }
    }

    // Handle form submission
    const handleSubmit = async () => {
        // Validate form
        if (!name) {
            toast({
                title: "Missing information",
                description: "Promotion name is required",
                variant: "destructive",
            })
            return
        }

        if (!code) {
            toast({
                title: "Missing information",
                description: "Promo code is required",
                variant: "destructive",
            })
            return
        }

        if (!type) {
            toast({
                title: "Missing information",
                description: "Discount type is required",
                variant: "destructive",
            })
            return
        }

        if (!value) {
            toast({
                title: "Missing information",
                description: "Discount value is required",
                variant: "destructive",
            })
            return
        }

        if (!startDate || !endDate) {
            toast({
                title: "Missing information",
                description: "Start and end dates are required",
                variant: "destructive",
            })
            return
        }

        if (new Date(startDate) > new Date(endDate)) {
            toast({
                title: "Invalid date range",
                description: "End date must be after start date",
                variant: "destructive",
            })
            return
        }

        setIsSubmitting(true)

        try {
            // In a real app, this would save the promo to the database
            const promoData = {
                id: isEditing ? editingPromo.id : Math.floor(Math.random() * 1000) + 6, // Generate a random ID for new promos
                name,
                code,
                type,
                value: type === "percentage" || type === "fixed" ? Number(value) : value,
                description,
                startDate: startDate?.toISOString().split("T")[0],
                endDate: endDate?.toISOString().split("T")[0],
                timeRestriction: timeRestriction || undefined,
                daysRestriction: daysRestriction.length > 0 ? daysRestriction : undefined,
                applicableCourts,
                minBookingDuration: Number(minBookingDuration),
                usageLimit: usageLimit ? Number(usageLimit) : undefined,
                userType: userType !== "all" ? userType : undefined,
                status: "active",
            }

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            if (isEditing) {
                if (onPromoUpdated) {
                    onPromoUpdated(promoData)
                }
                toast({
                    title: "Promotion updated",
                    description: `${name} has been updated successfully`,
                    variant: "default",
                })
            } else {
                if (onPromoAdded) {
                    onPromoAdded(promoData)
                }
                toast({
                    title: "Promotion created",
                    description: `${name} has been created successfully`,
                    variant: "default",
                })
            }

            // Close dialog
            onOpenChange(false)
        } catch (error) {
            console.error("Error saving promotion:", error)
            toast({
                title: "Error",
                description: "There was an error saving the promotion. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{isEditing ? "Edit Promotion" : "Create New Promotion"}</DialogTitle>
                    <DialogDescription>
                        {isEditing
                            ? "Update the details of your promotional offer"
                            : "Fill in the details to create a new promotional offer for court bookings"}
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="required">
                                Promotion Name
                            </Label>
                            <Input
                                id="name"
                                placeholder="e.g. Summer Special"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="code" className="required">
                                Promo Code
                            </Label>
                            <div className="flex gap-2">
                                <Input
                                    id="code"
                                    placeholder="e.g. SUMMER25"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                                    disabled={isSubmitting}
                                    className="uppercase"
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={generatePromoCode}
                                    disabled={isSubmitting}
                                    title="Generate random code"
                                >
                                    <Tag className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="type" className="required">
                                Discount Type
                            </Label>
                            <Select value={type} onValueChange={setType} disabled={isSubmitting}>
                                <SelectTrigger id="type">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="percentage">Percentage Discount</SelectItem>
                                    <SelectItem value="fixed">Fixed Amount Discount</SelectItem>
                                    <SelectItem value="bundle">Bundle (Buy X Get Y)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="value" className="required">
                                {type === "percentage"
                                    ? "Discount Percentage (%)"
                                    : type === "fixed"
                                        ? "Discount Amount ($)"
                                        : "Bundle Description"}
                            </Label>
                            {type === "bundle" ? (
                                <Input
                                    id="value"
                                    placeholder="e.g. Book 2 hours, get 1 hour free"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    disabled={isSubmitting}
                                />
                            ) : (
                                <Input
                                    id="value"
                                    type="number"
                                    min="0"
                                    step={type === "percentage" ? "1" : "0.01"}
                                    max={type === "percentage" ? "100" : undefined}
                                    placeholder={type === "percentage" ? "e.g. 25" : "e.g. 10.00"}
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    disabled={isSubmitting}
                                />
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Enter details about the promotion..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="startDate" className="required">
                                Start Date
                            </Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}
                                        disabled={isSubmitting}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {startDate ? format(startDate, "PPP") : "Select date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="endDate" className="required">
                                End Date
                            </Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}
                                        disabled={isSubmitting}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {endDate ? format(endDate, "PPP") : "Select date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={endDate}
                                        onSelect={setEndDate}
                                        initialFocus
                                        disabled={(date) => (startDate ? date < startDate : false)}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="timeRestriction">Time Restriction (Optional)</Label>
                        <Input
                            id="timeRestriction"
                            placeholder="e.g. 6:00 AM - 12:00 PM"
                            value={timeRestriction}
                            onChange={(e) => setTimeRestriction(e.target.value)}
                            disabled={isSubmitting}
                        />
                        <p className="text-xs text-muted-foreground">Specify time range when this promotion is valid</p>
                    </div>

                    <div className="space-y-2">
                        <Label>Day Restrictions (Optional)</Label>
                        <div className="flex flex-wrap gap-2">
                            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                                <Badge
                                    key={day}
                                    variant={daysRestriction.includes(day) ? "default" : "outline"}
                                    className="cursor-pointer"
                                    onClick={() => toggleDay(day)}
                                >
                                    {day.substring(0, 3)}
                                </Badge>
                            ))}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Select days when this promotion is valid. If none selected, valid all days.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label>Applicable Courts</Label>
                        <div className="flex flex-wrap gap-2">
                            <Badge
                                variant={applicableCourts.includes("All Courts") ? "default" : "outline"}
                                className="cursor-pointer"
                                onClick={() => setApplicableCourts(["All Courts"])}
                            >
                                All Courts
                            </Badge>
                            {["Court 1", "Court 2", "Court 3", "Court 4", "Court 5"].map((court) => (
                                <Badge
                                    key={court}
                                    variant={
                                        applicableCourts.includes(court) && !applicableCourts.includes("All Courts") ? "default" : "outline"
                                    }
                                    className="cursor-pointer"
                                    onClick={() => toggleCourt(court)}
                                >
                                    {court}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="minBookingDuration">Minimum Booking Duration (hours)</Label>
                            <Input
                                id="minBookingDuration"
                                type="number"
                                min="1"
                                step="0.5"
                                value={minBookingDuration}
                                onChange={(e) => setMinBookingDuration(e.target.value)}
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="usageLimit">Usage Limit (Optional)</Label>
                            <Input
                                id="usageLimit"
                                type="number"
                                min="1"
                                placeholder="Leave empty for unlimited"
                                value={usageLimit}
                                onChange={(e) => setUsageLimit(e.target.value)}
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="userType">User Type</Label>
                        <Select value={userType} onValueChange={setUserType} disabled={isSubmitting}>
                            <SelectTrigger id="userType">
                                <SelectValue placeholder="Select user type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Users</SelectItem>
                                <SelectItem value="new">New Users Only</SelectItem>
                                <SelectItem value="returning">Returning Users Only</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                {isEditing ? "Updating..." : "Creating..."}
                            </>
                        ) : isEditing ? (
                            "Update Promotion"
                        ) : (
                            "Create Promotion"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
