import React, { useState } from 'react'

interface Props<T> {
	edit: boolean
	title: string
	bg?: string
	value: T | null
	options: { label: string; value: T; action: (value: T) => void }[]
}

function Select<T>({ edit, title, value, bg = '800', options }: Props<T>) {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<article className='text-accent text-xl'>
			<div
				onClick={edit ? () => setIsOpen(prev => !prev) : undefined}
				className={`${value ? 'text-accent font-bold' : `text-500`} text-lg text-center bg-${bg} ${
					isOpen ? 'rounded-t-[8px]' : 'rounded-[8px]'
				} px-3 py-1 select-none`}
			>
				<h1 className='cursor-pointer'>{title}</h1>
			</div>

			{isOpen && (
				<section className={`flex flex-col justify-center bg-${bg} rounded-b-[8px] py-1`}>
					{options.map(option => (
						<article
							className={`text-center cursor-pointer py-2 my-1 ${
								value === option.value ? 'bg-accent' : ''
							}`}
							key={option.label}
							onClick={() => {
								option.action(option.value)
								setIsOpen(false)
							}}
						>
							<span
								className={`${value === option.value ? 'text-800' : 'text-500'} ${
									value === option.value ? 'font-bold' : ''
								} text-lg text-center select-none`}
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
