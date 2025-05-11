import Image from 'next/image'
import removeImg from '../../../../assets/removeCar.png'
import notMainPhoto from '../../../../assets/Star 1.svg'
import mainPhoto from '../../../../assets/Star 1 (1).svg'
import { useState } from 'react'

interface Props {
	photo: File
	handleChange: () => void
}

const CarPhoto = ({ photo, handleChange }: Props) => {
	const [isHovered, setIsHovered] = useState(false)

	return (
		<article
			className='relative'
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<Image
				src={removeImg}
				alt='Удалить фотографию'
				width={25}
				height={25}
				className={`z-10 absolute top-2 right-2 cursor-pointer transition-opacity duration-200 ${
					isHovered ? 'opacity-100' : 'opacity-0'
				}`}
				onClick={handleChange}
			/>
			<Image
				src={URL.createObjectURL(photo)}
				className={`rounded-[8px] h-[250px] object-cover  duration-200 ${
					isHovered ? '[filter:brightness(65%)]' : 'brightness-100'
				}`}
				alt='Фотография автомобиля'
				width={350}
				height={500}
			/>
		</article>
	)
}

export default CarPhoto
