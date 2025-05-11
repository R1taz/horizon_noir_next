import { CarStatus } from '@/app/interfaces/carsInterface'
import { useModels } from '@/app/src/shared/hooks/useModels'
import { useBrandsStore } from '@/app/src/shared/model/useBrandsStore'
import { useCarDealerships } from '@/app/src/shared/model/useCarDealershipStore'
import Modal from '@/app/src/shared/ui/Modal'
import RadioGroup from '@/app/src/shared/ui/RadioGroup'
import Select from '@/app/src/shared/ui/Select'
import { useEffect, useState } from 'react'
import CarDealershipList from '@/app/src/entities/CarDealership/ui/CarDealershipList'
import CarPhotos from './CarPhotos'
import { useAddCar } from '../model/useAddCar'
import CarInfo from './CarInfo'
import { useCarsStore } from '@/app/src/entities/car'
import { useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/app/src/widgets/cars'
import { useRouter } from 'next/navigation'

interface Props {
	onClose: () => void
}

type IOption = { label: string; id: number | null }

const AddCarModal = ({ onClose }: Props) => {
	const carDealerships = useCarDealerships(state => state.carDealerships)
	const brands = useBrandsStore(state => state.brands)
	const addCar = useCarsStore(state => state.addCar)
	const setAuthData = useAuthStore(state => state.setAuthData)

	const router = useRouter()

	const [currentBrand, setCurrentBrand] = useState<IOption>({
		label: '',
		id: null,
	})
	const [currentModel, setCurrentModel] = useState<IOption>({
		label: '',
		id: null,
	})
	const [currentStatusCar, setCurrentStatusCar] = useState<CarStatus>(CarStatus.STOCK)
	const [dealershipId, setDealershipId] = useState<number>(carDealerships[0].id)
	const [photos, setPhotos] = useState<File[]>([])
	const [mainPhotoId, setMainPhotoId] = useState()
	const [year, setYear] = useState('')
	const [vin, setVin] = useState('')
	const [price, setPrice] = useState('')

	const { mutateAsync } = useAddCar()
	const queryClient = useQueryClient()
	const { data: models, isLoading, error } = useModels(currentBrand.id)

	const brandOptions = brands.map(brand => ({
		label: brand.brand_name,
		value: brand.id,
		action: (value: typeof brand.id) => {
			setCurrentBrand(prev => {
				return prev.id === value
					? { label: '', id: null }
					: { label: brand.brand_name, id: brand.id }
			})
		},
	}))
	const modelsOptions = models?.map(model => ({
		label: model.model_name,
		value: model.id,
		action: (value: typeof model.id) => {
			setCurrentModel(prev => {
				return prev.id === value
					? { label: '', id: null }
					: { label: model.model_name, id: model.id }
			})
		},
	}))
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
			label: 'Добавить автомобиль',
			action: async () => {
				try {
					if (!currentModel.id || !vin || !price || !year) return
					if (+year < 2016 || +year > 2025) return
					if (+price < 0 || +price > 99999999999) return

					const formData = new FormData()
					photos.forEach(photo => {
						formData.append('photos', photo)
					})
					formData.append('model_id', `${currentModel.id}`)
					formData.append('status', `${currentStatusCar}`)
					formData.append('available', `${currentStatusCar === CarStatus.STOCK ? true : false}`)
					formData.append('dealershipId', `${dealershipId}`)
					formData.append('vin', `${vin}`)
					formData.append('price', `${+price}`)
					formData.append('manufacturer_date', `${+year}`)
					formData.append('mainPhotoId', `${0}`)
					const newCar = await mutateAsync(formData)
					addCar(newCar)
					queryClient.invalidateQueries({ queryKey: ['cars'] })

					setCurrentBrand({ label: '', id: null })
					setCurrentModel({ label: '', id: null })
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

	useEffect(() => {
		if (currentBrand) {
			setCurrentModel({ id: null, label: '' })
		}
	}, [currentBrand])

	return (
		<>
			<Modal title='Добавление автомобиля' options={modalOptions}>
				<Select
					edit={true}
					title={!currentBrand.id ? 'Выберите бренд' : currentBrand.label}
					bg='700'
					value={currentBrand.id!}
					options={brandOptions}
				/>
				{isLoading && (
					<Select
						edit={false}
						title={'Выберите модель'}
						bg='700'
						value={currentModel.id!}
						options={modelsOptions!}
					/>
				)}
				{error && <div className='text-red-500'>Ошибка загрузки моделей</div>}
				{currentBrand.id !== null && !isLoading && !error && (
					<Select
						edit={true}
						title={!currentModel.id ? 'Выберите модель' : currentModel.label}
						bg='700'
						value={currentModel.id!}
						options={modelsOptions!}
					/>
				)}
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
		</>
	)
}

export default AddCarModal
