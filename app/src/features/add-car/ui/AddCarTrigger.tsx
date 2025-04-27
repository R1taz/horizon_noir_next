import addCarImg from '@/app/assets/addCar.png'
import Image from 'next/image'
import React, { useState } from 'react'
import AddCarModal from './AddCarModal'

const AddCarTrigger = () => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<button
				onClick={() => setIsOpen(true)}
				className='row-start-1 row-end-2 col-start-1 col-end-4 rounded-[8px] border-2 border-accentBg text-accent text-center text-2xl py-4 font-bold cursor-pointer'
			>
				<Image src={addCarImg} alt='' width={20} height={20} className='inline-block mr-3' />
				<span>Добавить новый автомобиль</span>
			</button>

			{isOpen && <AddCarModal onClose={() => setIsOpen(false)} />}
		</>
	)
}

export default AddCarTrigger
