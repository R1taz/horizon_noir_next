import SelectFilter from '../../ui/SelectFilter'

const YearsFilter = () => {
	const options = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016]
	return <SelectFilter title='Цвет' options={options} />
}

export default YearsFilter
