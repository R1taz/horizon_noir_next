import { ICarPhoto } from '@/app/interfaces/carsInterface'
import CarPhoto from './CarPhoto'

interface Props {
	photos: ICarPhoto[]
}

const CarPhotos = ({ photos }: Props) => {
	return (
		<article className='mt-32'>
			<h1 className='text-headlines text-center text-4xl font-bold mb-9'>Фотографии автомобиля</h1>
			<section className='grid grid-cols-2 gap-x-12 gap-y-8'>
				{photos.map(photo => (
					<CarPhoto photo={photo} />
				))}
			</section>
		</article>
	)
}

export default CarPhotos
