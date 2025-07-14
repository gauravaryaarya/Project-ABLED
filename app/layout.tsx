import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AccessibilityProvider } from "@/context/AccessibilityContext"
import { VoiceAssistant } from "@/components/VoiceAssistant"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Abled - Unified Disability Dashboard",
  description: "AI-powered accessibility platform for differently-abled users",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AccessibilityProvider>
          <div id="skip-link">
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50"
            >
              Skip to main content
            </a>
          </div>
          {children}
          <VoiceAssistant />
        </AccessibilityProvider>
      </body>
    </html>
  )
}
