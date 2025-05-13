import { CarBrand } from '@/app/interfaces/carsInterface'
import { SelectFnType } from '@/app/src/shared/types/filters'
import React from 'react'

interface Props {
	brandName: CarBrand
	brandId: number
	isActive: boolean
	setActive: SelectFnType
	removeActive: SelectFnType
}

const BrandFilter = ({ isActive, brandName, brandId, setActive, removeActive }: Props) => {
	return (
		<article
			className={`${
				isActive ? 'bg-accent text-700 fond-bold' : 'bg-800 text-500'
			} cursor-pointer px-3 py-1 text-lg my-3 rounded-[8px] select-none`}
			onClick={() => {
				if (isActive) {
					removeActive('brand', brandId)
					setActive('model', null)
				}
				if (!isActive) {
					setActive('brand', brandId)
					setActive('model', null)
				}
			}}
		>
			{brandName}
		</article>
	)
}

export default BrandFilter
