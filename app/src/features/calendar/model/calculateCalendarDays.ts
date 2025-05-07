export function calculateCalendarDays(year: number, month: number): number[][] {
	const chunkedNumbers: number[][] = []

	const firstDayMonth = new Date(year, month, 1).getDay() || 7
	const countDaysMonthFirstWeek = 7 - firstDayMonth + 1
	const diffDaysFirstWeek = 7 - countDaysMonthFirstWeek

	const firstWeek = []
	for (let i = 1, j = 1; i <= 7; i++) {
		if (i <= diffDaysFirstWeek) {
			firstWeek.push(new Date(year, month!, -diffDaysFirstWeek + i).getDate())
		} else {
			firstWeek.push(j)
			j++
		}
	}

	chunkedNumbers.push(firstWeek)

	const countDaysInMonth =
		new Date(year, month + 1, 0).getDate() - new Date(year, month, 1).getDate() + 1
	const days = [...new Array(countDaysInMonth)]
		.map((_, idx) => idx + 1)
		.slice(countDaysMonthFirstWeek)

	chunkedNumbers.push(
		...days.reduce<number[][]>((acc, _, idx) => {
			if (idx % 7 === 0) acc.push(days.slice(idx, idx + 7))
			return acc
		}, [])
	)

	const lastDayMonth = new Date(year, month + 1, 0).getDay() || 7
	const diffDaysLastWeek = 7 - lastDayMonth

	chunkedNumbers.push([...new Array(diffDaysLastWeek)].map((_, idx) => idx + 1))

	return chunkedNumbers
}
