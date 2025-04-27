import { CarStatus } from '@/app/interfaces/carsInterface'

export interface ICarData {
	carData: {
		model_id: number
		status: CarStatus
		available: boolean
		vin: string
		price: number
		manufacturer_date: number
	}
	mainPhotoId: number
	urlsPhotos: string[]
}
