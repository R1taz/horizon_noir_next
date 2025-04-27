import { ICarPhoto } from '@/app/interfaces/carsInterface'

interface Props {
	photo: ICarPhoto
}

const CarPhoto = ({ photo }: Props) => {
	return (
		<img
			key={photo.id}
			className='w-full h-full rounded-[8px] object-cover'
			src={process.env.NEXT_PUBLIC_BASE_BACKEND_URL + '/' + photo.url.replace(/\\/g, '/')}
			alt='Фотография автомобиля'
		/>
	)
}

export default CarPhoto
