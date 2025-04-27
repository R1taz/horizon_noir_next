import Image from 'next/image'
import addCarImg from '../../../../assets/addCarBlack.png'
import CarPhoto from './CarPhoto'

interface Props {
	photos: File[]
	addPhotos: (photos: FileList) => void
	removePhoto: (photos: File) => void
}

const CarPhotos = ({ photos, addPhotos, removePhoto }: Props) => {
	return (
		<>
			<article className='my-7'>
				<h1 className='text-primary text-center font-bold text-xl my-5'>
					Загрузите несколько фотографий автомобиля
				</h1>
			</article>

			<button className='row-start-1 row-end-2 col-start-1 col-end-4 rounded-[8px] bg-accentBg text-[#292929] text-center text-xl font-bold py-3 w-full'>
				<Image src={addCarImg} alt='' width={20} height={20} className='inline-block mr-3' />
				<label htmlFor='photo-upload' className='cursor-pointer'>
					Добавить новую фотографию
				</label>
				<input
					id='photo-upload'
					type='file'
					multiple
					className='hidden'
					onChange={e => (e.target.files ? addPhotos(e.target.files) : null)}
				/>
			</button>

			<section className='grid grid-cols-2 gap-5 my-6'>
				{photos.map((photo, idx) => {
					return <CarPhoto key={idx} photo={photo} handleChange={() => removePhoto(photo)} />
				})}
			</section>
		</>
	)
}

export default CarPhotos
