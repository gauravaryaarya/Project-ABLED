"use client"

import { useState } from "react"
import { Header } from "@/components/Header"
import { Sidebar } from "@/components/Sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAccessibility } from "@/context/AccessibilityContext"
import { Keyboard, Mic, Volume2, Settings, Users, Heart } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { announceToScreenReader } = useAccessibility()

  const features = [
    {
      title: "Braille Input",
      description: "Type using our accessible braille keyboard interface",
      icon: Keyboard,
      href: "/braille-input",
      color: "bg-blue-500",
      available: true,
    },
    {
      title: "Voice Assistant",
      description: "Navigate and control the app using voice commands",
      icon: Mic,
      href: "/voice-assist",
      color: "bg-green-500",
      available: false,
    },
    {
      title: "Screen Reader",
      description: "Listen to page content with our integrated screen reader",
      icon: Volume2,
      href: "/screen-reader",
      color: "bg-purple-500",
      available: false,
    },
    {
      title: "Accessibility Settings",
      description: "Customize your experience with accessibility options",
      icon: Settings,
      href: "/settings",
      color: "bg-orange-500",
      available: true,
    },
  ]

  const stats = [
    { label: "Beta Users", value: "0", icon: Users, description: "Join our growing community" },
    { label: "Voice Commands", value: "0", icon: Mic, description: "Start using voice features" },
    { label: "Pages Read", value: "0", icon: Volume2, description: "Try the read page feature" },
    { label: "Built with", value: "❤️", icon: Heart, description: "Passion for accessibility" },
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
                Your unified accessibility dashboard. We're building technology that empowers independence.
              </p>
            </section>

            {/* Quick Stats */}
            <section aria-labelledby="stats-heading">
              <h2 id="stats-heading" className="text-xl font-semibold mb-4">
                Platform Status
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                  <Card key={stat.label}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                          <p className="text-2xl font-bold">{stat.value}</p>
                          <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
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
                        <div className="flex-1">
                          <CardTitle className="text-lg flex items-center gap-2">
                            {feature.title}
                            {!feature.available && (
                              <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                                Coming Soon
                              </span>
                            )}
                          </CardTitle>
                          <CardDescription>{feature.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {feature.available ? (
                        <Button
                          asChild
                          className="w-full"
                          onClick={() => announceToScreenReader(`Opening ${feature.title}`)}
                        >
                          <Link href={feature.href}>Open {feature.title}</Link>
                        </Button>
                      ) : (
                        <Button
                          className="w-full"
                          disabled
                          onClick={() => announceToScreenReader(`${feature.title} is coming soon`)}
                        >
                          Coming Soon
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Quick Actions */}
            <section aria-labelledby="actions-heading">
              <h2 id="actions-heading" className="text-xl font-semibold mb-4">
                Try These Features
              </h2>
              <div className="flex flex-wrap gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    try {
                      if (typeof window !== "undefined" && window.speechSynthesis) {
                        const mainContent = document.getElementById("main-content")
                        if (mainContent) {
                          const textContent = mainContent.innerText || ""
                          if (textContent.trim()) {
                            const utterance = new SpeechSynthesisUtterance(textContent)
                            window.speechSynthesis.speak(utterance)
                            announceToScreenReader("Reading page content")
                          } else {
                            announceToScreenReader("No content found to read")
                          }
                        }
                      } else {
                        announceToScreenReader("Speech synthesis is not available")
                      }
                    } catch (error) {
                      announceToScreenReader("Unable to read page at this time")
                    }
                  }}
                >
                  <Volume2 className="mr-2 h-4 w-4" />
                  Read This Page
                </Button>

                <Button variant="outline" asChild>
                  <Link href="/braille-input">
                    <Keyboard className="mr-2 h-4 w-4" />
                    Try Braille Keyboard
                  </Link>
                </Button>

                <Button variant="outline" asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Customize Settings
                  </Link>
                </Button>
              </div>
            </section>

            {/* Beta Notice */}
            <section aria-labelledby="beta-heading" className="bg-muted/50 rounded-lg p-6">
              <h2 id="beta-heading" className="text-xl font-semibold mb-4">
                🚀 Beta Version
              </h2>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Welcome to the Abled platform beta! We're actively developing features to make digital accessibility
                  easier and more intuitive.
                </p>
                <div className="space-y-2">
                  <p>
                    <strong>Currently Available:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Braille input keyboard with 6-dot pattern recognition</li>
                    <li>Basic voice commands (try the microphone button)</li>
                    <li>Theme switching and accessibility settings</li>
                    <li>Screen reader announcements</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p>
                    <strong>Voice Commands to Try:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>"Read this page" - Listen to page content</li>
                    <li>"Go to braille input" - Navigate to braille keyboard</li>
                    <li>"Open settings" - Access accessibility options</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
