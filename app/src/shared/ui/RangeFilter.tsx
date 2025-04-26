import { useState } from 'react'

interface Props {
	title: string
	options: string[]
	unit: string
}

function RangeFilter({ title, options, unit }: Props) {
	return (
		<article className='my-9'>
			<h2 className='text-2xl text-secondary'>{title}</h2>
			<section className='flex gap-3 my-3'>
				{options.map((option, idx) => (
					<article
						key={idx}
						className='flex-1 flex justify-between bg-quaternaryBg text-secondary text-lg text-center rounded-[8px] px-3 py-1'
					>
						<span>{option}</span>
						<span>{unit}</span>
					</article>
				))}
			</section>
		</article>
	)
}

export default RangeFilter
