"use client"

import { useState } from "react"
import { Header } from "@/components/Header"
import { Sidebar } from "@/components/Sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAccessibility } from "@/context/AccessibilityContext"
import { cn } from "@/lib/utils"

export default function BrailleInput() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [inputText, setInputText] = useState("")
  const [braillePattern, setBraillePattern] = useState<boolean[]>([false, false, false, false, false, false])
  const { announceToScreenReader } = useAccessibility()

  // Braille to text mapping (simplified)
  const brailleMap: { [key: string]: string } = {
    "100000": "a",
    "110000": "b",
    "100100": "c",
    "100110": "d",
    "100010": "e",
    "110100": "f",
    "110110": "g",
    "110010": "h",
    "010100": "i",
    "010110": "j",
    "101000": "k",
    "111000": "l",
    "101100": "m",
    "101110": "n",
    "101010": "o",
    "111100": "p",
    "111110": "q",
    "111010": "r",
    "011100": "s",
    "011110": "t",
    "101001": "u",
    "111001": "v",
    "010111": "w",
    "101101": "x",
    "101111": "y",
    "101011": "z",
    "000000": " ",
  }

  const toggleDot = (index: number) => {
    const newPattern = [...braillePattern]
    newPattern[index] = !newPattern[index]
    setBraillePattern(newPattern)
    announceToScreenReader(`Dot ${index + 1} ${newPattern[index] ? "pressed" : "released"}`)
  }

  const addCharacter = () => {
    const patternKey = braillePattern.map((dot) => (dot ? "1" : "0")).join("")
    const character = brailleMap[patternKey] || "?"
    setInputText((prev) => prev + character)
    setBraillePattern([false, false, false, false, false, false])
    announceToScreenReader(`Added character: ${character}`)
  }

  const clearInput = () => {
    setInputText("")
    setBraillePattern([false, false, false, false, false, false])
    announceToScreenReader("Input cleared")
  }

  const backspace = () => {
    setInputText((prev) => prev.slice(0, -1))
    announceToScreenReader("Character deleted")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={() => setSidebarOpen(true)} />

      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main id="main-content" className="flex-1 p-6" role="main">
          <div className="max-w-4xl mx-auto space-y-8">
            <section aria-labelledby="braille-heading">
              <h1 id="braille-heading" className="text-3xl font-bold mb-2">
                Braille Input System
              </h1>
              <p className="text-muted-foreground text-lg mb-6">
                Use the 6-dot braille keyboard to type text. Click the dots to form braille characters.
              </p>
            </section>

            {/* Text Output */}
            <Card>
              <CardHeader>
                <CardTitle>Text Output</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="min-h-[100px] p-4 border rounded-md bg-muted/50 text-lg font-mono"
                  aria-live="polite"
                  aria-label="Braille input text output"
                >
                  {inputText || "Start typing with braille..."}
                </div>
              </CardContent>
            </Card>

            {/* Braille Keyboard */}
            <Card>
              <CardHeader>
                <CardTitle>Braille Keyboard</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Current Pattern Display */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Current Pattern:</p>
                  <div className="text-4xl font-mono">{braillePattern.map((dot) => (dot ? "●" : "○")).join("")}</div>
                </div>

                {/* Braille Dots */}
                <div className="flex justify-center">
                  <div className="grid grid-cols-2 gap-4 max-w-xs">
                    {/* Left column: dots 1, 2, 3 */}
                    <div className="space-y-4">
                      {[0, 1, 2].map((index) => (
                        <Button
                          key={index}
                          onClick={() => toggleDot(index)}
                          className={cn(
                            "w-16 h-16 rounded-full text-lg font-bold",
                            braillePattern[index] ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80",
                          )}
                          aria-label={`Braille dot ${index + 1}, ${braillePattern[index] ? "pressed" : "not pressed"}`}
                          aria-pressed={braillePattern[index]}
                        >
                          {index + 1}
                        </Button>
                      ))}
                    </div>

                    {/* Right column: dots 4, 5, 6 */}
                    <div className="space-y-4">
                      {[3, 4, 5].map((index) => (
                        <Button
                          key={index}
                          onClick={() => toggleDot(index)}
                          className={cn(
                            "w-16 h-16 rounded-full text-lg font-bold",
                            braillePattern[index] ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80",
                          )}
                          aria-label={`Braille dot ${index + 1}, ${braillePattern[index] ? "pressed" : "not pressed"}`}
                          aria-pressed={braillePattern[index]}
                        >
                          {index + 1}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-4">
                  <Button onClick={addCharacter} size="lg">
                    Add Character
                  </Button>
                  <Button onClick={backspace} variant="outline" size="lg">
                    Backspace
                  </Button>
                  <Button onClick={clearInput} variant="destructive" size="lg">
                    Clear All
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card>
              <CardHeader>
                <CardTitle>How to Use</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>1. Click on the numbered dots to create braille patterns</p>
                <p>2. Press "Add Character" to convert the pattern to text</p>
                <p>3. Use "Backspace" to delete the last character</p>
                <p>4. Use "Clear All" to start over</p>
                <p className="text-muted-foreground mt-4">
                  Tip: You can also use voice commands like "read page" to hear the current text.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
