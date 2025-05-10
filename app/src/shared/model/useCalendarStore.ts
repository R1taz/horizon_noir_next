import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface CalendarStore {
	startYear: number
	endYear: number
	year: number | null
	month: number | null
	day: number | null
	hours: number | null
	setYear: (year: number | null) => void
	setMonth: (month: number | null) => void
	setDay: (day: number | null) => void
	setHours: (hours: number | null) => void
}

export const useCalendarStore = create<CalendarStore>()(
	immer(set => ({
		startYear: 2025,
		endYear: 2027,
		year: new Date().getFullYear(),
		month: new Date().getMonth(),
		day: new Date().getDate(),
		hours: new Date().getHours(),
		setYear: year =>
			set(state => {
				state.year = year
			}),
		setMonth: month =>
			set(state => {
				state.month = month
			}),
		setDay: day =>
			set(state => {
				state.day = day
			}),
		setHours: hours =>
			set(state => {
				state.hours = hours
			}),
	}))
)
