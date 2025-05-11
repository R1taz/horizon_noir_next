import { ICarPhoto } from '@/app/interfaces/carsInterface'
import Image from 'next/image'

interface Props {
	photo: ICarPhoto
}

const CarPhoto = ({ photo }: Props) => {
	return (
		<Image
			key={photo.id}
			className='rounded-[8px] object-cover w-[750px] h-[550px]'
			src={process.env.NEXT_PUBLIC_BASE_BACKEND_URL + '/' + photo.url.replace(/\\/g, '/')}
			alt='Фотография автомобиля'
			width={650}
			height={350}
		/>
	)
}

export default CarPhoto
