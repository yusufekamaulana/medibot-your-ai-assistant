import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import { fetchWithFallback } from "@/lib/api"

/**
 * Tipe User global – bisa di-import di komponen lain
 */
export type User = {
  name: string
  email: string
  avatar: string
}

/**
 * Hook untuk ambil data user dari backend
 */
export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = Cookies.get("token")

    // Kalau gak ada token, langsung keluarin loading = false
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
        setUser(data)
      })
      .catch(() => {
        setUser(null)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return { user, loading }
}
