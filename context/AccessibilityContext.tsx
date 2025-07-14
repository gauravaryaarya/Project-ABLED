"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface AccessibilitySettings {
  theme: "light" | "dark" | "high-contrast"
  fontSize: "normal" | "large" | "extra-large"
  voiceEnabled: boolean
  screenReaderEnabled: boolean
  keyboardNavigation: boolean
  reducedMotion: boolean
}

interface AccessibilityContextType {
  settings: AccessibilitySettings
  updateSettings: (newSettings: Partial<AccessibilitySettings>) => void
  announceToScreenReader: (message: string) => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    theme: "light",
    fontSize: "normal",
    voiceEnabled: true,
    screenReaderEnabled: true,
    keyboardNavigation: true,
    reducedMotion: false,
  })

  const updateSettings = (newSettings: Partial<AccessibilitySettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }))
  }

  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement("div")
    announcement.setAttribute("aria-live", "polite")
    announcement.setAttribute("aria-atomic", "true")
    announcement.className = "sr-only"
    announcement.textContent = message
    document.body.appendChild(announcement)

    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }

  useEffect(() => {
    // Apply theme
    document.documentElement.className = ""
    if (settings.theme === "dark") {
      document.documentElement.classList.add("dark")
    } else if (settings.theme === "high-contrast") {
      document.documentElement.classList.add("high-contrast")
    }

    // Apply font size
    if (settings.fontSize === "large") {
      document.documentElement.classList.add("large-text")
    }

    // Apply reduced motion
    if (settings.reducedMotion) {
      document.documentElement.style.setProperty("--animation-duration", "0s")
    }
  }, [settings])

  return (
    <AccessibilityContext.Provider value={{ settings, updateSettings, announceToScreenReader }}>
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (context === undefined) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider")
  }
  return context
}
