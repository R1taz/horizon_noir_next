import Select from '@/app/src/shared/ui/Select'
import { useState } from 'react'

const ModelsFilter = () => {
	const [currentModel, setCurrentModel] = useState<{ label: string; id: number | null }>({
		label: '',
		id: null,
	})

	const modelsOptions = [
		{
			label: 'F02',
			value: 1,
			action: (value: any) => {
				setCurrentModel(prev => {
					return prev.id === value ? { label: '', id: null } : { label: 'F02', id: 1 }
				})
			},
		},
	]

	return (
		<article className='my-9'>
			<h2 className='text-2xl text-500'>Модель</h2>
			<Select
				edit={true}
				title={!currentModel.id ? 'Выберите модель' : currentModel.label}
				bg='700'
				value={currentModel.id!}
				options={modelsOptions}
			/>
		</article>
	)
}

export default ModelsFilter
