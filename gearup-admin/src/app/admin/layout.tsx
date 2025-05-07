"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Users, ShoppingCart, Settings, Package, FileText, MessageSquare, Bell, LogOut, MenuIcon, X } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function AdminLayout({
                                        children,
                                    }: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    const routes = [
        {
            name: "Dashboard",
            path: "/admin/dashboard",
            icon: BarChart3,
        },
        {
            name: "Users",
            path: "/admin/users",
            icon: Users,
        },
        {
            name: "Products",
            path: "/admin/products",
            icon: Package,
        },
        {
            name: "Bookings",
            path: "/admin/bookings",
            icon: ShoppingCart,
        },
        {
            name: "Reports",
            path: "/admin/reports",
            icon: FileText,
        },
        {
            name: "Messages",
            path: "/admin/messages",
            icon: MessageSquare,
        },
        {
            name: "Notifications",
            path: "/admin/notifications",
            icon: Bell,
        },
        {
            name: "Settings",
            path: "/admin/settings",
            icon: Settings,
        },
    ]

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            {/* Mobile sidebar toggle */}
            <Button
                variant="ghost"
                size="icon"
                className="fixed top-4 left-4 z-50 lg:hidden"
                onClick={toggleSidebar}
            >
                {isSidebarOpen ? <X /> : <MenuIcon />}
            </Button>

            {/* Sidebar */}
            <div
                className={cn(
                    "fixed inset-y-0 left-0 z-40 w-64 transform bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:w-64",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-center h-16 border-b dark:border-gray-700">
                        <Link href="/admin/dashboard" className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                                <span className="text-white font-bold">A</span>
                            </div>
                            <span className="ml-2 text-xl font-semibold dark:text-white">Admin Panel</span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto py-4 px-3">
                        <ul className="space-y-1">
                            {routes.map((route) => {
                                const isActive = pathname === route.path
                                return (
                                    <li key={route.path}>
                                        <Link
                                            href={route.path}
                                            className={cn(
                                                "flex items-center px-4 py-3 text-sm rounded-md transition-colors",
                                                isActive
                                                    ? "bg-primary text-primary-foreground"
                                                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            )}
                                            onClick={() => {
                                                if (window.innerWidth < 1024) {
                                                    setIsSidebarOpen(false)
                                                }
                                            }}
                                        >
                                            <route.icon className={cn("h-5 w-5 mr-3", isActive ? "text-primary-foreground" : "text-gray-500 dark:text-gray-400")} />
                                            {route.name}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>

                    {/* Logout button */}
                    <div className="p-4 border-t dark:border-gray-700">
                        <Button
                            variant="outline"
                            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                            onClick={() => {
                                // Handle logout logic here
                                console.log("Logging out...")
                            }}
                        >
                            <LogOut className="h-5 w-5 mr-3" />
                            Logout
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Content area */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 dark:bg-gray-900">
                    {children}
                </main>
            </div>
        </div>
    )
}
