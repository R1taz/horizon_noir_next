'use client'

import { useRouter } from 'next/navigation'
import { useAuthStore } from '../stores/useAuthStore'
import { useEffect } from 'react'

export function useAuth() {
	const router = useRouter()
	const isAuth = useAuthStore(state => state.isAuth)

	useEffect(() => {
		if (!isAuth) router.replace('/login')
	}, [isAuth, router])
}
