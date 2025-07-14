"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { useAccessibility } from "@/context/AccessibilityContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { signIn } = useAuth()
  const { announceToScreenReader } = useAccessibility()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await signIn(email, password)
      announceToScreenReader("Successfully signed in")
      router.push("/dashboard")
    } catch (error: any) {
      const errorMessage = error.message || "Failed to sign in"
      setError(errorMessage)
      announceToScreenReader(`Sign in failed: ${errorMessage}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome to Abled</CardTitle>
          <CardDescription>Sign in to access your accessibility dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Placeholder page – authentication not yet implemented */}
          <div className="max-w-md text-center space-y-4">
            <h1 className="text-3xl font-bold">Authentication Coming Soon</h1>
            <p className="text-muted-foreground">
              Secure sign-in and account management are under construction. Stay tuned!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
