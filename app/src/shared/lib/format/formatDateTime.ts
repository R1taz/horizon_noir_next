export function formatDateTime(date: Date | string): string {
	return new Intl.DateTimeFormat('ru-RU', {
		timeZone: 'Europe/Moscow',
		dateStyle: 'short',
		timeStyle: 'short',
	}).format(new Date(date))
}
