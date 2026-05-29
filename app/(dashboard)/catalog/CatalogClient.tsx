'use client'

import { useCarFiltersStore } from '@/app/src/shared/model/useCarFiltersStore'
import BreadCrumbs from '@/app/src/shared/ui/BreadCrumbs'
import Cars from '@/app/src/widgets/cars/Cars'
import Filters from '@/app/src/widgets/Filters/Filters'
import { useEffect } from 'react'

const CatalogClient = () => {
	const resetFilters = useCarFiltersStore(state => state.resetFilters)

	useEffect(() => {
		return () => resetFilters()
	}, [])

	return (
		<main>
			<BreadCrumbs />
			<section className='grid grid-cols-1 md:grid-cols-[210px_1fr] xl:grid-cols-[290px_1fr] gap-6'>
				<Filters />
				<Cars />
			</section>
		</main>
	)
}

export default CatalogClient
