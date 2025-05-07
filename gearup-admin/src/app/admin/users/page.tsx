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
import { MoreHorizontal, Plus, Search, Edit, Trash, UserPlus } from 'lucide-react'
import { Badge } from "@/components/ui/badge"

// Mock data for users
const users = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "Admin",
        status: "Active",
        lastActive: "2 hours ago",
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        role: "Editor",
        status: "Active",
        lastActive: "1 day ago",
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        id: 3,
        name: "Robert Johnson",
        email: "robert@example.com",
        role: "User",
        status: "Inactive",
        lastActive: "1 week ago",
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        id: 4,
        name: "Emily Davis",
        email: "emily@example.com",
        role: "User",
        status: "Active",
        lastActive: "3 hours ago",
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        id: 5,
        name: "Michael Wilson",
        email: "michael@example.com",
        role: "Editor",
        status: "Active",
        lastActive: "Just now",
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        id: 6,
        name: "Sarah Brown",
        email: "sarah@example.com",
        role: "User",
        status: "Suspended",
        lastActive: "2 days ago",
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        id: 7,
        name: "David Miller",
        email: "david@example.com",
        role: "User",
        status: "Active",
        lastActive: "5 hours ago",
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        id: 8,
        name: "Lisa Anderson",
        email: "lisa@example.com",
        role: "Editor",
        status: "Active",
        lastActive: "1 day ago",
        avatar: "/placeholder.svg?height=40&width=40",
    },
]

export default function UsersPage() {
    const [searchTerm, setSearchTerm] = useState("")

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "active":
                return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
            case "inactive":
                return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
            case "suspended":
                return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Users</h1>
                    <p className="text-muted-foreground">
                        Manage user accounts and permissions
                    </p>
                </div>
                <Button className="w-full md:w-auto">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add New User
                </Button>
            </div>

            <Card>
                <CardHeader className="pb-3">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <CardTitle>All Users</CardTitle>
                            <CardDescription>
                                A list of all users including their name, email and role
                            </CardDescription>
                        </div>
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search users..."
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
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Last Active</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-2">
                                                    <img
                                                        src={user.avatar || "/placeholder.svg"}
                                                        alt={user.name}
                                                        className="rounded-full w-8 h-8"
                                                    />
                                                    {user.name}
                                                </div>
                                            </TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.role}</TableCell>
                                            <TableCell>
                                                <Badge className={getStatusColor(user.status)} variant="outline">
                                                    {user.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{user.lastActive}</TableCell>
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
                                            No users found matching your search criteria.
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
