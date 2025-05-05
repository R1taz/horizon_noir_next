'use client'

import { useCarFiltersStore } from '@/app/src/shared/model/useCarFiltersStore'
import RangeFilter from '@/app/src/shared/ui/RangeFilter'

const EngineVolumesFilter = () => {
	const filters = useCarFiltersStore(state => state.filters)
	const changeItemsFilters = useCarFiltersStore(state => state.changeItemsFilters)
	const options = ['от', 'до']

	return (
		<RangeFilter
			title='Объём двигателя'
			options={options}
			unit='л.'
			typeFilter='engineVolume'
			filters={filters.engineVolume}
			changeItemsFilters={changeItemsFilters}
		/>
	)
}

export default EngineVolumesFilter
