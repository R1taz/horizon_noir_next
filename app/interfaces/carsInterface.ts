export type CarBrand =
	| 'Aston Martin'
	| 'Bentley'
	| 'Bugatti'
	| 'Ferrari'
	| 'Koenigsegg'
	| 'Maserati'
	| 'Maybach'
	| 'McLaren'
	| 'Pagani'
	| 'Porsche'
	| 'Rolls-Royce'

export interface IBrand {
	id: number
	brand_name: CarBrand
}

export enum CarStatus {
	STOCK = 'in_stock',
	TRANSIT = 'in_transit',
	SOLD = 'sold',
	RESERVED = 'reserved',
}

export interface ICar {
	car: ICarInfo
	model: IModelCharacteristics
	photos: ICarPhoto[]
}

export interface ICarInfo {
	brand: string
	model: string
	id: number
	model_id: number
	vin: string
	mileage: number
	status: CarStatus
	available: boolean
	price: string
	manufacturer_date: number
	created_at: string
	updated_at: string
	views: number
	date_delivery: string | null
}

export interface IModelCharacteristics {
	id: number
	brand_id: number
	model_name: string
	model_year: number
	body_type: string
	fuel_type: string
	engine_type: string
	engine_volume: string
	power: number
	transmission: string
	drive_type: string
	end_model_year: number | null
}

export interface ICarPhoto {
	id: number
	car_id: number
	url: string
	main_photo: boolean
}
