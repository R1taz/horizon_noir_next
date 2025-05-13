import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { SelectFnType, RangeFnType, IFilters } from '../types/filters'

interface CarFiltersStore {
	filters: IFilters
	addItemFilters: SelectFnType
	changeItemsFilters: RangeFnType
	removeItemFilters: SelectFnType
	resetFilters: () => void
}

export const useCarFiltersStore = create<CarFiltersStore>()(
	immer(set => ({
		filters: {
			brand: null,
			model: null,
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
					[key]: Array.isArray(currentArray) ? [...currentArray, item] : item,
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
					[key]: Array.isArray(currentArray) ? currentArray.filter(value => value !== item) : null,
				}
			}),
		resetFilters: () =>
			set(state => {
				state.filters = {
					brand: null,
					model: null,
					price: [0, Infinity],
					years: [],
					colors: [],
					bodyTypes: [],
					fuelTypes: [],
					engineVolume: [0, Infinity],
				}
			}),
	}))
)
