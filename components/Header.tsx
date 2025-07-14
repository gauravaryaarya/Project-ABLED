"use client"
import Link from "next/link"
import { useAccessibility } from "@/context/AccessibilityContext"
import { Button } from "@/components/ui/button"
import { Settings, Menu, Sun, Moon, Contrast, Type, Volume2, VolumeX } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface HeaderProps {
  onMenuToggle?: () => void
}

export function Header({ onMenuToggle }: HeaderProps) {
  const { settings, updateSettings, announceToScreenReader } = useAccessibility()

  const handleThemeChange = (theme: "light" | "dark" | "high-contrast") => {
    updateSettings({ theme })
    announceToScreenReader(`Theme changed to ${theme}`)
  }

  const handleFontSizeChange = () => {
    const newSize = settings.fontSize === "normal" ? "large" : "normal"
    updateSettings({ fontSize: newSize })
    announceToScreenReader(`Font size changed to ${newSize}`)
  }

  const handleVoiceToggle = () => {
    updateSettings({ voiceEnabled: !settings.voiceEnabled })
    announceToScreenReader(`Voice assistant ${settings.voiceEnabled ? "disabled" : "enabled"}`)
  }

  return (
    <header className="bg-background border-b border-border px-4 py-3" role="banner">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          {onMenuToggle && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuToggle}
              aria-label="Toggle navigation menu"
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}

          <Link
            href="/"
            className="text-2xl font-bold text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-label="Abled - Go to dashboard"
          >
            Abled
          </Link>
        </div>

        <nav className="flex items-center gap-2" role="navigation" aria-label="User menu">
          {/* Accessibility Controls */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Accessibility settings">
                <Settings className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => handleThemeChange("light")}>
                <Sun className="mr-2 h-4 w-4" />
                Light Theme
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleThemeChange("dark")}>
                <Moon className="mr-2 h-4 w-4" />
                Dark Theme
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleThemeChange("high-contrast")}>
                <Contrast className="mr-2 h-4 w-4" />
                High Contrast
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleFontSizeChange}>
                <Type className="mr-2 h-4 w-4" />
                {settings.fontSize === "normal" ? "Large Text" : "Normal Text"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleVoiceToggle}>
                {settings.voiceEnabled ? <VolumeX className="mr-2 h-4 w-4" /> : <Volume2 className="mr-2 h-4 w-4" />}
                {settings.voiceEnabled ? "Disable Voice" : "Enable Voice"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  )
}
