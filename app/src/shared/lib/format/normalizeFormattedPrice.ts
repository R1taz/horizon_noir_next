export function normalizeFormattedPrice(price: string): string {
	return price
		.replace(/\./g, '')
		.replace(',', '.')
		.replace(/[^\d.]/g, '')
}
