"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { useAccessibility } from "@/context/AccessibilityContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState<"user" | "caregiver">("user")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { signUp } = useAuth()
  const { announceToScreenReader } = useAccessibility()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      announceToScreenReader("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      announceToScreenReader("Password must be at least 6 characters")
      return
    }

    setLoading(true)

    try {
      await signUp(email, password, role)
      announceToScreenReader("Account created successfully")
      router.push("/dashboard")
    } catch (error: any) {
      const errorMessage = error.message || "Failed to create account"
      setError(errorMessage)
      announceToScreenReader(`Account creation failed: ${errorMessage}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Join Abled</CardTitle>
          <CardDescription>Create your accessibility account</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Placeholder page – authentication not yet implemented */}
          <div className="max-w-md text-center space-y-4">
            <h1 className="text-3xl font-bold">Registration Coming Soon</h1>
            <p className="text-muted-foreground">
              We’re working on account creation and onboarding. Please check back later.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
