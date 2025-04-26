import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { ICarDealership } from '../interfaces/carDealershipsInterface'

interface CarsStore {
	carDealerships: ICarDealership[]
}

export const useCarDealerships = create<CarsStore>()(
	immer(set => ({
		carDealerships: [
			{
				id: 1,
				address: 'г. Москва',
				latitude: 0,
				longitude: 0,
			},
			{
				id: 2,
				address: 'г. Санкт-Петербург',
				latitude: 0,
				longitude: 0,
			},
		],
		setCarDealerships: (carDealerships: ICarDealership[]) =>
			set(state => ({ ...state, carDealerships })),
	}))
)
