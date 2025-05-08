"use client"

import type React from "react"

import { useState, useRef } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { ImagePlus, Upload, X, Loader2 } from "lucide-react"

interface AddCourtDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onCourtAdded?: (court: any) => void
}

export function AddCourtDialog({ open, onOpenChange, onCourtAdded }: AddCourtDialogProps) {
    // Form state
    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [size, setSize] = useState("")
    const [hourlyRate, setHourlyRate] = useState("")
    const [description, setDescription] = useState("")
    const [isActive, setIsActive] = useState(true)

    // Image upload state
    const [courtImage, setCourtImage] = useState<File | null>(null)
    const [courtImagePreview, setCourtImagePreview] = useState<string | null>(null)
    const [logoImage, setLogoImage] = useState<File | null>(null)
    const [logoImagePreview, setLogoImagePreview] = useState<string | null>(null)
    const [isUploading, setIsUploading] = useState(false)

    // Refs for file inputs
    const courtImageInputRef = useRef<HTMLInputElement>(null)
    const logoImageInputRef = useRef<HTMLInputElement>(null)

    // Handle court image selection
    const handleCourtImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]

            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                toast({
                    title: "File too large",
                    description: "Court image must be less than 5MB",
                    variant: "destructive",
                })
                return
            }

            // Check file type
            if (!file.type.startsWith("image/")) {
                toast({
                    title: "Invalid file type",
                    description: "Please upload an image file",
                    variant: "destructive",
                })
                return
            }

            setCourtImage(file)
            const reader = new FileReader()
            reader.onload = () => {
                setCourtImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    // Handle logo image selection
    const handleLogoImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]

            // Check file size (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                toast({
                    title: "File too large",
                    description: "Logo image must be less than 2MB",
                    variant: "destructive",
                })
                return
            }

            // Check file type
            if (!file.type.startsWith("image/")) {
                toast({
                    title: "Invalid file type",
                    description: "Please upload an image file",
                    variant: "destructive",
                })
                return
            }

            setLogoImage(file)
            const reader = new FileReader()
            reader.onload = () => {
                setLogoImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    // Remove court image
    const removeCourtImage = () => {
        setCourtImage(null)
        setCourtImagePreview(null)
        if (courtImageInputRef.current) {
            courtImageInputRef.current.value = ""
        }
    }

    // Remove logo image
    const removeLogoImage = () => {
        setLogoImage(null)
        setLogoImagePreview(null)
        if (logoImageInputRef.current) {
            logoImageInputRef.current.value = ""
        }
    }

    // Handle form submission
    const handleSubmit = async () => {
        // Validate form
        if (!name) {
            toast({
                title: "Missing information",
                description: "Court name is required",
                variant: "destructive",
            })
            return
        }

        if (!type) {
            toast({
                title: "Missing information",
                description: "Court type is required",
                variant: "destructive",
            })
            return
        }

        if (!size) {
            toast({
                title: "Missing information",
                description: "Court size is required",
                variant: "destructive",
            })
            return
        }

        if (!hourlyRate || isNaN(Number(hourlyRate)) || Number(hourlyRate) <= 0) {
            toast({
                title: "Invalid hourly rate",
                description: "Please enter a valid hourly rate",
                variant: "destructive",
            })
            return
        }

        setIsUploading(true)

        try {
            // In a real app, this would upload the images to a server and get URLs back
            // For this demo, we'll simulate a delay and use the preview URLs
            await new Promise((resolve) => setTimeout(resolve, 1500))

            const newCourt = {
                id: Math.floor(Math.random() * 1000) + 6, // Generate a random ID
                name,
                type,
                size,
                hourlyRate: Number(hourlyRate),
                description,
                status: isActive ? "Available" : "Maintenance",
                bookingsToday: 0,
                image: courtImagePreview || "/placeholder.svg?height=40&width=40",
                logo: logoImagePreview || null,
            }

            // In a real app, this would save the court to the database
            console.log("New court:", newCourt)

            // Call the onCourtAdded callback if provided
            if (onCourtAdded) {
                onCourtAdded(newCourt)
            }

            toast({
                title: "Court added",
                description: `${name} has been added successfully`,
                variant: "default",
            })

            // Reset form
            setName("")
            setType("")
            setSize("")
            setHourlyRate("")
            setDescription("")
            setIsActive(true)
            setCourtImage(null)
            setCourtImagePreview(null)
            setLogoImage(null)
            setLogoImagePreview(null)

            // Close dialog
            onOpenChange(false)
        } catch (error) {
            console.error("Error adding court:", error)
            toast({
                title: "Error",
                description: "There was an error adding the court. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Add New Court</DialogTitle>
                    <DialogDescription>Fill in the details to add a new futsal court to your facility.</DialogDescription>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="required">
                                Court Name
                            </Label>
                            <Input
                                id="name"
                                placeholder="e.g. Court 1"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={isUploading}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="type" className="required">
                                Court Type
                            </Label>
                            <Select value={type} onValueChange={setType} disabled={isUploading}>
                                <SelectTrigger id="type">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Indoor">Indoor</SelectItem>
                                    <SelectItem value="Outdoor">Outdoor</SelectItem>
                                    <SelectItem value="Covered">Covered Outdoor</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="size" className="required">
                                Court Size
                            </Label>
                            <Select value={size} onValueChange={setSize} disabled={isUploading}>
                                <SelectTrigger id="size">
                                    <SelectValue placeholder="Select size" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="5-a-side">5-a-side</SelectItem>
                                    <SelectItem value="7-a-side">7-a-side</SelectItem>
                                    <SelectItem value="11-a-side">11-a-side</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="hourlyRate" className="required">
                                Hourly Rate ($)
                            </Label>
                            <Input
                                id="hourlyRate"
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="e.g. 50.00"
                                value={hourlyRate}
                                onChange={(e) => setHourlyRate(e.target.value)}
                                disabled={isUploading}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Enter details about the court..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={isUploading}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        {/* Court Image Upload */}
                        <div className="space-y-2">
                            <Label htmlFor="courtImage">Court Image (Rectangular)</Label>
                            <div className="border-2 border-dashed rounded-md p-4 text-center">
                                {courtImagePreview ? (
                                    <div className="relative">
                                        <img
                                            src={courtImagePreview || "/placeholder.svg"}
                                            alt="Court preview"
                                            className="mx-auto h-40 object-cover rounded-md"
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-2 right-2 h-6 w-6"
                                            onClick={removeCourtImage}
                                            disabled={isUploading}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ) : (
                                    <>
                                        <ImagePlus className="mx-auto h-10 w-10 text-muted-foreground" />
                                        <p className="mt-2 text-sm text-muted-foreground">Click to upload court image</p>
                                        <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 5MB</p>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="mt-2"
                                            onClick={() => courtImageInputRef.current?.click()}
                                            disabled={isUploading}
                                        >
                                            <Upload className="mr-2 h-4 w-4" />
                                            Upload Image
                                        </Button>
                                    </>
                                )}
                                <input
                                    ref={courtImageInputRef}
                                    type="file"
                                    id="courtImage"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleCourtImageChange}
                                    disabled={isUploading}
                                />
                            </div>
                        </div>

                        {/* Logo Image Upload */}
                        <div className="space-y-2">
                            <Label htmlFor="logoImage">Court Logo</Label>
                            <div className="border-2 border-dashed rounded-md p-4 text-center">
                                {logoImagePreview ? (
                                    <div className="relative">
                                        <img
                                            src={logoImagePreview || "/placeholder.svg"}
                                            alt="Logo preview"
                                            className="mx-auto h-40 object-contain rounded-md"
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-2 right-2 h-6 w-6"
                                            onClick={removeLogoImage}
                                            disabled={isUploading}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ) : (
                                    <>
                                        <ImagePlus className="mx-auto h-10 w-10 text-muted-foreground" />
                                        <p className="mt-2 text-sm text-muted-foreground">Click to upload court logo</p>
                                        <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 2MB</p>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="mt-2"
                                            onClick={() => logoImageInputRef.current?.click()}
                                            disabled={isUploading}
                                        >
                                            <Upload className="mr-2 h-4 w-4" />
                                            Upload Logo
                                        </Button>
                                    </>
                                )}
                                <input
                                    ref={logoImageInputRef}
                                    type="file"
                                    id="logoImage"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleLogoImageChange}
                                    disabled={isUploading}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Switch id="isActive" checked={isActive} onCheckedChange={setIsActive} disabled={isUploading} />
                        <Label htmlFor="isActive">Court is active and available for booking</Label>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isUploading}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={isUploading}>
                        {isUploading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Adding Court...
                            </>
                        ) : (
                            "Add Court"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
