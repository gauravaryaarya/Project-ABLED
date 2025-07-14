"use client"

import { createContext, useContext, useState, type ReactNode, useEffect } from "react"
import { app } from "@/lib/firebase"
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth"

const auth = getAuth(app)

interface AuthContextType {
  user: any | null
  userProfile: any | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, role: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (user) {
      setUserProfile({
        email: user.email,
        role: user.displayName || "user",
      })
    } else {
      setUserProfile(null)
    }
  }, [user])

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, role: string) => {
    setLoading(true)
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(auth.currentUser as any, {
        displayName: role,
      })
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    try {
      await signOut(auth)
    } finally {
      setLoading(false)
    }
  }

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
