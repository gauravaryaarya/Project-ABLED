"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Volume2 } from "lucide-react"
import { useAccessibility } from "@/context/AccessibilityContext"
import { useRouter } from "next/navigation"

export function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [transcript, setTranscript] = useState("")
  const recognitionRef = useRef<any>(null)
  const { settings, announceToScreenReader } = useAccessibility()
  const router = useRouter()

  useEffect(() => {
    if (typeof window === "undefined") return

    const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

    if (!SpeechRecognitionClass) {
      setIsSupported(false)
      return
    }

    setIsSupported(true)

    const recognition = new SpeechRecognitionClass()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = "en-US"

    recognition.onresult = (event: any) => {
      let finalTranscript = ""
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript
        }
      }

      if (finalTranscript) {
        setTranscript(finalTranscript)
        processVoiceCommand(finalTranscript.toLowerCase().trim())
      }
    }

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error)
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognitionRef.current = recognition

    return () => {
      recognition.stop()
    }
  }, [])

  const processVoiceCommand = (command: string) => {
    try {
      announceToScreenReader(`Voice command received: ${command}`)

      if (command.includes("go to dashboard") || command.includes("open dashboard")) {
        router.push("/")
        speak("Navigating to dashboard")
      } else if (command.includes("go to braille") || command.includes("open braille")) {
        router.push("/braille-input")
        speak("Opening braille input")
      } else if (command.includes("go to voice") || command.includes("open voice")) {
        speak("Voice assistant page is coming soon")
      } else if (command.includes("go to settings") || command.includes("open settings")) {
        router.push("/settings")
        speak("Opening settings")
      } else if (command.includes("go back")) {
        router.back()
        speak("Going back")
      } else if (command.includes("read page") || command.includes("read this page")) {
        readCurrentPage()
      } else if (command.includes("stop reading")) {
        if (typeof window !== "undefined" && window.speechSynthesis) {
          window.speechSynthesis.cancel()
          speak("Stopped reading")
        }
      } else {
        speak('Command not recognized. Try saying "go to dashboard", "read page", or "open settings"')
      }
    } catch (error) {
      console.log("Voice command error handled gracefully")
      speak("Sorry, I couldn't process that command. Please try again.")
    }
  }

  const speak = (text: string) => {
    try {
      if (!settings.voiceEnabled || typeof window === "undefined") return

      if (window.speechSynthesis) {
        window.speechSynthesis.cancel()
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.rate = 0.8
        utterance.pitch = 1
        utterance.volume = 0.8
        window.speechSynthesis.speak(utterance)
      }
    } catch (error) {
      console.log("Speech synthesis error handled gracefully")
    }
  }

  const readCurrentPage = () => {
    try {
      const mainContent = document.getElementById("main-content")
      if (mainContent) {
        const textContent = mainContent.innerText || mainContent.textContent || ""
        if (textContent.trim()) {
          speak(textContent)
        } else {
          speak("No content found to read")
        }
      } else {
        speak("No main content found to read")
      }
    } catch (error) {
      console.log("Read page error handled gracefully")
      speak("Sorry, I couldn't read the page content")
    }
  }

  const toggleListening = () => {
    try {
      if (!isSupported || !settings.voiceEnabled) {
        announceToScreenReader("Voice recognition is not supported or disabled")
        return
      }

      if (isListening) {
        recognitionRef.current?.stop()
        setIsListening(false)
        announceToScreenReader("Voice assistant stopped listening")
      } else {
        recognitionRef.current?.start()
        setIsListening(true)
        announceToScreenReader("Voice assistant is now listening")
      }
    } catch (error) {
      console.log("Voice recognition error handled gracefully")
      announceToScreenReader("Voice recognition encountered an issue")
      setIsListening(false)
    }
  }

  if (!settings.voiceEnabled) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex flex-col items-end gap-2">
        {transcript && (
          <div className="bg-background border border-border rounded-lg p-3 max-w-xs shadow-lg">
            <p className="text-sm">{transcript}</p>
          </div>
        )}

        <div className="flex gap-2">
          <Button
            onClick={readCurrentPage}
            size="icon"
            variant="outline"
            aria-label="Read current page"
            className="rounded-full shadow-lg bg-transparent"
          >
            <Volume2 className="h-5 w-5" />
          </Button>

          <Button
            onClick={toggleListening}
            size="icon"
            variant={isListening ? "destructive" : "default"}
            aria-label={isListening ? "Stop voice assistant" : "Start voice assistant"}
            className="rounded-full shadow-lg"
            disabled={!isSupported}
          >
            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </div>
  )
}
