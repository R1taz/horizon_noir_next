import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { ICar, IColor } from '../../../interfaces/carsInterface'

interface CarsStore {
	colors: IColor[]
	pageSize: number
	cars: ICar[]
	setCars: (cars: ICar[]) => void
	addCar: (car: ICar) => void
	removeCar: (carId: number) => void
	updateCar: (car: ICar) => void
	setColors: (colors: IColor[]) => void
}

export const useCarsStore = create<CarsStore>()(
	immer(set => ({
		colors: [],
		pageSize: 9,
		cars: [],
		setCars: cars =>
			set(state => {
				state.cars = cars
			}),
		addCar: car =>
			set(state => {
				state.cars.push(car)
			}),
		removeCar: carId =>
			set(state => {
				state.cars = state.cars.filter(car => car.car.id !== carId)
			}),
		updateCar: updatedCar =>
			set(state => {
				state.cars = state.cars.map(car => {
					if (car.car.id === updatedCar.car.id) return updatedCar
					return car
				})
			}),
		setColors: colors =>
			set(state => {
				state.colors = colors
			}),
	}))
)
