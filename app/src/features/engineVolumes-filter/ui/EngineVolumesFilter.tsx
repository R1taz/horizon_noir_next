'use client'

import { useCarFiltersStore } from '@/app/src/shared/model/useCarFiltersStore'
import RangeFilter from '@/app/src/shared/ui/RangeFilter'
import { useState } from 'react'

const EngineVolumesFilter = () => {
	const filters = useCarFiltersStore(state => state.filters)
	const changeItemsFilters = useCarFiltersStore(state => state.changeItemsFilters)
	const options = ['от', 'до']

	const [displayValues, setDisplayValues] = useState<[string, string]>(['', ''])

	const handleDisplayChange = (val: string, idx: number) => {
		const cleaned = val.replace(/[^\d]/g, '').slice(0, 2)
		let display = ''

		if (cleaned.length === 1) {
			display = cleaned
		} else if (cleaned.length === 2) {
			display = cleaned[0] + '.' + cleaned[1]
		}

		const newDisplayValues: [string, string] = [...displayValues]
		newDisplayValues[idx] = display
		setDisplayValues(newDisplayValues)

		const firstValue = newDisplayValues[0] !== '' ? +newDisplayValues[0] : 0
		const lastValue = newDisplayValues[1] !== '' ? +newDisplayValues[1] : Infinity
		changeItemsFilters('engineVolume', [firstValue, lastValue])
	}

	return (
		<RangeFilter
			title='Объём двигателя'
			options={options}
			unit='л.'
			typeFilter='engineVolume'
			filters={filters.engineVolume}
			inputValues={displayValues}
			onInputChange={handleDisplayChange}
		/>
	)
}

export default EngineVolumesFilter
