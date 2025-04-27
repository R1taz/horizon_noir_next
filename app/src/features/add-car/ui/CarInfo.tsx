import React from 'react'

interface Props {
	options: {
		label: string
		value: string
		action: (value: string) => void
	}[]
}

function CarInfo({ options }: Props) {
	return (
		<article className='my-7'>
			<h1 className='text-primary text-center font-bold text-xl my-5'>
				Введите информацию об автомобиле
			</h1>
			<section className='flex justify-center text-lg gap-7'>
				{options.map(option => (
					<input
						type='text'
						key={option.label}
						placeholder={option.label}
						value={option.value}
						onChange={e => option.action(e.target.value)}
						className='bg-[#333333] py-1 outline-none text-center rounded-[7px] text-primary placeholder-[text-secondary]'
					/>
				))}
			</section>
		</article>
	)
}

export default CarInfo
