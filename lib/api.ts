export const servers = [
  // "http://localhost:8000",
  "https://670a-210-57-216-168.ngrok-free.app",
]

export const fetchWithFallback = async (
  path: string,
  options: RequestInit = {}
) => {
  for (const base of servers) {
    try {
      const fullUrl = `${base}${path}`
      console.log(`Fetching from: ${fullUrl}`)
      const res = await fetch(fullUrl, options)
      const text = await res.text()

      if (res.ok) {
        try {
          return JSON.parse(text)
        } catch (e) {
          console.error("Failed to parse JSON:", e)
          throw e
        }
      } else {
        console.warn(`Fetch failed at ${fullUrl} - status ${res.status}`)
        console.warn("Response content:", text)
      }
    } catch (err) {
      console.warn(`Could not connect to ${base}`, err)
    }
  }
  throw new Error("All fetch attempts failed")
}


// export const fetchWithFallback = async (
//   path: string,
//   options: RequestInit = {}
// ) => {
//   for (const base of servers) {
//     try {
//       const res = await fetch(`${base}${path}`, options)
//       if (res.ok) return await res.json()
//       else console.warn(`Server gagal: ${base}, status ${res.status}`)
//     } catch (err) {
//       console.warn(`Tidak bisa terhubung ke ${base}`, err)
//     }
//   }
//   throw new Error("Gagal fetch dari semua server")
// }
