import { CarBrand } from '@/app/interfaces/carsInterface'
import { SelectFnType } from '@/app/src/shared/types/filters'
import React from 'react'

interface Props {
	brandName: CarBrand
	isActive: string | undefined
	setActiveBrands: SelectFnType
	removeActiveBrand: SelectFnType
}

const BrandFilter = ({ isActive, brandName, setActiveBrands, removeActiveBrand }: Props) => {
	return (
		<article
			className={`${
				isActive ? 'bg-accent text-700 fond-bold' : 'bg-800 text-500'
			} cursor-pointer px-3 py-1 text-lg my-3 rounded-[8px] select-none`}
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
