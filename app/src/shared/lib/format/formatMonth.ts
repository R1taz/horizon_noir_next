export function formatMonth(month: number): string {
	if (month === 0) return 'Янв'
	if (month === 1) return 'Фев'
	if (month === 2) return 'Мар'
	if (month === 3) return 'Апр'
	if (month === 4) return 'Май'
	if (month === 5) return 'Июн'
	if (month === 6) return 'Июл'
	if (month === 7) return 'Авг'
	if (month === 8) return 'Сен'
	if (month === 9) return 'Окт'
	if (month === 10) return 'Ноя'
	return 'Дек'
}
