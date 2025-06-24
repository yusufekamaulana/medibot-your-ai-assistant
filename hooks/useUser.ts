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
    console.log("Token:", token)

    fetchWithFallback("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json", // tambahkan ini
      }
    })
      .then((data) => {
        console.log("User fetched:", data)
        setUser(data)
      })
      .catch((err) => {
        console.error("User fetch failed:", err)
      })
      .finally(() => setLoading(false))
  }, [])

  return { user, loading }
}