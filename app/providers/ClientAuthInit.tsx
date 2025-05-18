'use client'

import { useQuery } from '@tanstack/react-query'
import { useUserStore } from '../src/shared/model/useUserStore'
import { useAuthStore } from '../src/widgets/cars'
import { axiosInstance } from '../src/shared/api/axiosInstance'
import { useEffect } from 'react'

interface Props {
	children: React.ReactNode
}

export default function ClientAuthInit({ children }: Props) {
	const isInitialized = useAuthStore(state => state.isInitialized)
	const setAuthData = useAuthStore(state => state.setAuthData)
	const setInitialized = useAuthStore(state => state.setInitialized)
	const setUser = useUserStore(state => state.setUser)

	const { data, isLoading, error } = useQuery({
		queryKey: ['authMe'],
		queryFn: () => axiosInstance.get('/api/authMe').then(res => res.data),
		staleTime: Infinity,
		refetchOnWindowFocus: false,
	})

	useEffect(() => {
		if (data) {
			console.log(data)
			setUser(data)
			setAuthData(true, data.role)
			setInitialized(true)
		} else if (error) {
			console.log(error)
			setAuthData(false, null)
			setInitialized(true)
		}
	}, [data, error, setUser, setAuthData, setInitialized])

	console.log(isInitialized)
	if (isLoading || !isInitialized) return <h1>Загрузка...</h1>

	return children
}
