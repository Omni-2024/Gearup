'use client'
import { useState } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Search, Eye, Download, ShoppingCart } from 'lucide-react'
import { Badge } from "@/components/ui/badge"

// Mock data for orders
const orders = [
    {
        id: "#ORD-001",
        customer: "John Doe",
        date: "2023-05-15",
        total: 299.99,
        status: "Completed",
        items: 3,
    },
    {
        id: "#ORD-002",
        customer: "Jane Smith",
        date: "2023-05-14",
        total: 159.95,
        status: "Processing",
        items: 2,
    },
    {
        id: "#ORD-003",
        customer: "Robert Johnson",
        date: "2023-05-13",
        total: 499.99,
        status: "Shipped",
        items: 1,
    },
    {
        id: "#ORD-004",
        customer: "Emily Davis",
        date: "2023-05-12",
        total: 89.99,
        status: "Completed",
        items: 1,
    },
    {
        id: "#ORD-005",
        customer: "Michael Wilson",
        date: "2023-05-11",
        total: 249.95,
        status: "Cancelled",
        items: 2,
    },
    {
        id: "#ORD-006",
        customer: "Sarah Brown",
        date: "2023-05-10",
        total: 349.99,
        status: "Processing",
        items: 4,
    },
    {
        id: "#ORD-007",
        customer: "David Miller",
        date: "2023-05-09",
        total: 129.99,
        status: "Shipped",
        items: 1,
    },
    {
        id: "#ORD-008",
        customer: "Lisa Anderson",
        date: "2023-05-08",
        total: 199.95,
        status: "Completed",
        items: 2,
    },
]

export default function OrdersPage() {
    const [searchTerm, setSearchTerm] = useState("")

    const filteredOrders = orders.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.status.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "completed":
                return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
            case "processing":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
            case "shipped":
                return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
            case "cancelled":
                return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
                <p className="text-muted-foreground">
                    View and manage customer orders
                </p>
            </div>

            <Card>
                <CardHeader className="pb-3">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <CardTitle>All Orders</CardTitle>
                            <CardDescription>
                                A list of all orders including their status and total amount
                            </CardDescription>
                        </div>
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search orders..."
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
                                    <TableHead>Order ID</TableHead>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Items</TableHead>
                                    <TableHead>Total</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredOrders.length > 0 ? (
                                    filteredOrders.map((order) => (
                                        <TableRow key={order.id}>
                                            <TableCell className="font-medium">{order.id}</TableCell>
                                            <TableCell>{order.customer}</TableCell>
                                            <TableCell>{order.date}</TableCell>
                                            <TableCell>{order.items}</TableCell>
                                            <TableCell>${order.total.toFixed(2)}</TableCell>
                                            <TableCell>
                                                <Badge className={getStatusColor(order.status)} variant="outline">
                                                    {order.status}
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
                                                        <DropdownMenuItem>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View Details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Download className="mr-2 h-4 w-4" />
                                                            Download Invoice
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                                            No orders found matching your search criteria.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
