import React from 'react'

interface Props {
	title: string
}

const CarDealership = ({ title }: Props) => {
	return (
		<div className='flex justify-center'>
			<div className='flex bg-secondaryBg rounded-[50%] w-7 h-7'></div>
			<p className='ms-2 w-[180px] text-primary text-base'>{title}</p>
		</div>
	)
}

export default CarDealership
