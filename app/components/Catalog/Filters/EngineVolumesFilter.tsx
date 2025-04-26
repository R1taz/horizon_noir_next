import RangeFilter from '../../ui/RangeFilter'

const EngineVolumesFilter = () => {
	const options = ['от', 'до']
	return <RangeFilter title='Объём двигателя' options={options} unit='л.' />
}

export default EngineVolumesFilter
