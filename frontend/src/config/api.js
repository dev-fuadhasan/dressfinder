// API configuration
// In production, this should be set to your Render backend URL
// In development, it will use the proxy from vite.config.js
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

