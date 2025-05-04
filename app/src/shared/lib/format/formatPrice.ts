export function formatPrice(price: number): string {
	if (typeof price !== 'number' || isNaN(price)) {
		throw new Error('Invalid price value')
	}

	const [intPart, fracPart] = price.toFixed(2).split('.')

	const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

	return fracPart === '00' ? formattedInt + ' ₽' : `${formattedInt},${fracPart} ₽`
}
