import { useModels } from '@/app/src/shared/hooks/useModels'
import { useCarFiltersStore } from '@/app/src/shared/model/useCarFiltersStore'
import Select from '@/app/src/shared/ui/Select'

const ModelsFilter = () => {
	const brand = useCarFiltersStore(state => state.filters.brand)

	const filteringIdModel = useCarFiltersStore(state => state.filters.model)
	const addItemFilters = useCarFiltersStore(state => state.addItemFilters)
	const removeItemFilters = useCarFiltersStore(state => state.removeItemFilters)

	const { data: models, isLoading, error } = useModels(brand)

	const currentModel = models ? models.find(model => model.id === filteringIdModel) : null

	const modelsOptions = models?.map(model => ({
		label: model.model_name,
		value: model.id,
		action: (value: number) => {
			if (value === model.id) addItemFilters('model', value)
			else removeItemFilters('model', value)
		},
	}))

	return (
		<article className='my-9'>
			<h2 className='text-2xl text-500'>Модель</h2>
			<article className='my-3'>
				<Select
					edit={!modelsOptions || modelsOptions.length === 0 ? false : true}
					title={currentModel ? currentModel.model_name : 'Выберите модель'}
					bg='700'
					value={currentModel ? currentModel.id : null}
					options={modelsOptions || []}
				/>
			</article>
		</article>
	)
}

export default ModelsFilter
