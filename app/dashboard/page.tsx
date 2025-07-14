"use client"

import { useState } from "react"
import { Header } from "@/components/Header"
import { Sidebar } from "@/components/Sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"
import { useAccessibility } from "@/context/AccessibilityContext"
import { Keyboard, Mic, Volume2, Settings, Activity, Clock } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { userProfile } = useAuth()
  const { announceToScreenReader } = useAccessibility()

  const features = [
    {
      title: "Braille Input",
      description: "Type using our accessible braille keyboard interface",
      icon: Keyboard,
      href: "/braille-input",
      color: "bg-blue-500",
    },
    {
      title: "Voice Assistant",
      description: "Navigate and control the app using voice commands",
      icon: Mic,
      href: "/voice-assist",
      color: "bg-green-500",
    },
    {
      title: "Screen Reader",
      description: "Listen to page content with our integrated screen reader",
      icon: Volume2,
      href: "/screen-reader",
      color: "bg-purple-500",
    },
    {
      title: "Accessibility Settings",
      description: "Customize your experience with accessibility options",
      icon: Settings,
      href: "/settings",
      color: "bg-orange-500",
    },
  ]

  const stats = [
    { label: "Sessions Today", value: "12", icon: Activity },
    { label: "Voice Commands", value: "48", icon: Mic },
    { label: "Pages Read", value: "23", icon: Volume2 },
    { label: "Time Saved", value: "2.5h", icon: Clock },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={() => setSidebarOpen(true)} />

      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main id="main-content" className="flex-1 p-6" role="main" aria-label="Dashboard main content">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Welcome Section */}
            <section aria-labelledby="welcome-heading">
              <h1 id="welcome-heading" className="text-3xl font-bold text-foreground mb-2">
                Welcome to Abled
              </h1>
              <p className="text-muted-foreground text-lg">
                Your unified accessibility dashboard.{" "}
                {userProfile?.role === "caregiver" && "Managing accessibility for your care recipients."}
              </p>
            </section>

            {/* Quick Stats */}
            <section aria-labelledby="stats-heading">
              <h2 id="stats-heading" className="text-xl font-semibold mb-4">
                Today's Activity
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                  <Card key={stat.label}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                          <p className="text-2xl font-bold">{stat.value}</p>
                        </div>
                        <stat.icon className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Feature Cards */}
            <section aria-labelledby="features-heading">
              <h2 id="features-heading" className="text-xl font-semibold mb-4">
                Accessibility Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature) => (
                  <Card key={feature.title} className="hover:shadow-lg transition-shadow duration-200">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${feature.color}`}>
                          <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{feature.title}</CardTitle>
                          <CardDescription>{feature.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button
                        asChild
                        className="w-full"
                        onClick={() => announceToScreenReader?.(`Opening ${feature.title}`)}
                      >
                        <Link href={feature.href}>Open {feature.title}</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Quick Actions */}
            <section aria-labelledby="actions-heading">
              <h2 id="actions-heading" className="text-xl font-semibold mb-4">
                Quick Actions
              </h2>
              <div className="flex flex-wrap gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      const mainContent = document.getElementById("main-content")
                      if (mainContent) {
                        const textContent = mainContent.innerText || ""
                        const utterance = new SpeechSynthesisUtterance(textContent)
                        window.speechSynthesis.speak(utterance)
                      }
                    }
                  }}
                >
                  <Volume2 className="mr-2 h-4 w-4" />
                  Read This Page
                </Button>

                <Button variant="outline" asChild>
                  <Link href="/braille-input">
                    <Keyboard className="mr-2 h-4 w-4" />
                    Open Braille Keyboard
                  </Link>
                </Button>

                <Button variant="outline" asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Accessibility Settings
                  </Link>
                </Button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
