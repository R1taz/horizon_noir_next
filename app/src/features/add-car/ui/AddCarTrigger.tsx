import addCarImg from '@/app/assets/addCar.png'
import Image from 'next/image'
import React, { Dispatch, SetStateAction, useState } from 'react'
import AddCarModal from './AddCarModal'
import { AnimatePresence } from 'framer-motion'

interface Props {
	setIsOpenNotification: Dispatch<SetStateAction<boolean>>
	setMessageNotification: Dispatch<SetStateAction<string>>
}

const AddCarTrigger = ({ setIsOpenNotification, setMessageNotification }: Props) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<button
				onClick={() => setIsOpen(true)}
				className='row-start-1 row-end-2 col-start-1 col-end-4 rounded-[8px] border-2 border-accent text-accent text-center text-2xl py-4 font-bold cursor-pointer'
			>
				<Image src={addCarImg} alt='' width={20} height={20} className='inline-block mr-3' />
				<span>Добавить новый автомобиль</span>
			</button>

			<AnimatePresence mode='wait'>
				{isOpen && (
					<AddCarModal
						setIsOpenNotification={setIsOpenNotification}
						setMessageNotification={setMessageNotification}
						key='add-car-modal'
						onClose={() => setIsOpen(false)}
					/>
				)}
			</AnimatePresence>
		</>
	)
}

export default AddCarTrigger
