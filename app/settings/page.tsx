"use client"

import { useState } from "react"
import { Header } from "@/components/Header"
import { Sidebar } from "@/components/Sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useAccessibility } from "@/context/AccessibilityContext"

export default function Settings() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { settings, updateSettings, announceToScreenReader } = useAccessibility()

  const handleSettingChange = (key: string, value: any) => {
    updateSettings({ [key]: value })
    announceToScreenReader(`${key} changed to ${value}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={() => setSidebarOpen(true)} />

      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main id="main-content" className="flex-1 p-6" role="main">
          <div className="max-w-4xl mx-auto space-y-8">
            <section aria-labelledby="settings-heading">
              <h1 id="settings-heading" className="text-3xl font-bold mb-2">
                Accessibility Settings
              </h1>
              <p className="text-muted-foreground text-lg">
                Customize your accessibility experience to meet your needs.
              </p>
            </section>

            {/* Theme Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Visual Theme</CardTitle>
                <CardDescription>Choose your preferred visual theme</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={settings.theme} onValueChange={(value) => handleSettingChange("theme", value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="light" />
                    <Label htmlFor="light">Light Theme</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="dark" />
                    <Label htmlFor="dark">Dark Theme</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high-contrast" id="high-contrast" />
                    <Label htmlFor="high-contrast">High Contrast</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Font Size Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Text Size</CardTitle>
                <CardDescription>Adjust text size for better readability</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={settings.fontSize} onValueChange={(value) => handleSettingChange("fontSize", value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="normal" id="normal" />
                    <Label htmlFor="normal">Normal Text</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="large" id="large" />
                    <Label htmlFor="large">Large Text</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Voice Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Voice Assistant</CardTitle>
                <CardDescription>Configure voice recognition and speech synthesis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="voice-enabled">Enable Voice Assistant</Label>
                  <Switch
                    id="voice-enabled"
                    checked={settings.voiceEnabled}
                    onCheckedChange={(checked) => handleSettingChange("voiceEnabled", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Screen Reader Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Screen Reader</CardTitle>
                <CardDescription>Configure screen reader announcements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="screen-reader-enabled">Enable Screen Reader Announcements</Label>
                  <Switch
                    id="screen-reader-enabled"
                    checked={settings.screenReaderEnabled}
                    onCheckedChange={(checked) => handleSettingChange("screenReaderEnabled", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Navigation Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Navigation</CardTitle>
                <CardDescription>Configure keyboard and navigation preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="keyboard-navigation">Enhanced Keyboard Navigation</Label>
                  <Switch
                    id="keyboard-navigation"
                    checked={settings.keyboardNavigation}
                    onCheckedChange={(checked) => handleSettingChange("keyboardNavigation", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="reduced-motion">Reduce Motion</Label>
                  <Switch
                    id="reduced-motion"
                    checked={settings.reducedMotion}
                    onCheckedChange={(checked) => handleSettingChange("reducedMotion", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button onClick={() => announceToScreenReader("Settings saved successfully")} size="lg">
                Save Settings
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
