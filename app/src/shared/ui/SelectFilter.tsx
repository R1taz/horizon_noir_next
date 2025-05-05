'use client'
import { IFilters } from '../types/filters'

interface Props<K extends keyof IFilters, T> {
	title: string
	options: { label: string; value: T }[]
	filters: IFilters[K]
	typeFilter: keyof IFilters
	addItemFilters: <K extends keyof IFilters>(key: K, item: any) => void
	removeItemFilters: <K extends keyof IFilters>(key: K, item: any) => void
}

function SelectFilter<K extends keyof IFilters, T>({
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
			<h2 className='text-2xl text-secondary'>{title}</h2>
			<section>
				{options.map((option, idx) => {
					const styles =
						filters && filters.find(i => i === option.value) ? 'bg-accentBg' : 'bg-quaternaryBg'
					return (
						<article key={idx} className='flex items-center my-3'>
							<div
								className={`${styles} rounded-[4px] w-6 h-6 mr-3  cursor-pointer`}
								onClick={() => handleClick(option.value)}
							></div>
							<span className='text-primary text-lg'>{option.label}</span>
						</article>
					)
				})}
			</section>
		</article>
	)
}

export default SelectFilter
