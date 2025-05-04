export function formateDate(date: Date | string): string {
	return new Intl.DateTimeFormat('ru-RU', {
		timeZone: 'Europe/Moscow',
		dateStyle: 'short',
	}).format(new Date(date))
}
