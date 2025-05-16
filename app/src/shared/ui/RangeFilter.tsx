'use client'

import { RangeFnType, IFilters } from '../types/filters'

interface Props<K extends keyof IFilters> {
	title: string
	options: string[]
	unit: string
	typeFilter: K
	filters: [number, number]
	changeItemsFilters: RangeFnType
}

function RangeFilter<K extends keyof IFilters>({
	title,
	options,
	unit,
	typeFilter,
	filters,
	changeItemsFilters,
}: Props<K>) {
	const handleChange = (item: any, idx: number) => {
		if (idx === 0) {
			changeItemsFilters(typeFilter, [+item, filters[1]])
		} else {
			if (item === '') changeItemsFilters(typeFilter, [filters[0], Infinity])
			else changeItemsFilters(typeFilter, [filters[0], +item])
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
							onChange={e => handleChange(e.currentTarget.value, idx)}
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
