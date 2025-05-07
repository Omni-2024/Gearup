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
import { MoreHorizontal, Plus, Search, Edit, Trash, Package } from 'lucide-react'
import { Badge } from "@/components/ui/badge"

// Mock data for products
const products = [
    {
        id: 1,
        name: "Premium Headphones",
        category: "Electronics",
        price: 199.99,
        stock: 45,
        status: "In Stock",
        image: "/placeholder.svg?height=40&width=40",
    },
    {
        id: 2,
        name: "Wireless Keyboard",
        category: "Electronics",
        price: 59.99,
        stock: 32,
        status: "In Stock",
        image: "/placeholder.svg?height=40&width=40",
    },
    {
        id: 3,
        name: "Ergonomic Chair",
        category: "Furniture",
        price: 249.99,
        stock: 0,
        status: "Out of Stock",
        image: "/placeholder.svg?height=40&width=40",
    },
    {
        id: 4,
        name: "Smart Watch",
        category: "Electronics",
        price: 299.99,
        stock: 18,
        status: "In Stock",
        image: "/placeholder.svg?height=40&width=40",
    },
    {
        id: 5,
        name: "Desk Lamp",
        category: "Home",
        price: 39.99,
        stock: 5,
        status: "Low Stock",
        image: "/placeholder.svg?height=40&width=40",
    },
    {
        id: 6,
        name: "Bluetooth Speaker",
        category: "Electronics",
        price: 79.99,
        stock: 27,
        status: "In Stock",
        image: "/placeholder.svg?height=40&width=40",
    },
    {
        id: 7,
        name: "Coffee Maker",
        category: "Kitchen",
        price: 129.99,
        stock: 0,
        status: "Out of Stock",
        image: "/placeholder.svg?height=40&width=40",
    },
    {
        id: 8,
        name: "Backpack",
        category: "Fashion",
        price: 49.99,
        stock: 12,
        status: "In Stock",
        image: "/placeholder.svg?height=40&width=40",
    },
]

export default function ProductsPage() {
    const [searchTerm, setSearchTerm] = useState("")

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "in stock":
                return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
            case "out of stock":
                return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
            case "low stock":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Products</h1>
                    <p className="text-muted-foreground">
                        Manage your product inventory
                    </p>
                </div>
                <Button className="w-full md:w-auto">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Product
                </Button>
            </div>

            <Card>
                <CardHeader className="pb-3">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <CardTitle>All Products</CardTitle>
                            <CardDescription>
                                A list of all products including their name, price and stock status
                            </CardDescription>
                        </div>
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search products..."
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
                                    <TableHead>Product</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Stock</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-2">
                                                    <img
                                                        src={product.image || "/placeholder.svg"}
                                                        alt={product.name}
                                                        className="rounded w-8 h-8 object-cover"
                                                    />
                                                    {product.name}
                                                </div>
                                            </TableCell>
                                            <TableCell>{product.category}</TableCell>
                                            <TableCell>${product.price.toFixed(2)}</TableCell>
                                            <TableCell>{product.stock}</TableCell>
                                            <TableCell>
                                                <Badge className={getStatusColor(product.status)} variant="outline">
                                                    {product.status}
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
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
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
                                        <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                                            No products found matching your search criteria.
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
