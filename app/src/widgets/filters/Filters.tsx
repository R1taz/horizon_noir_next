import {
	BodyTypesFilter,
	BrandsFilter,
	ColorsFilter,
	FuelTypesFilter,
	EngineVolumesFilter,
	ModelsFilter,
	PriceFilter,
	YearsFilter,
} from './index'

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
			<FuelTypesFilter />
			<EngineVolumesFilter />
		</section>
	)
}

export default Filters
