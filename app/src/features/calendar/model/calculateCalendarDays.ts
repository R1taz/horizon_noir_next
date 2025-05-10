import { CalendarNumber } from './types'

export function calculateCalendarDays(year: number, month: number): CalendarNumber[][] {
	const chunkedNumbers: CalendarNumber[][] = []

	const firstDayMonth = new Date(year, month, 1).getDay() || 7
	const countDaysMonthFirstWeek = 7 - firstDayMonth + 1
	const diffDaysFirstWeek = 7 - countDaysMonthFirstWeek

	const firstWeek: CalendarNumber[] = []
	for (let i = 1, j = 1; i <= 7; i++) {
		if (i <= diffDaysFirstWeek) {
			const numberDate = new Date(year, month!, -diffDaysFirstWeek + i).getDate()
			firstWeek.push({
				id: String(month - 1) + String(numberDate),
				month: month - 1,
				value: numberDate,
			})
		} else {
			firstWeek.push({
				id: String(month) + String(j),
				month: month,
				value: j,
			})
			j++
		}
	}

	chunkedNumbers.push(firstWeek)

	const countDaysInMonth =
		new Date(year, month + 1, 0).getDate() - new Date(year, month, 1).getDate() + 1
	const days = [...new Array(countDaysInMonth)]
		.map((_, idx) => ({
			id: String(month) + String(idx + 1),
			month: month,
			value: idx + 1,
		}))
		.slice(countDaysMonthFirstWeek)

	chunkedNumbers.push(
		...days.reduce<CalendarNumber[][]>((acc, _, idx) => {
			if (idx % 7 === 0) acc.push(days.slice(idx, idx + 7))
			return acc
		}, [])
	)

	const lastDayMonth = new Date(year, month + 1, 0).getDay() || 7
	const diffDaysLastWeek = 7 - lastDayMonth

	chunkedNumbers.push(
		[...new Array(diffDaysLastWeek)].map((_, idx) => ({
			id: String(month + 1) + String(idx + 1),
			month: month + 1,
			value: idx + 1,
		}))
	)

	return chunkedNumbers
}
