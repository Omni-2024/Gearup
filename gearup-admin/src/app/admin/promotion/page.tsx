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
import { MoreHorizontal, Search, Plus, Edit, Trash, Copy, BarChart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreatePromoDialog } from "@/components/create-promo-dialog"
import { toast } from "@/components/ui/use-toast"

// Mock data for promotions
const initialPromotions = [
    {
        id: 1,
        name: "Summer Special",
        code: "SUMMER25",
        type: "percentage",
        value: 25,
        startDate: "2023-06-01",
        endDate: "2023-08-31",
        applicableCourts: ["All Courts"],
        minBookingDuration: 1,
        usageLimit: 100,
        usedCount: 45,
        status: "active",
        description: "25% off all court bookings during summer",
    },
    {
        id: 2,
        name: "Weekday Morning",
        code: "MORNING10",
        type: "fixed",
        value: 10,
        startDate: "2023-05-01",
        endDate: "2023-12-31",
        applicableCourts: ["Court 1", "Court 2"],
        timeRestriction: "6:00 AM - 12:00 PM",
        daysRestriction: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        minBookingDuration: 1,
        usageLimit: 200,
        usedCount: 78,
        status: "active",
        description: "$10 off weekday morning bookings",
    },
    {
        id: 3,
        name: "Weekend Bundle",
        code: "WEEKEND",
        type: "bundle",
        value: "Book 2 hours, get 1 hour free",
        startDate: "2023-05-01",
        endDate: "2023-12-31",
        applicableCourts: ["All Courts"],
        daysRestriction: ["Saturday", "Sunday"],
        minBookingDuration: 2,
        usageLimit: 50,
        usedCount: 12,
        status: "active",
        description: "Book 2 hours on weekends, get an additional hour free",
    },
    {
        id: 4,
        name: "New User Discount",
        code: "NEWUSER",
        type: "percentage",
        value: 50,
        startDate: "2023-01-01",
        endDate: "2023-12-31",
        applicableCourts: ["All Courts"],
        userType: "new",
        usageLimit: 1,
        usedCount: 120,
        status: "active",
        description: "50% off first booking for new users",
    },
    {
        id: 5,
        name: "Holiday Special",
        code: "HOLIDAY20",
        type: "percentage",
        value: 20,
        startDate: "2023-12-15",
        endDate: "2024-01-15",
        applicableCourts: ["All Courts"],
        minBookingDuration: 1,
        usageLimit: 100,
        usedCount: 0,
        status: "inactive",
        description: "20% off all court bookings during holiday season",
    },
]

export default function PromotionsPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [promotions, setPromotions] = useState(initialPromotions)
    const [isCreatePromoOpen, setIsCreatePromoOpen] = useState(false)
    const [selectedPromo, setSelectedPromo] = useState<any>(null)

    const filteredPromotions = promotions.filter(
        (promo) =>
            (promo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                promo.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                promo.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (statusFilter === "all" || promo.status === statusFilter),
    )

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "active":
                return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
            case "inactive":
                return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
            case "expired":
                return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
            case "scheduled":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
        }
    }

    const getPromoTypeLabel = (type: string, value: any) => {
        switch (type) {
            case "percentage":
                return `${value}% off`
            case "fixed":
                return `$${value} off`
            case "bundle":
                return value
            default:
                return type
        }
    }

    const handleAddPromo = (newPromo: any) => {
        setPromotions([...promotions, { ...newPromo, id: promotions.length + 1, usedCount: 0 }])
    }

    const handleEditPromo = (promo: any) => {
        setSelectedPromo(promo)
        setIsCreatePromoOpen(true)
    }

    const handleUpdatePromo = (updatedPromo: any) => {
        setPromotions(
            promotions.map((promo) =>
                promo.id === updatedPromo.id ? { ...updatedPromo, usedCount: promo.usedCount } : promo,
            ),
        )
    }

    const handleDeletePromo = (id: number) => {
        const promo = promotions.find((p) => p.id === id)
        if (promo && promo.usedCount > 0) {
            toast({
                title: "Cannot delete promotion",
                description: `This promotion has been used ${promo.usedCount} times and cannot be deleted.`,
                variant: "destructive",
            })
            return
        }

        if (confirm(`Are you sure you want to delete this promotion?`)) {
            setPromotions(promotions.filter((promo) => promo.id !== id))
            toast({
                title: "Promotion deleted",
                description: "The promotion has been deleted successfully.",
                variant: "default",
            })
        }
    }

    const handleToggleStatus = (id: number) => {
        setPromotions(
            promotions.map((promo) =>
                promo.id === id ? { ...promo, status: promo.status === "active" ? "inactive" : "active" } : promo,
            ),
        )
    }

    const handleCopyPromoCode = (code: string) => {
        navigator.clipboard.writeText(code)
        toast({
            title: "Promo code copied",
            description: `${code} has been copied to clipboard.`,
            variant: "default",
        })
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Promotions</h1>
                    <p className="text-muted-foreground">Create and manage promotional offers for court bookings</p>
                </div>
                <Button
                    className="w-full md:w-auto"
                    onClick={() => {
                        setSelectedPromo(null)
                        setIsCreatePromoOpen(true)
                    }}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Promotion
                </Button>
            </div>

            <Tabs defaultValue="active" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="active" onClick={() => setStatusFilter("active")}>
                        Active
                    </TabsTrigger>
                    <TabsTrigger value="inactive" onClick={() => setStatusFilter("inactive")}>
                        Inactive
                    </TabsTrigger>
                    <TabsTrigger value="all" onClick={() => setStatusFilter("all")}>
                        All Promotions
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="active" className="space-y-4">
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div>
                                    <CardTitle>Active Promotions</CardTitle>
                                    <CardDescription>Currently active promotional offers</CardDescription>
                                </div>
                                <div className="relative w-full md:w-64">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Search promotions..."
                                        className="pl-8 w-full"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Code</TableHead>
                                            <TableHead>Discount</TableHead>
                                            <TableHead>Validity</TableHead>
                                            <TableHead>Usage</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredPromotions.length > 0 ? (
                                            filteredPromotions.map((promo) => (
                                                <TableRow key={promo.id}>
                                                    <TableCell className="font-medium">
                                                        <div>
                                                            {promo.name}
                                                            <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                                                                {promo.description}
                                                            </p>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-1">
                                                            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                                                                {promo.code}
                                                            </code>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-6 w-6"
                                                                onClick={() => handleCopyPromoCode(promo.code)}
                                                            >
                                                                <Copy className="h-3 w-3" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>{getPromoTypeLabel(promo.type, promo.value)}</TableCell>
                                                    <TableCell>
                                                        <div className="flex flex-col">
                              <span className="text-xs">
                                {new Date(promo.startDate).toLocaleDateString()} -{" "}
                                  {new Date(promo.endDate).toLocaleDateString()}
                              </span>
                                                            {promo.timeRestriction && (
                                                                <span className="text-xs text-muted-foreground">{promo.timeRestriction}</span>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex flex-col">
                              <span>
                                {promo.usedCount} / {promo.usageLimit || "∞"}
                              </span>
                                                            {promo.usageLimit && (
                                                                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                                                    <div
                                                                        className="bg-primary h-1.5 rounded-full"
                                                                        style={{
                                                                            width: `${Math.min((promo.usedCount / promo.usageLimit) * 100, 100)}%`,
                                                                        }}
                                                                    ></div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <Switch
                                                                checked={promo.status === "active"}
                                                                onCheckedChange={() => handleToggleStatus(promo.id)}
                                                            />
                                                            <Badge className={getStatusColor(promo.status)} variant="outline">
                                                                {promo.status.charAt(0).toUpperCase() + promo.status.slice(1)}
                                                            </Badge>
                                                        </div>
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
                                                                <DropdownMenuItem onClick={() => handleEditPromo(promo)}>
                                                                    <Edit className="mr-2 h-4 w-4" />
                                                                    Edit
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem onClick={() => handleCopyPromoCode(promo.code)}>
                                                                    <Copy className="mr-2 h-4 w-4" />
                                                                    Copy Code
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    <BarChart className="mr-2 h-4 w-4" />
                                                                    View Analytics
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem
                                                                    onClick={() => handleDeletePromo(promo.id)}
                                                                    className="text-red-600 focus:text-red-600"
                                                                >
                                                                    <Trash className="mr-2 h-4 w-4" />
                                                                    Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                                                    No promotions found matching your search criteria.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="inactive" className="space-y-4">
                    {/* Same table structure as active, but for inactive promotions */}
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div>
                                    <CardTitle>Inactive Promotions</CardTitle>
                                    <CardDescription>Disabled or scheduled promotional offers</CardDescription>
                                </div>
                                <div className="relative w-full md:w-64">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Search promotions..."
                                        className="pl-8 w-full"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Code</TableHead>
                                            <TableHead>Discount</TableHead>
                                            <TableHead>Validity</TableHead>
                                            <TableHead>Usage</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredPromotions.length > 0 ? (
                                            filteredPromotions.map((promo) => (
                                                <TableRow key={promo.id}>
                                                    <TableCell className="font-medium">
                                                        <div>
                                                            {promo.name}
                                                            <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                                                                {promo.description}
                                                            </p>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-1">
                                                            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                                                                {promo.code}
                                                            </code>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-6 w-6"
                                                                onClick={() => handleCopyPromoCode(promo.code)}
                                                            >
                                                                <Copy className="h-3 w-3" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>{getPromoTypeLabel(promo.type, promo.value)}</TableCell>
                                                    <TableCell>
                                                        <div className="flex flex-col">
                              <span className="text-xs">
                                {new Date(promo.startDate).toLocaleDateString()} -{" "}
                                  {new Date(promo.endDate).toLocaleDateString()}
                              </span>
                                                            {promo.timeRestriction && (
                                                                <span className="text-xs text-muted-foreground">{promo.timeRestriction}</span>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex flex-col">
                              <span>
                                {promo.usedCount} / {promo.usageLimit || "∞"}
                              </span>
                                                            {promo.usageLimit && (
                                                                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                                                    <div
                                                                        className="bg-primary h-1.5 rounded-full"
                                                                        style={{
                                                                            width: `${Math.min((promo.usedCount / promo.usageLimit) * 100, 100)}%`,
                                                                        }}
                                                                    ></div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <Switch
                                                                checked={promo.status === "active"}
                                                                onCheckedChange={() => handleToggleStatus(promo.id)}
                                                            />
                                                            <Badge className={getStatusColor(promo.status)} variant="outline">
                                                                {promo.status.charAt(0).toUpperCase() + promo.status.slice(1)}
                                                            </Badge>
                                                        </div>
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
                                                                <DropdownMenuItem onClick={() => handleEditPromo(promo)}>
                                                                    <Edit className="mr-2 h-4 w-4" />
                                                                    Edit
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem onClick={() => handleCopyPromoCode(promo.code)}>
                                                                    <Copy className="mr-2 h-4 w-4" />
                                                                    Copy Code
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    <BarChart className="mr-2 h-4 w-4" />
                                                                    View Analytics
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem
                                                                    onClick={() => handleDeletePromo(promo.id)}
                                                                    className="text-red-600 focus:text-red-600"
                                                                >
                                                                    <Trash className="mr-2 h-4 w-4" />
                                                                    Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                                                    No promotions found matching your search criteria.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="all" className="space-y-4">
                    {/* Same table structure as active, but for all promotions */}
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div>
                                    <CardTitle>All Promotions</CardTitle>
                                    <CardDescription>Complete list of all promotional offers</CardDescription>
                                </div>
                                <div className="relative w-full md:w-64">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Search promotions..."
                                        className="pl-8 w-full"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Code</TableHead>
                                            <TableHead>Discount</TableHead>
                                            <TableHead>Validity</TableHead>
                                            <TableHead>Usage</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredPromotions.length > 0 ? (
                                            filteredPromotions.map((promo) => (
                                                <TableRow key={promo.id}>
                                                    <TableCell className="font-medium">
                                                        <div>
                                                            {promo.name}
                                                            <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                                                                {promo.description}
                                                            </p>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-1">
                                                            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                                                                {promo.code}
                                                            </code>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-6 w-6"
                                                                onClick={() => handleCopyPromoCode(promo.code)}
                                                            >
                                                                <Copy className="h-3 w-3" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>{getPromoTypeLabel(promo.type, promo.value)}</TableCell>
                                                    <TableCell>
                                                        <div className="flex flex-col">
                              <span className="text-xs">
                                {new Date(promo.startDate).toLocaleDateString()} -{" "}
                                  {new Date(promo.endDate).toLocaleDateString()}
                              </span>
                                                            {promo.timeRestriction && (
                                                                <span className="text-xs text-muted-foreground">{promo.timeRestriction}</span>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex flex-col">
                              <span>
                                {promo.usedCount} / {promo.usageLimit || "∞"}
                              </span>
                                                            {promo.usageLimit && (
                                                                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                                                    <div
                                                                        className="bg-primary h-1.5 rounded-full"
                                                                        style={{
                                                                            width: `${Math.min((promo.usedCount / promo.usageLimit) * 100, 100)}%`,
                                                                        }}
                                                                    ></div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <Switch
                                                                checked={promo.status === "active"}
                                                                onCheckedChange={() => handleToggleStatus(promo.id)}
                                                            />
                                                            <Badge className={getStatusColor(promo.status)} variant="outline">
                                                                {promo.status.charAt(0).toUpperCase() + promo.status.slice(1)}
                                                            </Badge>
                                                        </div>
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
                                                                <DropdownMenuItem onClick={() => handleEditPromo(promo)}>
                                                                    <Edit className="mr-2 h-4 w-4" />
                                                                    Edit
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem onClick={() => handleCopyPromoCode(promo.code)}>
                                                                    <Copy className="mr-2 h-4 w-4" />
                                                                    Copy Code
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    <BarChart className="mr-2 h-4 w-4" />
                                                                    View Analytics
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem
                                                                    onClick={() => handleDeletePromo(promo.id)}
                                                                    className="text-red-600 focus:text-red-600"
                                                                >
                                                                    <Trash className="mr-2 h-4 w-4" />
                                                                    Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                                                    No promotions found matching your search criteria.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <CreatePromoDialog
                open={isCreatePromoOpen}
                onOpenChange={setIsCreatePromoOpen}
                onPromoAdded={handleAddPromo}
                onPromoUpdated={handleUpdatePromo}
                editingPromo={selectedPromo}
            />
        </div>
    )
}
