import { ICarPhoto } from '@/app/interfaces/carsInterface'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { forwardRef } from 'react'

interface Props {
	photo: ICarPhoto
}

const CarPhoto = forwardRef<HTMLDivElement, Props>(({ photo }, ref) => {
	return (
		<article ref={ref}>
			<Image
				key={photo.id}
				className='rounded-[8px] object-cover w-[750px] h-[550px] shadow-lg'
				src={process.env.NEXT_PUBLIC_BASE_BACKEND_URL + '/' + photo.url.replace(/\\/g, '/')}
				alt='Фотография автомобиля'
				width={650}
				height={350}
			/>
		</article>
	)
})

const MotionCarPhoto = motion(CarPhoto)

export default MotionCarPhoto
