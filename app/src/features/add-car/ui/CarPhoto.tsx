import Image from 'next/image'
import removeImg from '../../../../assets/removeCar.png'
import notMainPhoto from '../../../../assets/Star 1.svg'
import mainPhoto from '../../../../assets/Star 1 (1).svg'

interface Props {
	photo: File
	handleChange: () => void
}

const CarPhoto = ({ photo, handleChange }: Props) => {
	return (
		<article className='relative'>
			<Image
				src={removeImg}
				alt='Удалить фотографию'
				width={25}
				height={25}
				className='absolute top-2 right-2 cursor-pointer'
				onClick={handleChange}
			/>
			<Image
				src={URL.createObjectURL(photo)}
				className='rounded-[8px] h-[250px] object-cover'
				alt='Фотография автомобиля'
				width={350}
				height={350}
			/>
		</article>
	)
}

export default CarPhoto
