'use client'
import { useEffect } from 'react'
import { useBrands } from '@/app/src/shared/hooks/useBrands'
import BrandFilter from './BrandFilter'
import { useBrandsStore } from '@/app/src/shared/model/useBrandsStore'
import { useCarFiltersStore } from '@/app/src/shared/model/useCarFiltersStore'

const BrandsFilter = () => {
	const { data: brands, isLoading, error } = useBrands()
	const setBrands = useBrandsStore(state => state.setBrands)
	const filters = useCarFiltersStore(state => state.filters)
	const addItemFilters = useCarFiltersStore(state => state.addItemFilters)
	const removeItemFilters = useCarFiltersStore(state => state.removeItemFilters)

	useEffect(() => {
		if (brands) setBrands(brands)
	}, [brands])

	if (isLoading) return <h1>Loading...</h1>
	if (error) return <h1>Ошибка загрузки брендов</h1>
	if (!brands || brands.length === 0) return <h1>Бренды не найдены</h1>

	return (
		<article>
			<h2 className='text-2xl text-secondary'>Бренд</h2>
			<section>
				{brands.map(brand => {
					const activeBrand = filters.brands.find(activeBrand => activeBrand === brand.brand_name)
					return (
						<BrandFilter
							isActive={activeBrand}
							setActiveBrands={addItemFilters}
							removeActiveBrand={removeItemFilters}
							brandName={brand.brand_name}
							key={brand.id}
						/>
					)
				})}
			</section>
		</article>
	)
}

export default BrandsFilter
