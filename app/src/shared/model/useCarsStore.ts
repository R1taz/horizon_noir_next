import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { ICar } from '../../../interfaces/carsInterface'

interface CarsStore {
	pageSize: number
	cars: ICar[]
	setCars: (cars: ICar[]) => void
	addCar: (car: ICar) => void
	removeCar: (carId: number) => void
	updateCar: (car: ICar) => void
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
		updateCar: (updatedCar: ICar) =>
			set(state => {
				state.cars = state.cars.map(car => {
					if (car.car.id === updatedCar.car.id) return updatedCar
					return car
				})
			}),
	}))
)
