import React, { Dispatch, SetStateAction } from 'react'
import { useColorsByModel } from '../model/useColorsByModel'
import Select from '@/app/src/shared/ui/Select'
import Skeleton from '@/app/src/shared/ui/Skeleton/Skeleton'
import { IOption } from '@/app/src/shared/types/options'

interface Props {
	modelId: number
	currentColor: IOption
	setCurrentColor: Dispatch<SetStateAction<IOption>>
}

const CarColors = ({ modelId, currentColor, setCurrentColor }: Props) => {
	const { data, isLoading, error } = useColorsByModel(modelId)

	if (isLoading) return <Skeleton width={500} height={30} />
	if (!data || error) return <h1>Произошла ошибка</h1>

	const options = data.map(color => ({
		label: color.color_name,
		value: color.id,
		action: (id: number) => {
			setCurrentColor(prev => {
				if (prev.id === id) return { id: null, label: '' }
				return { id: color.id, label: color.color_name }
			})
		},
	}))

	return (
		<Select
			edit={true}
			bg='700'
			title={!currentColor.label ? 'Выберите цвет модели' : currentColor.label}
			options={options}
			value={currentColor.id}
		/>
	)
}

export default CarColors
