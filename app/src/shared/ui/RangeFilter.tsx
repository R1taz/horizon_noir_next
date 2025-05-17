'use client'

import { RangeFnType, IFilters } from '../types/filters'

interface Props<K extends keyof IFilters> {
	title: string
	options: string[]
	unit: string
	typeFilter: K
	filters: [number, number]
	inputValues?: [string, string]
	changeItemsFilters?: RangeFnType
	onInputChange?: (val: string, idx: number) => void
}

function RangeFilter<K extends keyof IFilters>({
	title,
	options,
	unit,
	typeFilter,
	filters,
	changeItemsFilters,
	onInputChange,
	inputValues,
}: Props<K>) {
	const handleChange = (item: any, idx: number) => {
		if (idx === 0) {
			changeItemsFilters!(typeFilter, [+item, filters[1]])
		} else {
			if (item === '') changeItemsFilters!(typeFilter, [filters[0], Infinity])
			else changeItemsFilters!(typeFilter, [filters[0], +item])
		}
	}

	return (
		<article className='my-9'>
			<h2 className='text-2xl text-500'>{title}</h2>
			<section className='flex gap-3 my-3'>
				{options.map((option, idx) => (
					<article
						key={idx}
						className='flex-1 flex justify-between bg-800 text-500 text-lg text-center rounded-[8px] px-3 py-1'
					>
						<input
							className='bg-800 w-full  placeholder:select-none'
							type='text'
							value={
								inputValues
									? inputValues[idx]
									: filters[idx] === Infinity || filters[idx] === 0
									? ''
									: filters[idx].toString()
							}
							onChange={e =>
								onInputChange
									? onInputChange(e.currentTarget.value, idx)
									: handleChange(e.currentTarget.value, idx)
							}
							placeholder={`${option}`}
						/>
						<span className='select-none'>{unit}</span>
					</article>
				))}
			</section>
		</article>
	)
}

export default RangeFilter
