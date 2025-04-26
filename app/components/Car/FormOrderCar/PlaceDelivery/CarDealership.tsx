import React from 'react'

interface Props {
	title: string
	carDealershipId: number
	isActive: boolean
	onChange: (id: number) => void
}

const CarDealership = ({ title, carDealershipId, isActive, onChange }: Props) => {
	return (
		<div className='flex justify-center'>
			<div
				className={`flex rounded-[50%] w-7 h-7 ${isActive ? 'bg-accentBg' : 'bg-secondaryBg'}`}
				onClick={() => onChange(carDealershipId)}
			></div>
			<p className='ms-2 w-[180px] text-primary text-base'>{title}</p>
		</div>
	)
}

export default CarDealership
