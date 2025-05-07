import React, { useState } from 'react'

interface Props<T> {
	edit: boolean
	title: string
	bg?: string
	value: T
	options: { label: string; value: T; action: (value: T) => void }[]
}

function Select<T>({ edit, title, value, bg = 'quaternaryBg', options }: Props<T>) {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<article className='my-3'>
			<div
				onClick={edit ? () => setIsOpen(prev => !prev) : undefined}
				className={`bg-${bg} text-secondary text-lg text-center ${
					isOpen ? 'rounded-t-[8px]' : 'rounded-[8px]'
				} px-3 py-1`}
			>
				<h1 className='cursor-pointer'>{title}</h1>
			</div>

			{isOpen && (
				<section className={`flex flex-col justify-center bg-${bg}`}>
					{options.map(option => (
						<article
							className={`text-center cursor-pointer py-2 my-1 ${
								value === option.value ? 'bg-accentBg' : ''
							}`}
							key={option.label}
							onClick={() => option.action(option.value)}
						>
							<span
								className={`${value === option.value ? 'text-[#292929]' : 'text-secondary'} ${
									value === option.value ? 'font-bold' : ''
								} text-lg text-center`}
							>
								{option.label}
							</span>
						</article>
					))}
				</section>
			)}
		</article>
	)
}

export default Select
