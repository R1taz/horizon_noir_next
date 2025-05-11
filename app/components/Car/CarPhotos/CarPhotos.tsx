import { ICarPhoto } from '@/app/interfaces/carsInterface'
import CarPhoto from './CarPhoto'

interface Props {
	photos: ICarPhoto[]
}

const CarPhotos = ({ photos }: Props) => {
	return (
		<article className='mt-32'>
			<h1 className='text-300 text-center text-4xl font-bold mb-9'>Фотографии автомобиля</h1>
			<section className='grid grid-cols-2 gap-9'>
				{photos.slice(1).map((photo, idx) => (
					<CarPhoto key={idx} photo={photo} />
				))}
			</section>
		</article>
	)
}

export default CarPhotos
