import { IBrand } from '@/app/interfaces/carsInterface'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface BrandsStore {
	brands: IBrand[]
	setBrands: (brands: IBrand[]) => void
}

export const useBrandsStore = create<BrandsStore>()(
	immer(set => ({
		brands: [],
		setBrands: brands => set(state => ({ ...state, brands })),
	}))
)
