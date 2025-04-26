export const getBrands = async () => {
	const res = await fetch('http://localhost:5000/api/brands')
	if (!res.ok) throw new Error('Failed to fetch')
	return res.json()
}
