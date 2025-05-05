'use client'

import { bodyTypeToRu } from '@/app/src/shared/lib/format/bodyTypeToRu'
import { useCarFiltersStore } from '@/app/src/shared/model/useCarFiltersStore'
import SelectFilter from '@/app/src/shared/ui/SelectFilter'

const BodyTypesFilter = () => {
	const filters = useCarFiltersStore(state => state.filters)
	const addItemFilters = useCarFiltersStore(state => state.addItemFilters)
	const removeItemFilters = useCarFiltersStore(state => state.removeItemFilters)
	const options = []

	for (let key in bodyTypeToRu) {
		options.push({ label: bodyTypeToRu[key], value: key })
	}

	return (
		<SelectFilter
			title='Тип кузова'
			options={options}
			typeFilter='bodyTypes'
			filters={filters.bodyTypes}
			addItemFilters={addItemFilters}
			removeItemFilters={removeItemFilters}
		/>
	)
}

export default BodyTypesFilter
