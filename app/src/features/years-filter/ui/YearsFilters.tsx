'use client'

import { useCarFiltersStore } from '@/app/src/shared/model/useCarFiltersStore'
import SelectFilter from '@/app/src/shared/ui/SelectFilter'

const YearsFilter = () => {
	const filters = useCarFiltersStore(state => state.filters)
	const addItemFilters = useCarFiltersStore(state => state.addItemFilters)
	const removeItemFilters = useCarFiltersStore(state => state.removeItemFilters)
	const options = []

	const years = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016]

	for (let year of years) {
		options.push({ label: String(year), value: year })
	}

	return (
		<SelectFilter
			title='Год выпуска'
			options={options}
			typeFilter='years'
			filters={filters.years}
			addItemFilters={addItemFilters}
			removeItemFilters={removeItemFilters}
		/>
	)
}

export default YearsFilter
