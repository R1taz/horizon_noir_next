'use client'

import { useQuery } from '@tanstack/react-query'
import { useUserStore } from '../src/shared/model/useUserStore'
import { useAuthStore } from '../src/widgets/cars'
import { axiosInstance } from '../src/shared/api/axiosInstance'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
	children: React.ReactNode
}

export default function ClientAuthInit({ children }: Props) {
	const isInitialized = useAuthStore(state => state.isInitialized)
	const setInitialized = useAuthStore(state => state.setInitialized)
	const setAuthData = useAuthStore(state => state.setAuthData)
	const setUser = useUserStore(state => state.setUser)

	const router = useRouter()

	const { data, isLoading, error } = useQuery({
		queryKey: ['authMe'],
		queryFn: () => axiosInstance.get('/api/authMe').then(res => res.data),
		staleTime: Infinity,
		refetchOnWindowFocus: false,
	})

	useEffect(() => {
		if (data) {
			setUser(data)
			setAuthData(true, data.role)
		} else if (error) {
			console.log(error)
			setAuthData(false, null)
			router.replace('/login')
		} else if (!isLoading && !data) {
			router.replace('/login')
		}

		if (!isLoading) setInitialized(true)
	}, [data, error, isLoading, setUser, setAuthData])

	if (!isInitialized) return <h1 className='text-accent'>Загрузка...</h1>

	return children
}
