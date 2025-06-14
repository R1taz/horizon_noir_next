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
			<h1 className='text-400 text-center font-bold text-xl my-2'>
				Введите информацию об автомобиле
			</h1>

			<section className='flex flex-col lg:flex-row justify-center text-lg gap-7'>
				{options.map(option => (
					<section key={option.label} className='flex flex-col items-center'>
						<label className='py-1 rounded-[7px] text-500' htmlFor={option.label}>
							{option.label}
						</label>
						<input
							type='text'
							key={option.label}
							value={option.value}
							onChange={e => option.action(e.target.value)}
							className='bg-700 py-1 px-2 text-center rounded-[7px] text-400'
						/>
					</section>
				))}
			</section>
		</article>
	)
}

export default CarInfo
