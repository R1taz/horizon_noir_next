export const getModels = async (carId: number) => {
	try {
		const res = await fetch(`http://localhost:5000/api/models/${carId}`)
		if (!res.ok) throw new Error('Failed to fetch')
		return res.json()
	} catch (error) {
		console.log('Произошла ошибка: ' + error)
	}
}
