import SelectFilter from '@/app/src/shared/ui/SelectFilter'

const ColorsFilter = () => {
	const options = ['Чёрный', 'Белый', 'Серый', 'Красный', 'Оранжевый']
	return <SelectFilter title='Цвет' options={options} />
}

export default ColorsFilter
