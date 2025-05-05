import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { SelectFnType, RangeFnType, IFilters } from '../types/filters'

interface CarFiltersStore {
	filters: IFilters
	addItemFilters: SelectFnType
	changeItemsFilters: RangeFnType
	removeItemFilters: SelectFnType
}

export const useCarFiltersStore = create<CarFiltersStore>()(
	immer(set => ({
		filters: {
			brands: [],
			models: [],
			price: [0, Infinity],
			years: [],
			colors: [],
			bodyTypes: [],
			fuelTypes: [],
			engineVolume: [0, Infinity],
		},
		addItemFilters: (key, item) =>
			set(state => {
				const currentArray = state.filters[key]
				state.filters = {
					...state.filters,
					[key]: [...currentArray, item],
				}
			}),
		changeItemsFilters: (key, items) =>
			set(state => {
				state.filters = {
					...state.filters,
					[key]: items,
				}
			}),
		removeItemFilters: (key, item) =>
			set(state => {
				const currentArray = state.filters[key]
				state.filters = {
					...state.filters,
					[key]: currentArray.filter(value => value !== item),
				}
			}),
	}))
)
