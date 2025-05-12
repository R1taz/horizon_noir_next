import React from 'react'

interface Props {
	title: string
	placeholder: string
	unit: string
	value: string
	type?: string
	width?: number
	setValue: (value: string) => void
}

function EditField({
	width = 150,
	title,
	type = 'text',
	placeholder,
	unit,
	value,
	setValue,
}: Props) {
	const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
		setValue(e.currentTarget.value)
	}

	return (
		<div className='flex items-center'>
			<span className='text-500'>{title}:</span>
			<div className='px-1 ml-2 py-[0.5px] bg-600 rounded-[8px]'>
				<input
					type={type}
					placeholder={placeholder}
					value={value}
					onChange={handleChange}
					className='rounded-[8px] bg-600 text-400 text-center placeholder-500'
					style={{ width }}
				/>
				{unit !== '' && <span className='px-1 text-500'>{unit}</span>}
			</div>
		</div>
	)
}

export default EditField
