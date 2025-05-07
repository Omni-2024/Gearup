"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSnapshot } from "valtio"
import { store } from "@/state/store"
import { login, requestPasswordReset, verifyOtp, resetPassword } from "@/services/authService"
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, ArrowLeft, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
    const [activeView, setActiveView] = useState<"login" | "forgotPassword" | "verifyOtp" | "resetPassword">("login")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [otp, setOtp] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formError, setFormError] = useState<string | null>(null)

    const snap = useSnapshot(store)
    const router = useRouter()
    const { toast } = useToast()

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        if (!email || !password) {
            setFormError("Please enter both email and password")
            return
        }

        setIsSubmitting(true)
        store.loading = true
        store.error = null

        try {
            const res = await login(email, password)
            const { accessToken, user } = res.data
            store.user = { ...user, token: accessToken }
            toast({
                title: "Login successful",
                description: "Welcome back!",
            })
            router.push("/")
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Login failed"
            store.error = errorMessage
            setFormError(errorMessage)
        } finally {
            setIsSubmitting(false)
            store.loading = false
        }
    }

    async function handleRequestPasswordReset(e: React.FormEvent) {
        e.preventDefault()
        if (!email) {
            setFormError("Please enter your email address")
            return
        }

        setIsSubmitting(true)
        setFormError(null)

        try {
            await requestPasswordReset(email)
            toast({
                title: "OTP Sent",
                description: "Please check your email for the verification code",
            })
            setActiveView("verifyOtp")
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Failed to send OTP"
            setFormError(errorMessage)
        } finally {
            setIsSubmitting(false)
        }
    }

    async function handleVerifyOtp(e: React.FormEvent) {
        e.preventDefault()
        if (!otp) {
            setFormError("Please enter the OTP sent to your email")
            return
        }

        setIsSubmitting(true)
        setFormError(null)

        try {
            await verifyOtp(email, otp)
            toast({
                title: "OTP Verified",
                description: "You can now reset your password",
            })
            setActiveView("resetPassword")
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Invalid OTP"
            setFormError(errorMessage)
        } finally {
            setIsSubmitting(false)
        }
    }

    async function handleResetPassword(e: React.FormEvent) {
        e.preventDefault()
        if (!newPassword || !confirmPassword) {
            setFormError("Please fill in all fields")
            return
        }

        if (newPassword !== confirmPassword) {
            setFormError("Passwords do not match")
            return
        }

        if (newPassword.length < 8) {
            setFormError("Password must be at least 8 characters long")
            return
        }

        setIsSubmitting(true)
        setFormError(null)

        try {
            await resetPassword(email, otp, newPassword)
            toast({
                title: "Password Reset Successful",
                description: "You can now login with your new password",
            })
            setActiveView("login")
            setPassword("")
            setOtp("")
            setNewPassword("")
            setConfirmPassword("")
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Failed to reset password"
            setFormError(errorMessage)
        } finally {
            setIsSubmitting(false)
        }
    }

    const renderLoginForm = () => (
        <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    autoComplete="email"
                />
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Button
                        variant="link"
                        className="p-0 h-auto text-xs"
                        onClick={(e) => {
                            e.preventDefault()
                            setActiveView("forgotPassword")
                        }}
                    >
                        Forgot password?
                    </Button>
                </div>
                <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isSubmitting}
                    autoComplete="current-password"
                />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Logging in...
                    </>
                ) : (
                    "Login"
                )}
            </Button>
        </form>
    )

    const renderForgotPasswordForm = () => (
        <form onSubmit={handleRequestPasswordReset} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="reset-email">Email</Label>
                <Input
                    id="reset-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending OTP...
                    </>
                ) : (
                    "Send OTP"
                )}
            </Button>

            <Button type="button" variant="outline" className="w-full" onClick={() => setActiveView("login")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
            </Button>
        </form>
    )

    const renderVerifyOtpForm = () => (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="otp">Verification Code</Label>
                <Input
                    id="otp"
                    type="text"
                    placeholder="Enter OTP sent to your email"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    disabled={isSubmitting}
                    maxLength={6}
                    className="text-center text-lg tracking-widest"
                />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                    </>
                ) : (
                    "Verify OTP"
                )}
            </Button>

            <div className="flex justify-between items-center">
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                        e.preventDefault()
                        handleRequestPasswordReset(e)
                    }}
                    disabled={isSubmitting}
                >
                    Resend OTP
                </Button>

                <Button type="button" variant="outline" size="sm" onClick={() => setActiveView("login")}>
                    Back to Login
                </Button>
            </div>
        </form>
    )

    const renderResetPasswordForm = () => (
        <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                    id="new-password"
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={isSubmitting}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isSubmitting}
                />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Resetting Password...
                    </>
                ) : (
                    "Reset Password"
                )}
            </Button>

            <Button type="button" variant="outline" className="w-full" onClick={() => setActiveView("login")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
            </Button>
        </form>
    )

    const renderActiveView = () => {
        switch (activeView) {
            case "forgotPassword":
                return renderForgotPasswordForm()
            case "verifyOtp":
                return renderVerifyOtpForm()
            case "resetPassword":
                return renderResetPasswordForm()
            default:
                return renderLoginForm()
        }
    }

    const getCardTitle = () => {
        switch (activeView) {
            case "forgotPassword":
                return "Forgot Password"
            case "verifyOtp":
                return "Verify OTP"
            case "resetPassword":
                return "Reset Password"
            default:
                return "Login"
        }
    }

    const getCardDescription = () => {
        switch (activeView) {
            case "forgotPassword":
                return "Enter your email to receive a verification code"
            case "verifyOtp":
                return "Enter the verification code sent to your email"
            case "resetPassword":
                return "Create a new password for your account"
            default:
                return "Sign in to your account"
        }
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-no-repeat bg-cover bg-center bg-fixed"
            style={{ backgroundImage: "url('/assets/Website-BG.png')" }}
        >            <Card className="w-full max-w-md shadow-lg border-gray-200">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">{getCardTitle()}</CardTitle>
                    <CardDescription className="text-center">{getCardDescription()}</CardDescription>
                </CardHeader>
                <CardContent>
                    {(formError || snap.error) && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{formError || snap.error}</AlertDescription>
                        </Alert>
                    )}

                    {renderActiveView()}
                </CardContent>

                {activeView === "login" && (
                    <CardFooter className="flex flex-col space-y-4 ">
                        <div className="relative w-full">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <div className=" grid grid-cols-1 gap-4">
                            <Button variant="outline" className="w-96">
                                Google
                            </Button>
                            {/*<Button variant="outline" className="w-full">*/}
                            {/*    GitHub*/}
                            {/*</Button>*/}
                        </div>

                        <p className="text-center text-sm text-gray-500">
                            Facing any issues?{" "}
                            <Button variant="link" className="p-0 h-auto" onClick={() => router.push("/auth/register")}>
                                Contact us
                            </Button>
                        </p>
                    </CardFooter>
                )}
            </Card>
        </div>
    )
}
