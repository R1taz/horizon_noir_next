'use client'
import { useBrands } from '@/app/hooks/useBrands'
import BrandFilter from './BrandFilter'

const BrandsFilter = () => {
	const { data: brands, isLoading } = useBrands()

	if (isLoading || !brands) return <h1>Loading...</h1>

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
