'use client'
import { useEffect } from 'react'
import { useBrands } from '@/app/src/shared/hooks/useBrands'
import BrandFilter from './BrandFilter'
import { useBrandsStore } from '@/app/src/shared/model/useBrandsStore'
import { useCarFiltersStore } from '@/app/src/shared/model/useCarFiltersStore'
import Skeleton from '@/app/src/shared/ui/Skeleton/Skeleton'
import { AnimatePresence } from 'framer-motion'

const BrandsFilter = () => {
	const { data: brands, isLoading, error } = useBrands()
	const setBrands = useBrandsStore(state => state.setBrands)
	const filters = useCarFiltersStore(state => state.filters)
	const addItemFilters = useCarFiltersStore(state => state.addItemFilters)
	const removeItemFilters = useCarFiltersStore(state => state.removeItemFilters)

	useEffect(() => {
		if (brands) setBrands(brands)
	}, [brands])

	if (error) return <h1>Ошибка загрузки брендов</h1>

	return (
		<article>
			<h2 className='text-2xl text-500'>Бренд</h2>
			<section>
				<AnimatePresence mode='wait'>
					{isLoading && (
						<Skeleton key='skeleton-brands-filter' width={290} height={35} count={12} />
					)}
					{!isLoading &&
						brands &&
						brands.map(brand => {
							const activeBrand = filters.brand === brand.id
							return (
								<BrandFilter
									isActive={activeBrand}
									setActive={addItemFilters}
									removeActive={removeItemFilters}
									brandName={brand.brand_name}
									brandId={brand.id}
									key={brand.id}
								/>
							)
						})}
				</AnimatePresence>
			</section>
		</article>
	)
}

export default BrandsFilter
