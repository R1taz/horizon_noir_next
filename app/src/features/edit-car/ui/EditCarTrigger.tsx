import React, { useState } from 'react'
import EditCarModal from './EditCarModal'
import { ICarInfo, ICarPhoto } from '@/app/interfaces/carsInterface'
import { AnimatePresence } from 'framer-motion'

interface Props {
	car: ICarInfo
	photos: ICarPhoto[]
}

const EditCarTrigger = ({ car, photos }: Props) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<button
				onClick={() => setIsOpen(true)}
				className='bottom-0 left-0 right-0 text-700 bg-accent text-center w-full font-bold rounded-[5px] py-1 mt-3'
			>
				Редактировать
			</button>

			<AnimatePresence mode='wait'>
				{isOpen && (
					<EditCarModal
						key='edit-car-modal'
						car={car}
						carPhotos={photos}
						onClose={() => setIsOpen(false)}
					/>
				)}
			</AnimatePresence>
		</>
	)
}

export default EditCarTrigger
