import { CarBrand } from '@/app/interfaces/carsInterface'
import { CarYears } from './years'
import { CarColors } from './colors'
import { BodyTypes } from './bodyTypes'
import { FuelTypes } from './fuelTypes'

export interface IFilters {
	brands: CarBrand[]
	models: string[]
	price: [number, number]
	years: CarYears[]
	colors: CarColors[]
	bodyTypes: BodyTypes[]
	fuelTypes: FuelTypes[]
	engineVolume: [number, number]
}
