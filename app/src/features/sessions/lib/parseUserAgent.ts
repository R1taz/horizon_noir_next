export interface ParsedUA {
	os: string
	browser: string
}

export function parseUserAgent(ua: string | null): ParsedUA {
	if (!ua) return { os: 'Неизвестно', browser: 'Неизвестно' }

	let os = 'Неизвестно'
	if (/Windows NT 10/.test(ua)) os = 'Windows 10/11'
	else if (/Windows NT 6\.3/.test(ua)) os = 'Windows 8.1'
	else if (/Windows NT 6\.2/.test(ua)) os = 'Windows 8'
	else if (/Windows NT 6\.1/.test(ua)) os = 'Windows 7'
	else if (/Windows/.test(ua)) os = 'Windows'
	else if (/iPhone/.test(ua)) os = 'iPhone'
	else if (/iPad/.test(ua)) os = 'iPad'
	else if (/Android/.test(ua)) os = 'Android'
	else if (/Mac OS X/.test(ua)) os = 'macOS'
	else if (/Linux/.test(ua)) os = 'Linux'

	let browser = 'Неизвестно'
	if (/Edg\//.test(ua)) browser = 'Edge'
	else if (/OPR\/|Opera/.test(ua)) browser = 'Opera'
	else if (/YaBrowser/.test(ua)) browser = 'Яндекс.Браузер'
	else if (/Chrome\//.test(ua)) browser = 'Chrome'
	else if (/Firefox\//.test(ua)) browser = 'Firefox'
	else if (/Safari\//.test(ua)) browser = 'Safari'

	return { os, browser }
}

export function timeAgo(input: string | Date | null): string {
	if (!input) return ''
	const d = typeof input === 'string' ? new Date(input) : input
	const diffMs = Date.now() - d.getTime()
	const sec = Math.floor(diffMs / 1000)
	if (sec < 60) return 'только что'
	const min = Math.floor(sec / 60)
	if (min < 60) return `${min} мин назад`
	const hour = Math.floor(min / 60)
	if (hour < 24) return `${hour} ${plural(hour, 'час', 'часа', 'часов')} назад`
	const day = Math.floor(hour / 24)
	if (day < 30) return `${day} ${plural(day, 'день', 'дня', 'дней')} назад`
	const month = Math.floor(day / 30)
	if (month < 12) return `${month} ${plural(month, 'месяц', 'месяца', 'месяцев')} назад`
	const year = Math.floor(month / 12)
	return `${year} ${plural(year, 'год', 'года', 'лет')} назад`
}

function plural(n: number, one: string, few: string, many: string): string {
	const mod10 = n % 10
	const mod100 = n % 100
	if (mod10 === 1 && mod100 !== 11) return one
	if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few
	return many
}
