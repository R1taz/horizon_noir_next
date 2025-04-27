export const getBrands = async () => {
	try {
		const res = await fetch('http://localhost:5000/api/brands')
		if (!res.ok) throw new Error('Failed to fetch')
		return res.json()
	} catch (error) {
		console.log('Произошла ошибка: ' + error)
	}
}
