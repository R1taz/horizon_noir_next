import SelectFilter from '../../ui/SelectFilter'

const EngineTypesFilter = () => {
	const options = ['Чёрный', 'Белый', 'Серый', 'Красный', 'Оранжевый']
	return <SelectFilter title='Цвет' options={options} />
}

export default EngineTypesFilter
