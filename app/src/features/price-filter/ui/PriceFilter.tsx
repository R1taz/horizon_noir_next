'use client'

import { useCarFiltersStore } from '@/app/src/shared/model/useCarFiltersStore'
import RangeFilter from '@/app/src/shared/ui/RangeFilter'

const PriceFilter = () => {
	const filters = useCarFiltersStore(state => state.filters)
	const changeItemsFilters = useCarFiltersStore(state => state.changeItemsFilters)
	const options = ['от', 'до']

	return (
		<RangeFilter
			title='Цена'
			options={options}
			unit='₽'
			typeFilter='price'
			filters={filters.price}
			changeItemsFilters={changeItemsFilters}
		/>
	)
}

export default PriceFilter
