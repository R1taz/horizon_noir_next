import React, { useState } from 'react'
import EditCarModal from './EditCarModal'
import { ICarInfo, ICarPhoto } from '@/app/interfaces/carsInterface'

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
				className='text-[#333333] bg-accentBg text-center w-full font-bold rounded-[5px] py-1 mt-3'
			>
				Редактировать
			</button>

			{isOpen && <EditCarModal car={car} carPhotos={photos} onClose={() => setIsOpen(false)} />}
		</>
	)
}

export default EditCarTrigger
