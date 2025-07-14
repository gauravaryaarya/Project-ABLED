"use client"

import { useState } from "react"
import { Header } from "@/components/Header"
import { Sidebar } from "@/components/Sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Clock, Wrench } from "lucide-react"

export default function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={() => setSidebarOpen(true)} />

      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main id="main-content" className="flex-1 p-6" role="main">
          <div className="max-w-4xl mx-auto space-y-8">
            <section aria-labelledby="profile-heading" className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-6 bg-muted rounded-full">
                  <Wrench className="h-16 w-16 text-muted-foreground" />
                </div>
              </div>
              <h1 id="profile-heading" className="text-3xl font-bold mb-4">
                User Profile
              </h1>
              <p className="text-muted-foreground text-lg mb-8">User profile management is coming soon!</p>
            </section>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Coming Soon
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>We're building comprehensive profile features including:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Personal information management</li>
                  <li>Accessibility needs assessment</li>
                  <li>Usage statistics and progress tracking</li>
                  <li>Caregiver connection and sharing</li>
                  <li>Custom accessibility preferences</li>
                  <li>Activity logs and history</li>
                </ul>
                <div className="pt-4">
                  <Button disabled className="w-full">
                    <User className="mr-2 h-4 w-4" />
                    Feature in Development
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">You can currently customize your experience through:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Accessibility settings (theme, font size, voice)</li>
                  <li>Navigation preferences</li>
                  <li>Screen reader announcements</li>
                </ul>
                <div className="pt-4">
                  <Button asChild>
                    <a href="/settings">Go to Settings</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
