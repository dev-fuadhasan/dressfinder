// API configuration
// In production, set VITE_API_URL to your Cloudflare Worker URL
// In development, it falls back to the Vite proxy (wrangler dev on port 8787)
const API_URL = import.meta.env.VITE_API_URL || ''

export const getApiUrl = (endpoint) => {
  // If API_URL is set (production), use it
  if (API_URL) {
    return `${API_URL}${endpoint}`
  }
  // Otherwise, use relative path (development with proxy)
  return endpoint
}

export default getApiUrl

