import { ICarDealership } from '@/app/interfaces/carDealershipsInterface'
import React from 'react'
import CarDealership from './CarDealership'

interface Props {
	carDealerships: ICarDealership[]
	dealershipId: number
	setDealershipId: (id: number) => void
}

const CarDealershipList = ({ carDealerships, dealershipId, setDealershipId }: Props) => {
	return (
		<section className='flex flex-col gap-3'>
			{carDealerships.map((carDealership, idx) => (
				<CarDealership
					isActive={dealershipId === carDealership.id}
					onChange={id => setDealershipId(id)}
					carDealershipId={carDealership.id}
					title={carDealership.address}
					key={idx}
				/>
			))}
		</section>
	)
}

export default CarDealershipList
