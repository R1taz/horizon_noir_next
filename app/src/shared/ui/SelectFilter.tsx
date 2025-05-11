'use client'
import { SelectFnType, IFilters } from '../types/filters'

interface Props<K extends keyof IFilters, T> {
	title: string
	options: { label: string; value: T }[]
	filters: IFilters[K]
	typeFilter: keyof IFilters
	addItemFilters: SelectFnType
	removeItemFilters: SelectFnType
}

function SelectFilter<K extends keyof IFilters, T extends string | number>({
	title,
	options,
	filters,
	typeFilter,
	addItemFilters,
	removeItemFilters,
}: Props<K, T>) {
	const handleClick = (item: T) => {
		if (!filters.find(value => value === item)) addItemFilters(typeFilter, item)
		else removeItemFilters(typeFilter, item)
	}

	return (
		<article className='my-9'>
			<h2 className='text-2xl text-500'>{title}</h2>
			<section>
				{options.map((option, idx) => {
					const styles = filters && filters.find(i => i === option.value) ? 'bg-accent' : 'bg-800'
					return (
						<article key={idx} className='flex items-center my-3'>
							<div
								className={`${styles} rounded-[4px] w-6 h-6 mr-3  cursor-pointer`}
								onClick={() => handleClick(option.value)}
							></div>
							<span className='text-400 text-lg'>{option.label}</span>
						</article>
					)
				})}
			</section>
		</article>
	)
}

export default SelectFilter
