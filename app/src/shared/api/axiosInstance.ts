import axios from 'axios'

export const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_BACKEND_URL,
	withCredentials: true,
})

const AUTH_FREE_PATHS = ['/api/refresh', '/api/login', '/api/registration']

axiosInstance.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config

		if (!error.response) {
			return Promise.reject(error)
		}

		if (AUTH_FREE_PATHS.some(p => originalRequest.url?.includes(p))) {
			return Promise.reject(error)
		}

		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true
			try {
				await axiosInstance.post('/api/refresh')
				return axiosInstance(originalRequest)
			} catch (refreshError) {
				if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/login')) {
					window.location.href = '/login'
				}
				return Promise.reject(refreshError)
			}
		}

		return Promise.reject(error)
	}
)
