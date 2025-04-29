import axios from 'axios'

export const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_BACKEND_URL,
	withCredentials: true,
})

axiosInstance.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config

		if (originalRequest.url.includes('/refresh')) {
			return Promise.reject(error)
		}

		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true
			try {
				await axiosInstance.post('/api/refresh')
				return axiosInstance(originalRequest)
			} catch (refreshError) {
				return Promise.reject(refreshError)
			}
		}

		return Promise.reject(error)
	}
)
