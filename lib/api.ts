export const servers = [
  // "http://localhost:8000",
  "https://7676-210-57-216-171.ngrok-free.app",
]

export const fetchWithFallback = async (
  path: string,
  options: RequestInit = {}
) => {
  for (const base of servers) {
    try {
      const res = await fetch(`${base}${path}`, options)
      if (res.ok) return await res.json()
      else console.warn(`Server gagal: ${base}, status ${res.status}`)
    } catch (err) {
      console.warn(`Tidak bisa terhubung ke ${base}`, err)
    }
  }
  throw new Error("Gagal fetch dari semua server")
}
