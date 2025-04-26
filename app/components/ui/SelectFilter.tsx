'use client'
import { useState } from 'react'

interface Props<T> {
	title: string
	options: T[]
}

function SelectFilter<T extends React.ReactNode>({ title, options }: Props<T>) {
	const [selectOptions, setSelectOptions] = useState<T[]>([])

	return (
		<article className='my-9'>
			<h2 className='text-2xl text-secondary'>{title}</h2>
			<section>
				{options.map((option, idx) => {
					return (
						<article key={idx} className='flex items-center my-3'>
							<div
								className='bg-quaternaryBg rounded-[4px] w-6 h-6 mr-3'
								onClick={() => setSelectOptions(prev => [...prev, option])}
							></div>
							<span className='text-primary text-lg'>{option}</span>
						</article>
					)
				})}
			</section>
		</article>
	)
}

export default SelectFilter
