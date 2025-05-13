import { CarYears } from './years'
import { CarColors } from './colors'
import { BodyTypes } from './bodyTypes'
import { FuelTypes } from './fuelTypes'

export interface IFilters {
	brand: number | null
	model: number | null
	price: [number, number]
	years: CarYears[]
	colors: CarColors[]
	bodyTypes: BodyTypes[]
	fuelTypes: FuelTypes[]
	engineVolume: [number, number]
}

export type SelectFnType = <K extends keyof IFilters>(
	key: K,
	item: IFilters[K] extends Array<infer U> ? U : IFilters[K]
) => void

export type RangeFnType = <K extends keyof IFilters>(key: K, item: [number, number]) => void
