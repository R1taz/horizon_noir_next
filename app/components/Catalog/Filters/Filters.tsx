import BodyTypesFilter from './BodyTypesFilter'
import BrandsFilter from './BrandsFilters/BrandsFilter'
import ColorsFilter from './ColorsFilter'
import EngineTypesFilter from './EngineTypesFilter'
import EngineVolumesFilter from './EngineVolumesFilter'
import ModelsFilter from './ModelsFilter'
import PriceFilter from './PriceFilter'
import YearsFilter from './YearsFilters'

const Filters = () => {
	return (
		<section>
			<h1 className='text-2xl font-bold text-accent mb-8'>Фильтры</h1>
			<BrandsFilter />
			<ModelsFilter />
			<PriceFilter />
			<YearsFilter />
			<ColorsFilter />
			<BodyTypesFilter />
			<EngineTypesFilter />
			<EngineVolumesFilter />
		</section>
	)
}

export default Filters
