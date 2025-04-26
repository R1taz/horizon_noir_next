import SelectFilter from '../../ui/SelectFilter'

const BodyTypesFilter = () => {
	const options = ['Седан', 'Купе', 'Внедорожник']
	return <SelectFilter title='Тип кузова' options={options} />
}

export default BodyTypesFilter
