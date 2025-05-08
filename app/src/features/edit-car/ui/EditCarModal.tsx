import { CarStatus, ICarInfo, ICarPhoto } from '@/app/interfaces/carsInterface'
import { useCarDealerships } from '@/app/src/shared/model/useCarDealershipStore'
import Modal from '@/app/src/shared/ui/Modal'
import RadioGroup from '@/app/src/shared/ui/RadioGroup'
import Select from '@/app/src/shared/ui/Select'
import { useEffect, useState } from 'react'
import CarDealershipList from '@/app/src/entities/CarDealership/ui/CarDealershipList'
import { useQueryClient } from '@tanstack/react-query'
import CarInfo from '../../add-car/ui/CarInfo'
import CarPhotos from '../../add-car/ui/CarPhotos'
import { convertPhotosToFiles } from '../model/convertPhotosToFiles'
import { useUpdateCar } from '../model/useUpdateCar'
import { useCarsStore } from '@/app/src/entities/car'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/app/src/widgets/cars'

interface Props {
	car: ICarInfo
	carPhotos: ICarPhoto[]
	onClose: () => void
}

const EditCarModal = ({ car, carPhotos, onClose }: Props) => {
	const carDealerships = useCarDealerships(state => state.carDealerships)
	const updateCar = useCarsStore(state => state.updateCar)
	const setAuthData = useAuthStore(state => state.setAuthData)

	const router = useRouter()

	const [currentStatusCar, setCurrentStatusCar] = useState<CarStatus>(CarStatus.STOCK)
	const [dealershipId, setDealershipId] = useState<number>(carDealerships[0].id)
	const [photos, setPhotos] = useState<File[]>([])
	const [mainPhotoId, setMainPhotoId] = useState()

	const [year, setYear] = useState(String(car.manufacturer_date))
	const [vin, setVin] = useState(String(car.vin))
	const [price, setPrice] = useState(String(car.price))

	const { mutateAsync } = useUpdateCar()
	const queryClient = useQueryClient()

	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		async function createFiles() {
			const convertedFiles = await convertPhotosToFiles(carPhotos)
			setPhotos(convertedFiles)
			setIsLoading(false)
		}
		createFiles()
	}, [])

	const carInfoOptions = [
		{ label: 'Введите год', value: year, action: (year: string) => setYear(year) },
		{ label: 'Введите VIN-номер', value: vin, action: (vin: string) => setVin(vin) },
		{ label: 'Введите цену', value: price, action: (price: string) => setPrice(price) },
	]
	const radioOptions = [
		{ label: 'В автосалоне', value: CarStatus.STOCK },
		{ label: 'Едет в автосалон', value: CarStatus.TRANSIT },
	]
	const modalOptions = [
		{
			label: 'Сохранить изменения',
			action: async () => {
				try {
					if (!vin || !price || !year) return
					if (+year < 2016 || +year > 2025) return
					if (+price < 0 || +price > 99999999999) return

					const formData = new FormData()
					photos.forEach(photo => {
						formData.append('photos', photo)
					})
					formData.append('car_id', `${car.id}`)
					formData.append('status', `${currentStatusCar}`)
					formData.append('available', `${currentStatusCar === CarStatus.STOCK ? true : false}`)
					formData.append('dealershipId', `${dealershipId}`)
					formData.append('vin', `${vin}`)
					formData.append('price', `${+price}`)
					formData.append('manufacturer_date', `${+year}`)
					formData.append('mainPhotoId', `${0}`)

					const updatedCar = await mutateAsync(formData)
					updateCar(updatedCar)
					queryClient.invalidateQueries({ queryKey: ['cars'] })

					setYear('')
					setVin('')
					setPrice('')
					setPhotos([])
				} catch (error) {
					console.log(`Произошла ошибка: ${error}`)
					if ((error as any)?.response?.status === 401) {
						setAuthData(false, 'no role')
						router.push('/login')
					}
				}
			},
		},
		{ label: 'Отменить изменения', action: onClose },
	]

	if (isLoading) return <div>Loading</div>

	return (
		<Modal title='Редактирование автомобиля' options={modalOptions}>
			<Select
				edit={false}
				title={car.brand}
				bg='secondaryBg'
				value={car.brand}
				options={[{ label: car.brand, value: car.brand, action: () => null }]}
			/>
			<Select
				edit={false}
				title={car.model}
				bg='secondaryBg'
				value={car.model}
				options={[{ label: car.model, value: car.model, action: () => null }]}
			/>
			<RadioGroup
				title='Выберите статус автомобиля'
				options={radioOptions}
				value={currentStatusCar}
				onChange={status => setCurrentStatusCar(status)}
			/>
			<CarDealershipList {...{ carDealerships, dealershipId, setDealershipId }} />
			<CarInfo options={carInfoOptions} />
			<CarPhotos
				photos={photos}
				addPhotos={photos => setPhotos(prev => [...prev, ...Array.from(photos)])}
				removePhoto={photo => setPhotos(prev => prev.filter(item => item.name !== photo.name))}
			/>
		</Modal>
	)
}

export default EditCarModal
