'use client'

import { useCarFiltersStore } from '@/app/src/shared/model/useCarFiltersStore'
import SelectFilter from '@/app/src/shared/ui/SelectFilter'

const FuelTypesFilter = () => {
	const filters = useCarFiltersStore(state => state.filters)
	const addItemFilters = useCarFiltersStore(state => state.addItemFilters)
	const removeItemFilters = useCarFiltersStore(state => state.removeItemFilters)
	const options = []

	const fuelTypes = ['Бензин', 'Дизель', 'Электро', 'Бензин + Электро']

	for (let fuelType of fuelTypes) {
		options.push({ label: fuelType, value: fuelType })
	}

	return (
		<SelectFilter
			title='Тип топлива'
			options={options}
			typeFilter='fuelTypes'
			filters={filters.fuelTypes}
			addItemFilters={addItemFilters}
			removeItemFilters={removeItemFilters}
		/>
	)
}

export default FuelTypesFilter
