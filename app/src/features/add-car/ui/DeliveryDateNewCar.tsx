import React from 'react'

interface Props {
	dateDelivery: string
	setDateDelivery: (date: string) => void
}

const DeliveryDateNewCar = ({ dateDelivery, setDateDelivery }: Props) => {
	return (
		<article className='flex justify-center'>
			<input
				type='date'
				value={dateDelivery}
				onChange={e => setDateDelivery(e.target.value)}
				className='bg-700 py-1 text-center rounded-[7px] w-[400px] text-400 placeholder-text-500'
				placeholder='Введите дату доставки'
			/>
		</article>
	)
}

export default DeliveryDateNewCar
