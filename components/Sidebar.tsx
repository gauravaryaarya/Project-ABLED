"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, Keyboard, Mic, Volume2, Settings, User, X } from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const navigation = [
  { name: "Dashboard", href: "/", icon: Home, available: true },
  { name: "Braille Input", href: "/braille-input", icon: Keyboard, available: true },
  { name: "Voice Assistant", href: "/voice-assist", icon: Mic, available: false },
  { name: "Screen Reader", href: "/screen-reader", icon: Volume2, available: false },
  { name: "Profile", href: "/profile", icon: User, available: false },
  { name: "Settings", href: "/settings", icon: Settings, available: true },
]

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={onClose} aria-hidden="true" />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-64 bg-background border-r border-border transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between p-4 border-b border-border md:hidden">
          <h2 className="text-lg font-semibold">Navigation</h2>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close navigation menu">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href

            if (!item.available) {
              return (
                <div
                  key={item.name}
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground cursor-not-allowed opacity-60"
                >
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                  <span>{item.name}</span>
                  <span className="ml-auto text-xs bg-muted px-2 py-1 rounded">Coming Soon</span>
                </div>
              )
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent",
                )}
                aria-current={isActive ? "page" : undefined}
                onClick={() => onClose()}
              >
                <item.icon className="h-5 w-5" aria-hidden="true" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
