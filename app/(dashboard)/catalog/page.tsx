'use client'

import { useCarFiltersStore } from '@/app/src/shared/model/useCarFiltersStore'
import AuthProvider from '@/app/src/shared/ui/AuthProvider'
import BreadCrumbs from '@/app/src/shared/ui/BreadCrumbs'
import Cars from '@/app/src/widgets/cars/Cars'
import Filters from '@/app/src/widgets/Filters/Filters'
import { useEffect } from 'react'

const page = () => {
	const resetFilters = useCarFiltersStore(state => state.resetFilters)

	useEffect(() => {
		return () => resetFilters()
	}, [])

	return (
		<AuthProvider>
			<main>
				<BreadCrumbs />
				<section className='grid grid-cols-[290px_1fr] gap-6'>
					<Filters />
					<Cars />
				</section>
			</main>
		</AuthProvider>
	)
}

export default page
