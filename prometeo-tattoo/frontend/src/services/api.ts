import axios from 'axios'
import { useAuthStore } from '../store/authStore'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout()
    }
    const responseData = error.response?.data
    const message = responseData?.message || error.message || 'Error de conexión'
    const apiError = Object.assign(new Error(message), {
      errors: responseData?.errors as Record<string, string> | undefined,
      statusCode: error.response?.status as number | undefined,
    })
    return Promise.reject(apiError)
  },
)

export default api
