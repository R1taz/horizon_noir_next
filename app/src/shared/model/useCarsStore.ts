import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { ICar } from '../interfaces/carsInterface'

interface CarsStore {
	cars: ICar[]
	setCars: (cars: ICar[]) => void
	removeCar: (carId: number) => void
}

export const useCarsStore = create<CarsStore>()(
	immer(set => ({
		cars: [],
		setCars: cars => set(state => ({ ...state, cars })),
		removeCar: carId =>
			set(state => ({ ...state, cars: state.cars.filter(car => car.car.id !== carId) })),
	}))
)
