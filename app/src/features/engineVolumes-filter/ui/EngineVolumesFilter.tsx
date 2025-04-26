import RangeFilter from '@/app/src/shared/ui/RangeFilter'

const EngineVolumesFilter = () => {
	const options = ['от', 'до']
	return <RangeFilter title='Объём двигателя' options={options} unit='л.' />
}

export default EngineVolumesFilter
