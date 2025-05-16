'use client'

import { useCarFiltersStore } from '@/app/src/shared/model/useCarFiltersStore'
import SelectFilter from '@/app/src/shared/ui/SelectFilter'
import { useColors } from '../model/useColors'
import { useEffect } from 'react'
import { useCarsStore } from '@/app/src/entities/car'
import Skeleton from '@/app/src/shared/ui/Skeleton/Skeleton'
import { AnimatePresence } from 'framer-motion'

const ColorsFilter = () => {
	const colors = useCarsStore(state => state.colors)
	const setColors = useCarsStore(state => state.setColors)
	const filters = useCarFiltersStore(state => state.filters)
	const addItemFilters = useCarFiltersStore(state => state.addItemFilters)
	const removeItemFilters = useCarFiltersStore(state => state.removeItemFilters)
	const options = []

	const { data, isLoading } = useColors()

	useEffect(() => {
		if (data && colors.length === 0) setColors(data)
	}, [data, isLoading])

	for (let color of colors) {
		options.push({ label: color.color_name, value: color.id })
	}

	return (
		<AnimatePresence mode='wait'>
			{isLoading && <Skeleton width={290} height={35} count={12} />}
			{!isLoading && (
				<SelectFilter
					title='Цвет'
					options={options}
					typeFilter='colors'
					filters={filters.colors}
					addItemFilters={addItemFilters}
					removeItemFilters={removeItemFilters}
				/>
			)}
		</AnimatePresence>
	)
}

export default ColorsFilter
