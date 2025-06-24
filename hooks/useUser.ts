import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import { fetchWithFallback } from "@/lib/api"

export type User = {
  name: string
  email: string
  avatar: string
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = Cookies.get("token")
    console.log("Token from cookie:", token)

    if (!token) {
      setLoading(false)
      return
    }

    fetchWithFallback("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((data: User) => {
        console.log("Fetched user data:", data)
        setUser(data)
      })
      .catch((e) => {
        console.error("Failed to fetch user", e)
        setUser(null)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return { user, loading }
}