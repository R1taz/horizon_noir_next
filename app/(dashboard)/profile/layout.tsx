'use client'

import AnimateLayout from '@/app/src/shared/ui/AnimateLayout/AnimateLayout'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		setTimeout(() => setIsLoading(false), 3000)
	}, [])

	return (
		<>
			<AnimatePresence mode='wait'>{isLoading && <AnimateLayout key='loading' />}</AnimatePresence>
			{!isLoading && children}
		</>
	)
}

export default layout
