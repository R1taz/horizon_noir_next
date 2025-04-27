'use client'
import { useEffect } from 'react'
import { useBrands } from '@/app/src/shared/hooks/useBrands'
import BrandFilter from './BrandFilter'
import { useBrandsStore } from '@/app/src/shared/model/useBrandsStore'

const BrandsFilter = () => {
	const { data: brands, isLoading, error } = useBrands()
	const setBrands = useBrandsStore(state => state.setBrands)

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
				{brands.map(brand => (
					<BrandFilter brandName={brand.brand_name} key={brand.id} />
				))}
			</section>
		</article>
	)
}

export default BrandsFilter
