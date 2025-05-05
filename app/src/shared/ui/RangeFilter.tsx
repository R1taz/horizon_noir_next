'use client'

import { IFilters } from '../types/filters'

interface Props<K extends keyof IFilters, T> {
	title: string
	options: string[]
	unit: string
	typeFilter: keyof IFilters
	filters: IFilters[K]
	changeItemsFilters: <K extends keyof IFilters>(key: K, item: any) => void
}

function RangeFilter<K extends keyof IFilters, T>({
	title,
	options,
	unit,
	typeFilter,
	filters,
	changeItemsFilters,
}: Props<K, T>) {
	const handleChange = (item: string, idx: number) => {
		if (idx === 0) {
			changeItemsFilters(typeFilter, [+item, filters[1]])
		} else {
			if (item === '') changeItemsFilters(typeFilter, [filters[0], Infinity])
			else changeItemsFilters(typeFilter, [filters[0], +item])
		}
	}

	return (
		<article className='my-9'>
			<h2 className='text-2xl text-secondary'>{title}</h2>
			<section className='flex gap-3 my-3'>
				{options.map((option, idx) => (
					<article
						key={idx}
						className='flex-1 flex justify-between bg-quaternaryBg text-secondary text-lg text-center rounded-[8px] px-3 py-1'
					>
						<input
							className='bg-quaternaryBg w-full outline-none'
							onChange={e => handleChange(e.currentTarget.value, idx)}
							placeholder={`${option}`}
						/>
						<span>{unit}</span>
					</article>
				))}
			</section>
		</article>
	)
}

export default RangeFilter
