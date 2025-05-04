export function formatPhoneNumber(phoneNumber: string): string {
	const digits = phoneNumber.replace(/\D/g, '')

	const cleaned = digits.startsWith('8') ? '7' + digits.slice(1) : digits

	if (cleaned.length !== 11) return phoneNumber

	return `+${cleaned[0]} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(
		7,
		9
	)}-${cleaned.slice(9)}`
}
