"use client"

import { useState } from "react"
import { Header } from "@/components/Header"
import { Sidebar } from "@/components/Sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mic, Clock, Wrench } from "lucide-react"

export default function VoiceAssist() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={() => setSidebarOpen(true)} />

      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main id="main-content" className="flex-1 p-6" role="main">
          <div className="max-w-4xl mx-auto space-y-8">
            <section aria-labelledby="voice-heading" className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-6 bg-muted rounded-full">
                  <Wrench className="h-16 w-16 text-muted-foreground" />
                </div>
              </div>
              <h1 id="voice-heading" className="text-3xl font-bold mb-4">
                Voice Assistant
              </h1>
              <p className="text-muted-foreground text-lg mb-8">Advanced voice control features are coming soon!</p>
            </section>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Coming Soon
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>We're working hard to bring you advanced voice assistant features including:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Enhanced voice command recognition</li>
                  <li>Custom voice shortcuts</li>
                  <li>Voice-controlled form filling</li>
                  <li>Advanced navigation commands</li>
                  <li>Voice-to-text transcription</li>
                </ul>
                <div className="pt-4">
                  <Button disabled className="w-full">
                    <Mic className="mr-2 h-4 w-4" />
                    Feature in Development
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Voice Features</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  You can already use basic voice commands with the floating voice assistant button:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>"Read this page" - Listen to page content</li>
                  <li>"Go to dashboard" - Navigate to main dashboard</li>
                  <li>"Open settings" - Access accessibility settings</li>
                  <li>"Go back" - Navigate to previous page</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
