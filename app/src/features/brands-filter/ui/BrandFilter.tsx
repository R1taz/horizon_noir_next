import { CarBrand } from '@/app/interfaces/carsInterface'
import { IFilters } from '@/app/src/shared/types/filters'
import React from 'react'

interface Props {
	brandName: CarBrand
	isActive: string | undefined
	setActiveBrands: <K extends keyof IFilters>(key: K, value: IFilters[K]) => void
	removeActiveBrand: <K extends keyof IFilters>(key: K, value: IFilters[K]) => void
}

const BrandFilter = ({ isActive, brandName, setActiveBrands, removeActiveBrand }: Props) => {
	return (
		<article
			className={`${
				isActive ? 'bg-accentBg text-[#333333] fond-bold' : 'bg-quaternaryBg text-secondary'
			} cursor-pointer px-3 py-1 text-lg my-3 rounded-[8px]`}
			onClick={() => {
				if (isActive) removeActiveBrand('brands', brandName)
				if (!isActive) setActiveBrands('brands', brandName)
			}}
		>
			{brandName}
		</article>
	)
}

export default BrandFilter
