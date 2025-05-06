import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { ICar } from '../../../interfaces/carsInterface'

interface CarsStore {
	pageSize: number
	cars: ICar[]
	setCars: (cars: ICar[]) => void
	addCar: (car: ICar) => void
	removeCar: (carId: number) => void
}

export const useCarsStore = create<CarsStore>()(
	immer(set => ({
		pageSize: 20,
		cars: [],
		setCars: cars =>
			set(state => {
				state.cars = cars
			}),
		addCar: (car: ICar) =>
			set(state => {
				state.cars.push(car)
			}),
		removeCar: carId =>
			set(state => {
				state.cars = state.cars.filter(car => car.car.id !== carId)
			}),
	}))
)
