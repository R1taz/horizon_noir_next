import RangeFilter from '../../ui/RangeFilter'

const PriceFilter = () => {
	const options = ['от', 'до']
	return <RangeFilter title='Цена' options={options} unit='₽' />
}

export default PriceFilter
