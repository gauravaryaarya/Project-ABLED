"use client"

import { useState } from "react"
import { Header } from "@/components/Header"
import { Sidebar } from "@/components/Sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Volume2, Clock, Wrench } from "lucide-react"

export default function ScreenReader() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={() => setSidebarOpen(true)} />

      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main id="main-content" className="flex-1 p-6" role="main">
          <div className="max-w-4xl mx-auto space-y-8">
            <section aria-labelledby="screen-reader-heading" className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-6 bg-muted rounded-full">
                  <Wrench className="h-16 w-16 text-muted-foreground" />
                </div>
              </div>
              <h1 id="screen-reader-heading" className="text-3xl font-bold mb-4">
                Screen Reader
              </h1>
              <p className="text-muted-foreground text-lg mb-8">Advanced screen reading features are coming soon!</p>
            </section>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Coming Soon
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>We're developing comprehensive screen reader features including:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Element-by-element navigation</li>
                  <li>Heading and landmark jumping</li>
                  <li>Table reading with row/column context</li>
                  <li>Form field descriptions and validation</li>
                  <li>Reading speed and voice customization</li>
                  <li>Synchronized visual highlighting</li>
                </ul>
                <div className="pt-4">
                  <Button disabled className="w-full">
                    <Volume2 className="mr-2 h-4 w-4" />
                    Feature in Development
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Reading Features</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Basic page reading is available through the voice assistant:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Click the speaker button to read the current page</li>
                  <li>Use voice command "read this page"</li>
                  <li>Screen reader announcements for UI changes</li>
                  <li>ARIA labels and descriptions throughout the app</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
